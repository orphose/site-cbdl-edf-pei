"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Tabs,
  Tab,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Progress,
} from "@nextui-org/react";
import {
  Newspaper,
  Users,
  Plus,
  Trash2,
  Edit,
  LogOut,
  Eye,
  EyeOff,
  Lock,
  LayoutDashboard,
  ArrowLeft,
  Mail,
  AlertCircle,
  Upload,
  X,
  Image as ImageIcon,
  Save,
  Check,
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import type { News, Partnership } from "@/lib/database.types";
import type { User } from "@supabase/supabase-js";
import Link from "next/link";
import Image from "next/image";
import { IMAGES } from "@/lib/media";

// Types pour les vues
type ViewMode = "list" | "create" | "edit";
type ActiveSection = "news" | "partnerships";

/**
 * Page d'administration du CMS avec Supabase Auth
 */
export default function AdminPage() {
  // Client Supabase
  const supabase = createClient();

  // États d'authentification
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  // Formulaire de connexion
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // États de navigation
  const [activeSection, setActiveSection] = useState<ActiveSection>("news");
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  // États des données
  const [news, setNews] = useState<News[]>([]);
  const [partnerships, setPartnerships] = useState<Partnership[]>([]);

  // États du formulaire actualité
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [newsForm, setNewsForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    image_url: "",
    is_published: false,
  });

  // États du formulaire partenariat
  const [editingPartnership, setEditingPartnership] = useState<Partnership | null>(null);
  const [partnershipForm, setPartnershipForm] = useState({
    name: "",
    slug: "",
    description: "",
    logo_url: "",
    website_url: "",
    category: "",
    display_order: 0,
    is_active: true,
  });

  // États d'upload
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // États de sauvegarde
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Vérification de l'utilisateur au montage
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  // Chargement des données
  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  // Fonction de connexion
  const handleLogin = async () => {
    setAuthLoading(true);
    setAuthError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setAuthError(error.message === "Invalid login credentials" 
        ? "Email ou mot de passe incorrect" 
        : error.message);
    }

    setAuthLoading(false);
  };

  // Fonction de déconnexion
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  // Chargement des données
  const loadData = async () => {
    try {
      const { data: newsData } = await supabase
        .from("news")
        .select("*")
        .order("created_at", { ascending: false });

      const { data: partnershipsData } = await supabase
        .from("partnerships")
        .select("*")
        .order("display_order", { ascending: true });

      setNews(newsData || []);
      setPartnerships(partnershipsData || []);
    } catch (error) {
      console.error("Erreur chargement données:", error);
    }
  };

  // Générer un slug
  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  // Upload d'image
  const handleImageUpload = async (file: File, bucket: "actualites" | "media") => {
    setUploading(true);
    setUploadProgress(0);
    setUploadError("");

    try {
      // Valider le fichier
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        throw new Error("Le fichier est trop volumineux (max 5MB)");
      }

      const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
      if (!allowedTypes.includes(file.type)) {
        throw new Error("Format non supporté (JPG, PNG, WebP, GIF uniquement)");
      }

      // Générer un nom unique
      const ext = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;

      setUploadProgress(30);

      // Upload vers Supabase Storage
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) throw error;

      setUploadProgress(100);

      // Retourner l'URL publique
      const { data: publicUrl } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path);

      return publicUrl.publicUrl;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur lors de l'upload";
      setUploadError(message);
      return null;
    } finally {
      setUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  // Gestionnaire de sélection de fichier pour actualités
  const handleNewsFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = await handleImageUpload(file, "actualites");
    if (url) {
      setNewsForm({ ...newsForm, image_url: url });
    }
  };

  // Gestionnaire de sélection de fichier pour partenariats
  const handlePartnershipFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = await handleImageUpload(file, "media");
    if (url) {
      setPartnershipForm({ ...partnershipForm, logo_url: url });
    }
  };

  // Ouvrir création actualité
  const openCreateNews = () => {
    setEditingNews(null);
    setNewsForm({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      image_url: "",
      is_published: false,
    });
    setViewMode("create");
  };

  // Ouvrir édition actualité
  const openEditNews = (item: News) => {
    setEditingNews(item);
    setNewsForm({
      title: item.title,
      slug: item.slug,
      excerpt: item.excerpt || "",
      content: item.content || "",
      image_url: item.image_url || "",
      is_published: item.is_published,
    });
    setViewMode("edit");
  };

  // Sauvegarder actualité
  const saveNews = async () => {
    setSaving(true);
    setSaveSuccess(false);

    try {
      const newsData = {
        title: newsForm.title,
        slug: newsForm.slug || generateSlug(newsForm.title),
        excerpt: newsForm.excerpt || null,
        content: newsForm.content || null,
        image_url: newsForm.image_url || null,
        is_published: newsForm.is_published,
        published_at: newsForm.is_published ? new Date().toISOString() : null,
      };

      if (editingNews) {
        const { error } = await supabase
          .from("news")
          .update(newsData)
          .eq("id", editingNews.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("news").insert(newsData);
        if (error) throw error;
      }

      setSaveSuccess(true);
      setTimeout(() => {
        setViewMode("list");
        loadData();
      }, 1000);
    } catch (error) {
      console.error("Erreur sauvegarde actualité:", error);
    } finally {
      setSaving(false);
    }
  };

  // Supprimer actualité
  const deleteNews = async (id: string) => {
    if (!confirm("Supprimer cette actualité ?")) return;
    
    try {
      await supabase.from("news").delete().eq("id", id);
      loadData();
    } catch (error) {
      console.error("Erreur suppression:", error);
    }
  };

  // Ouvrir création partenariat
  const openCreatePartnership = () => {
    setEditingPartnership(null);
    setPartnershipForm({
      name: "",
      slug: "",
      description: "",
      logo_url: "",
      website_url: "",
      category: "",
      display_order: partnerships.length,
      is_active: true,
    });
    setViewMode("create");
  };

  // Ouvrir édition partenariat
  const openEditPartnership = (item: Partnership) => {
    setEditingPartnership(item);
    setPartnershipForm({
      name: item.name,
      slug: item.slug,
      description: item.description || "",
      logo_url: item.logo_url || "",
      website_url: item.website_url || "",
      category: item.category || "",
      display_order: item.display_order,
      is_active: item.is_active,
    });
    setViewMode("edit");
  };

  // Sauvegarder partenariat
  const savePartnership = async () => {
    setSaving(true);
    setSaveSuccess(false);

    try {
      const partnershipData = {
        name: partnershipForm.name,
        slug: partnershipForm.slug || generateSlug(partnershipForm.name),
        description: partnershipForm.description || null,
        logo_url: partnershipForm.logo_url || null,
        website_url: partnershipForm.website_url || null,
        category: partnershipForm.category || null,
        display_order: partnershipForm.display_order,
        is_active: partnershipForm.is_active,
      };

      if (editingPartnership) {
        const { error } = await supabase
          .from("partnerships")
          .update(partnershipData)
          .eq("id", editingPartnership.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("partnerships").insert(partnershipData);
        if (error) throw error;
      }

      setSaveSuccess(true);
      setTimeout(() => {
        setViewMode("list");
        loadData();
      }, 1000);
    } catch (error) {
      console.error("Erreur sauvegarde partenariat:", error);
    } finally {
      setSaving(false);
    }
  };

  // Supprimer partenariat
  const deletePartnership = async (id: string) => {
    if (!confirm("Supprimer ce partenaire ?")) return;
    
    try {
      await supabase.from("partnerships").delete().eq("id", id);
      loadData();
    } catch (error) {
      console.error("Erreur suppression:", error);
    }
  };

  // Retour à la liste
  const backToList = () => {
    setViewMode("list");
    setEditingNews(null);
    setEditingPartnership(null);
    setSaveSuccess(false);
  };

  // Écran de chargement
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-edf-blue"></div>
      </div>
    );
  }

  // =============================================
  // PAGE DE CONNEXION
  // =============================================
  if (!user) {
    return (
      <div className="min-h-screen bg-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 right-0 h-2 bg-edf-blue" />
          <div className="absolute top-20 right-0 w-96 h-96 bg-edf-blue/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-0 w-80 h-80 bg-edf-orange/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-edf-green/5 rounded-full blur-3xl" />
        </div>

        <header className="relative z-10 p-6">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-edf-blue transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Retour au site</span>
          </Link>
        </header>

        <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-md"
          >
            <Card className="shadow-xl border border-gray-100">
              <CardBody className="p-8">
                <div className="space-y-5">
                  {authError && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{authError}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <Input
                      type="email"
                      placeholder="admin@exemple.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      startContent={<Mail className="w-4 h-4 text-gray-400" />}
                      size="lg"
                      classNames={{
                        input: "text-base",
                        inputWrapper: "h-14 bg-gray-50 border-gray-200 hover:bg-gray-100 focus-within:bg-white",
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mot de passe
                    </label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                      startContent={<Lock className="w-4 h-4 text-gray-400" />}
                      size="lg"
                      classNames={{
                        input: "text-base",
                        inputWrapper: "h-14 bg-gray-50 border-gray-200 hover:bg-gray-100 focus-within:bg-white",
                      }}
                    />
                  </div>

                  <Button
                    onPress={handleLogin}
                    isLoading={authLoading}
                    className="w-full h-14 bg-edf-blue hover:bg-edf-blue-dark text-white font-semibold text-base transition-all"
                    radius="md"
                  >
                    {!authLoading && <LayoutDashboard className="w-5 h-5 mr-2" />}
                    Accéder au tableau de bord
                  </Button>

                  <p className="text-center text-xs text-gray-400">
                    Accès réservé aux administrateurs autorisés
                  </p>
                </div>
              </CardBody>
            </Card>

            <p className="text-center text-xs text-gray-400 mt-8">
              © {new Date().getFullYear()} EDF PEI - Tous droits réservés
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  // =============================================
  // INTERFACE ADMIN
  // =============================================
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white sticky top-0 z-50 h-[80px]">
        <div className="max-w-7xl mx-auto px-6 h-full">
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center gap-4">
              <Image
                src={IMAGES.logo.couleurs}
                alt="EDF PEI"
                width={160}
                height={64}
                className="h-14 w-auto"
              />
              <div className="h-10 w-px bg-gray-200" />
              <div>
                <h1 className="text-lg font-bold text-gray-900">Administration</h1>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/">
                <Button
                  variant="light"
                  size="sm"
                  startContent={<Eye className="w-4 h-4" />}
                  className="text-gray-600"
                >
                  Voir le site
                </Button>
              </Link>
              <Button
                variant="flat"
                color="danger"
                size="sm"
                startContent={<LogOut className="w-4 h-4" />}
                onPress={handleLogout}
              >
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="border border-gray-100">
            <CardBody className="flex flex-row items-center gap-4 p-4">
              <div className="w-12 h-12 rounded-xl bg-edf-blue/10 flex items-center justify-center">
                <Newspaper className="w-6 h-6 text-edf-blue" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{news.length}</p>
                <p className="text-sm text-gray-500">Actualités</p>
              </div>
            </CardBody>
          </Card>
          
          <Card className="border border-gray-100">
            <CardBody className="flex flex-row items-center gap-4 p-4">
              <div className="w-12 h-12 rounded-xl bg-edf-orange/10 flex items-center justify-center">
                <Eye className="w-6 h-6 text-edf-orange" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {news.filter(n => n.is_published).length}
                </p>
                <p className="text-sm text-gray-500">Publiées</p>
              </div>
            </CardBody>
          </Card>
          
          <Card className="border border-gray-100">
            <CardBody className="flex flex-row items-center gap-4 p-4">
              <div className="w-12 h-12 rounded-xl bg-edf-green/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-edf-green" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{partnerships.length}</p>
                <p className="text-sm text-gray-500">Partenaires</p>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Navigation par onglets - uniquement en mode liste */}
        {viewMode === "list" && (
          <Tabs 
            aria-label="Sections admin" 
            color="primary" 
            variant="underlined"
            selectedKey={activeSection}
            onSelectionChange={(key) => setActiveSection(key as ActiveSection)}
            classNames={{
              tabList: "gap-6 w-full relative rounded-none p-0 border-b border-gray-200",
              cursor: "w-full bg-edf-blue",
              tab: "max-w-fit px-0 h-12",
              tabContent: "group-data-[selected=true]:text-edf-blue font-medium",
            }}
          >
            <Tab
              key="news"
              title={
                <div className="flex items-center gap-2">
                  <Newspaper className="w-4 h-4" />
                  <span>Actualités</span>
                  <Chip size="sm" variant="flat" className="bg-gray-100">{news.length}</Chip>
                </div>
              }
            />
            <Tab
              key="partnerships"
              title={
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>Partenariats</span>
                  <Chip size="sm" variant="flat" className="bg-gray-100">{partnerships.length}</Chip>
                </div>
              }
            />
          </Tabs>
        )}

        {/* =============================================
            SECTION ACTUALITÉS
            ============================================= */}
        {activeSection === "news" && (
          <>
            {/* Liste des actualités */}
            {viewMode === "list" && (
              <Card className="mt-6 border border-gray-100 shadow-sm">
                <CardHeader className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Gestion des actualités</h2>
                    <p className="text-sm text-gray-500">Créez et gérez vos actualités</p>
                  </div>
                  <Button
                    className="bg-edf-blue text-white font-medium"
                    startContent={<Plus className="w-4 h-4" />}
                    onPress={openCreateNews}
                  >
                    Nouvelle actualité
                  </Button>
                </CardHeader>
                <CardBody className="p-0">
                  <Table 
                    aria-label="Liste des actualités"
                    classNames={{
                      th: "bg-gray-50 text-gray-600 font-semibold",
                      td: "py-4",
                    }}
                  >
                    <TableHeader>
                      <TableColumn>TITRE</TableColumn>
                      <TableColumn>STATUT</TableColumn>
                      <TableColumn>DATE</TableColumn>
                      <TableColumn>ACTIONS</TableColumn>
                    </TableHeader>
                    <TableBody emptyContent="Aucune actualité">
                      {news.map((item) => (
                        <TableRow key={item.id} className="hover:bg-gray-50">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              {item.image_url && (
                                <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                  <Image
                                    src={item.image_url}
                                    alt={item.title}
                                    width={48}
                                    height={48}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}
                              <div className="max-w-sm">
                                <p className="font-medium text-gray-900 truncate">{item.title}</p>
                                <p className="text-xs text-gray-400 truncate">/actualites/{item.slug}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {item.is_published ? (
                              <Chip color="success" variant="flat" size="sm" startContent={<Eye className="w-3 h-3" />}>
                                Publié
                              </Chip>
                            ) : (
                              <Chip color="default" variant="flat" size="sm" startContent={<EyeOff className="w-3 h-3" />}>
                                Brouillon
                              </Chip>
                            )}
                          </TableCell>
                          <TableCell className="text-sm text-gray-500">
                            {new Date(item.created_at).toLocaleDateString("fr-FR", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                variant="light"
                                isIconOnly
                                onPress={() => openEditNews(item)}
                                className="text-gray-600 hover:text-edf-blue"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="light"
                                isIconOnly
                                onPress={() => deleteNews(item.id)}
                                className="text-gray-600 hover:text-red-500"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardBody>
              </Card>
            )}

            {/* Formulaire création/édition actualité */}
            {(viewMode === "create" || viewMode === "edit") && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6"
              >
                <Card className="border border-gray-100 shadow-sm">
                  <CardHeader className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
                    <div className="flex items-center gap-4">
                      <Button
                        variant="light"
                        isIconOnly
                        onPress={backToList}
                        className="text-gray-500"
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </Button>
                      <div>
                        <h2 className="text-lg font-bold text-gray-900">
                          {editingNews ? "Modifier l'actualité" : "Nouvelle actualité"}
                        </h2>
                        <p className="text-sm text-gray-500">
                          {editingNews ? "Modifiez les informations" : "Créez une nouvelle actualité"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {saveSuccess && (
                        <Chip color="success" variant="flat" startContent={<Check className="w-4 h-4" />}>
                          Enregistré
                        </Chip>
                      )}
                      <Button
                        className="bg-edf-blue text-white font-medium"
                        startContent={saving ? null : <Save className="w-4 h-4" />}
                        onPress={saveNews}
                        isLoading={saving}
                        isDisabled={!newsForm.title}
                      >
                        {editingNews ? "Enregistrer" : "Créer"}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardBody className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Colonne principale */}
                      <div className="lg:col-span-2 space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Titre <span className="text-red-500">*</span>
                          </label>
                          <Input
                            placeholder="Titre de l'actualité"
                            value={newsForm.title}
                            onChange={(e) => {
                              setNewsForm({
                                ...newsForm,
                                title: e.target.value,
                                slug: generateSlug(e.target.value),
                              });
                            }}
                            size="lg"
                            classNames={{
                              inputWrapper: "bg-gray-50 border border-gray-200",
                            }}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Slug (URL)
                          </label>
                          <Input
                            placeholder="titre-de-lactualite"
                            value={newsForm.slug}
                            onChange={(e) => setNewsForm({ ...newsForm, slug: e.target.value })}
                            classNames={{
                              inputWrapper: "bg-gray-50 border border-gray-200",
                            }}
                          />
                          <p className="text-xs text-gray-400 mt-1">URL : /actualites/{newsForm.slug || "..."}</p>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Extrait
                          </label>
                          <textarea
                            placeholder="Résumé court affiché dans les listes"
                            value={newsForm.excerpt}
                            onChange={(e) => setNewsForm({ ...newsForm, excerpt: e.target.value })}
                            rows={3}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-edf-blue/20 focus:border-edf-blue resize-y"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Contenu
                          </label>
                          <textarea
                            placeholder="Contenu complet de l'actualité"
                            value={newsForm.content}
                            onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
                            rows={12}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-edf-blue/20 focus:border-edf-blue resize-y"
                          />
                        </div>
                      </div>

                      {/* Colonne latérale */}
                      <div className="space-y-6">
                        {/* Upload image */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Image de couverture
                          </label>
                          <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-edf-blue/50 transition-colors">
                            {newsForm.image_url ? (
                              <div className="relative">
                                <Image
                                  src={newsForm.image_url}
                                  alt="Aperçu"
                                  width={300}
                                  height={200}
                                  className="w-full h-40 object-cover rounded-lg"
                                />
                                <Button
                                  size="sm"
                                  isIconOnly
                                  variant="flat"
                                  className="absolute top-2 right-2 bg-white/90"
                                  onPress={() => setNewsForm({ ...newsForm, image_url: "" })}
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            ) : (
                              <div
                                className="flex flex-col items-center justify-center py-8 cursor-pointer"
                                onClick={() => fileInputRef.current?.click()}
                              >
                                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                                  <ImageIcon className="w-6 h-6 text-gray-400" />
                                </div>
                                <p className="text-sm font-medium text-gray-700">Cliquez pour uploader</p>
                                <p className="text-xs text-gray-400 mt-1">JPG, PNG, WebP (max 5MB)</p>
                              </div>
                            )}
                            <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/jpeg,image/png,image/webp,image/gif"
                              onChange={handleNewsFileSelect}
                              className="hidden"
                            />
                            {uploading && (
                              <Progress
                                value={uploadProgress}
                                className="mt-3"
                                color="primary"
                                size="sm"
                              />
                            )}
                            {uploadError && (
                              <p className="text-xs text-red-500 mt-2">{uploadError}</p>
                            )}
                          </div>
                        </div>

                        {/* Publication */}
                        <div 
                          className="p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors"
                          onClick={() => setNewsForm({ ...newsForm, is_published: !newsForm.is_published })}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900">Publier</p>
                              <p className="text-sm text-gray-500">Visible sur le site</p>
                            </div>
                            <div 
                              className={`w-12 h-7 rounded-full transition-colors flex items-center px-1 ${
                                newsForm.is_published ? "bg-green-500" : "bg-gray-300"
                              }`}
                            >
                              <div 
                                className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                                  newsForm.is_published ? "translate-x-5" : "translate-x-0"
                                }`}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            )}
          </>
        )}

        {/* =============================================
            SECTION PARTENARIATS
            ============================================= */}
        {activeSection === "partnerships" && (
          <>
            {/* Liste des partenariats */}
            {viewMode === "list" && (
              <Card className="mt-6 border border-gray-100 shadow-sm">
                <CardHeader className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Gestion des partenariats</h2>
                    <p className="text-sm text-gray-500">Gérez vos partenaires</p>
                  </div>
                  <Button
                    className="bg-edf-blue text-white font-medium"
                    startContent={<Plus className="w-4 h-4" />}
                    onPress={openCreatePartnership}
                  >
                    Nouveau partenaire
                  </Button>
                </CardHeader>
                <CardBody className="p-0">
                  <Table 
                    aria-label="Liste des partenariats"
                    classNames={{
                      th: "bg-gray-50 text-gray-600 font-semibold",
                      td: "py-4",
                    }}
                  >
                    <TableHeader>
                      <TableColumn>NOM</TableColumn>
                      <TableColumn>CATÉGORIE</TableColumn>
                      <TableColumn>STATUT</TableColumn>
                      <TableColumn>ACTIONS</TableColumn>
                    </TableHeader>
                    <TableBody emptyContent="Aucun partenariat">
                      {partnerships.map((item) => (
                        <TableRow key={item.id} className="hover:bg-gray-50">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              {item.logo_url && (
                                <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                  <Image
                                    src={item.logo_url}
                                    alt={item.name}
                                    width={40}
                                    height={40}
                                    className="w-full h-full object-contain"
                                  />
                                </div>
                              )}
                              <p className="font-medium text-gray-900">{item.name}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            {item.category ? (
                              <Chip size="sm" variant="flat" className="bg-edf-blue/10 text-edf-blue">
                                {item.category}
                              </Chip>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {item.is_active ? (
                              <Chip color="success" variant="flat" size="sm">Actif</Chip>
                            ) : (
                              <Chip color="default" variant="flat" size="sm">Inactif</Chip>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                variant="light"
                                isIconOnly
                                onPress={() => openEditPartnership(item)}
                                className="text-gray-600 hover:text-edf-blue"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="light"
                                isIconOnly
                                onPress={() => deletePartnership(item.id)}
                                className="text-gray-600 hover:text-red-500"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardBody>
              </Card>
            )}

            {/* Formulaire création/édition partenariat */}
            {(viewMode === "create" || viewMode === "edit") && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6"
              >
                <Card className="border border-gray-100 shadow-sm">
                  <CardHeader className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
                    <div className="flex items-center gap-4">
                      <Button
                        variant="light"
                        isIconOnly
                        onPress={backToList}
                        className="text-gray-500"
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </Button>
                      <div>
                        <h2 className="text-lg font-bold text-gray-900">
                          {editingPartnership ? "Modifier le partenaire" : "Nouveau partenaire"}
                        </h2>
                        <p className="text-sm text-gray-500">
                          {editingPartnership ? "Modifiez les informations" : "Ajoutez un partenaire"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {saveSuccess && (
                        <Chip color="success" variant="flat" startContent={<Check className="w-4 h-4" />}>
                          Enregistré
                        </Chip>
                      )}
                      <Button
                        className="bg-edf-blue text-white font-medium"
                        startContent={saving ? null : <Save className="w-4 h-4" />}
                        onPress={savePartnership}
                        isLoading={saving}
                        isDisabled={!partnershipForm.name}
                      >
                        {editingPartnership ? "Enregistrer" : "Créer"}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardBody className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Colonne principale */}
                      <div className="lg:col-span-2 space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nom <span className="text-red-500">*</span>
                          </label>
                          <Input
                            placeholder="Nom du partenaire"
                            value={partnershipForm.name}
                            onChange={(e) => {
                              setPartnershipForm({
                                ...partnershipForm,
                                name: e.target.value,
                                slug: generateSlug(e.target.value),
                              });
                            }}
                            size="lg"
                            classNames={{
                              inputWrapper: "bg-gray-50 border border-gray-200",
                            }}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                          </label>
                          <textarea
                            placeholder="Description du partenaire"
                            value={partnershipForm.description}
                            onChange={(e) => setPartnershipForm({ ...partnershipForm, description: e.target.value })}
                            rows={5}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-edf-blue/20 focus:border-edf-blue resize-y"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Catégorie
                            </label>
                            <Input
                              placeholder="institutionnel, local..."
                              value={partnershipForm.category}
                              onChange={(e) => setPartnershipForm({ ...partnershipForm, category: e.target.value })}
                              classNames={{
                                inputWrapper: "bg-gray-50 border border-gray-200",
                              }}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Site web
                            </label>
                            <Input
                              placeholder="https://..."
                              value={partnershipForm.website_url}
                              onChange={(e) => setPartnershipForm({ ...partnershipForm, website_url: e.target.value })}
                              classNames={{
                                inputWrapper: "bg-gray-50 border border-gray-200",
                              }}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Ordre d&apos;affichage
                          </label>
                          <Input
                            type="number"
                            value={String(partnershipForm.display_order)}
                            onChange={(e) => setPartnershipForm({ ...partnershipForm, display_order: parseInt(e.target.value) || 0 })}
                            classNames={{
                              inputWrapper: "bg-gray-50 border border-gray-200",
                            }}
                          />
                        </div>
                      </div>

                      {/* Colonne latérale */}
                      <div className="space-y-6">
                        {/* Upload logo */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Logo
                          </label>
                          <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-edf-blue/50 transition-colors">
                            {partnershipForm.logo_url ? (
                              <div className="relative">
                                <Image
                                  src={partnershipForm.logo_url}
                                  alt="Aperçu"
                                  width={200}
                                  height={200}
                                  className="w-full h-32 object-contain rounded-lg bg-white"
                                />
                                <Button
                                  size="sm"
                                  isIconOnly
                                  variant="flat"
                                  className="absolute top-2 right-2 bg-white/90"
                                  onPress={() => setPartnershipForm({ ...partnershipForm, logo_url: "" })}
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            ) : (
                              <div
                                className="flex flex-col items-center justify-center py-8 cursor-pointer"
                                onClick={() => document.getElementById("partnership-file-input")?.click()}
                              >
                                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                                  <Upload className="w-6 h-6 text-gray-400" />
                                </div>
                                <p className="text-sm font-medium text-gray-700">Cliquez pour uploader</p>
                                <p className="text-xs text-gray-400 mt-1">JPG, PNG, WebP (max 5MB)</p>
                              </div>
                            )}
                            <input
                              id="partnership-file-input"
                              type="file"
                              accept="image/jpeg,image/png,image/webp,image/gif"
                              onChange={handlePartnershipFileSelect}
                              className="hidden"
                            />
                            {uploading && (
                              <Progress
                                value={uploadProgress}
                                className="mt-3"
                                color="primary"
                                size="sm"
                              />
                            )}
                            {uploadError && (
                              <p className="text-xs text-red-500 mt-2">{uploadError}</p>
                            )}
                          </div>
                        </div>

                        {/* Statut actif */}
                        <div 
                          className="p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors"
                          onClick={() => setPartnershipForm({ ...partnershipForm, is_active: !partnershipForm.is_active })}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900">Actif</p>
                              <p className="text-sm text-gray-500">Visible sur le site</p>
                            </div>
                            <div 
                              className={`w-12 h-7 rounded-full transition-colors flex items-center px-1 ${
                                partnershipForm.is_active ? "bg-green-500" : "bg-gray-300"
                              }`}
                            >
                              <div 
                                className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                                  partnershipForm.is_active ? "translate-x-5" : "translate-x-0"
                                }`}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
