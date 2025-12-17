"use client";

import { useState, useEffect, useRef } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Textarea,
  Switch,
  Tabs,
  Tab,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
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
  ArrowLeft,
  Mail,
  AlertCircle,
  Upload,
  X,
  Image as ImageIcon,
  Check,
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import type { News, Partnership } from "@/lib/database.types";
import type { User } from "@supabase/supabase-js";
import Link from "next/link";
import Image from "next/image";

// URL de base pour le storage Supabase
const STORAGE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL + "/storage/v1/object/public";

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

  // États upload image
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  // États sauvegarde
  const [saving, setSaving] = useState(false);

  // Modals
  const newsModal = useDisclosure();
  const partnershipModal = useDisclosure();
  const deleteModal = useDisclosure();
  const [deleteTarget, setDeleteTarget] = useState<{ type: "news" | "partnership"; id: string } | null>(null);

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
    console.assert(email.length > 0, "Email requis");
    console.assert(password.length > 0, "Mot de passe requis");

    setAuthLoading(true);
    setAuthError("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });

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
  const handleImageUpload = async (file: File) => {
    console.assert(file, "Fichier requis");
    console.assert(file.type.startsWith("image/"), "Le fichier doit être une image");

    setUploading(true);
    setUploadProgress(0);

    try {
      // Générer un nom unique
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      // Simuler la progression
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 100);

      // Upload vers Supabase Storage
      const { error } = await supabase.storage
        .from("actualites")
        .upload(fileName, file, { cacheControl: "3600", upsert: false });

      clearInterval(progressInterval);

      if (error) throw error;

      setUploadProgress(100);
      setNewsForm(prev => ({ ...prev, image_url: fileName }));
      setImagePreview(URL.createObjectURL(file));

      // Reset après succès
      setTimeout(() => setUploadProgress(0), 1000);
    } catch (error) {
      console.error("Erreur upload:", error);
      setUploadProgress(0);
    } finally {
      setUploading(false);
    }
  };

  // Supprimer image
  const handleRemoveImage = async () => {
    if (newsForm.image_url && !editingNews) {
      await supabase.storage.from("actualites").remove([newsForm.image_url]);
    }
    setNewsForm(prev => ({ ...prev, image_url: "" }));
    setImagePreview(null);
  };

  // Ouvrir modal création actualité
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
    setImagePreview(null);
    newsModal.onOpen();
  };

  // Ouvrir modal édition actualité
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
    setImagePreview(item.image_url ? `${STORAGE_URL}/actualites/${item.image_url}` : null);
    newsModal.onOpen();
  };

  // Sauvegarder actualité
  const saveNews = async () => {
    console.assert(newsForm.title.length > 0, "Titre requis");

    setSaving(true);

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
        const { error } = await supabase.from("news").update(newsData).eq("id", editingNews.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("news").insert(newsData);
        if (error) throw error;
      }

      newsModal.onClose();
      loadData();
    } catch (error) {
      console.error("Erreur sauvegarde:", error);
    } finally {
      setSaving(false);
    }
  };

  // Ouvrir modal création partenariat
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
    partnershipModal.onOpen();
  };

  // Ouvrir modal édition partenariat
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
    partnershipModal.onOpen();
  };

  // Sauvegarder partenariat
  const savePartnership = async () => {
    console.assert(partnershipForm.name.length > 0, "Nom requis");

    setSaving(true);

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
        const { error } = await supabase.from("partnerships").update(partnershipData).eq("id", editingPartnership.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("partnerships").insert(partnershipData);
        if (error) throw error;
      }

      partnershipModal.onClose();
      loadData();
    } catch (error) {
      console.error("Erreur sauvegarde:", error);
    } finally {
      setSaving(false);
    }
  };

  // Confirmer suppression
  const confirmDelete = (type: "news" | "partnership", id: string) => {
    setDeleteTarget({ type, id });
    deleteModal.onOpen();
  };

  // Supprimer élément
  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      if (deleteTarget.type === "news") {
        // Supprimer l'image associée
        const newsItem = news.find(n => n.id === deleteTarget.id);
        if (newsItem?.image_url) {
          await supabase.storage.from("actualites").remove([newsItem.image_url]);
        }
        await supabase.from("news").delete().eq("id", deleteTarget.id);
      } else {
        await supabase.from("partnerships").delete().eq("id", deleteTarget.id);
      }
      deleteModal.onClose();
      loadData();
    } catch (error) {
      console.error("Erreur suppression:", error);
    }
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
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-edf-blue via-edf-orange to-edf-green" />
          <div className="absolute top-20 right-0 w-96 h-96 bg-edf-blue/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-0 w-80 h-80 bg-edf-orange/5 rounded-full blur-3xl" />
        </div>

        <header className="relative z-10 p-6">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-edf-blue transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Retour au site</span>
          </Link>
        </header>

        <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-4">
          <div className="w-full max-w-md">
            <Card className="shadow-xl border border-gray-100">
              <CardBody className="p-8">
                <div className="space-y-6">
                  {authError && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{authError}</span>
                    </div>
                  )}

                  <Input
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    startContent={<Mail className="w-4 h-4 text-gray-400" />}
                  />

                  <Input
                    label="Mot de passe"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                    startContent={<Lock className="w-4 h-4 text-gray-400" />}
                  />

                  <Button
                    onPress={handleLogin}
                    isLoading={authLoading}
                    className="w-full h-12 bg-edf-blue hover:bg-edf-blue/90 text-white font-semibold"
                  >
                    Se connecter
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
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
      <header className="bg-white sticky top-0 z-50 border-b border-gray-100">
        <div className="h-1 bg-gradient-to-r from-edf-blue via-edf-orange to-edf-green" />
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-gray-900">Administration</h1>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="light" size="sm" startContent={<Eye className="w-4 h-4" />}>
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

      {/* Statistiques */}
      <div className="max-w-7xl mx-auto px-6 py-6">
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
                <p className="text-2xl font-bold text-gray-900">{news.filter(n => n.is_published).length}</p>
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

        {/* Onglets */}
        <Tabs 
          aria-label="Sections admin" 
          color="primary" 
          variant="underlined"
          classNames={{
            tabList: "gap-6 w-full relative rounded-none p-0 border-b border-gray-200",
            cursor: "w-full bg-edf-blue",
            tab: "max-w-fit px-0 h-12",
            tabContent: "group-data-[selected=true]:text-edf-blue font-medium",
          }}
        >
          {/* Onglet Actualités */}
          <Tab
            key="news"
            title={
              <div className="flex items-center gap-2">
                <Newspaper className="w-4 h-4" />
                <span>Actualités</span>
                <Chip size="sm" variant="flat" className="bg-gray-100">{news.length}</Chip>
              </div>
            }
          >
            <Card className="mt-6 border border-gray-100">
              <CardHeader className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Gestion des actualités</h2>
                  <p className="text-sm text-gray-500">Créez et gérez vos actualités</p>
                </div>
                <Button
                  className="bg-edf-blue text-white"
                  startContent={<Plus className="w-4 h-4" />}
                  onPress={openCreateNews}
                >
                  Nouvelle actualité
                </Button>
              </CardHeader>
              <CardBody className="p-0">
                <Table aria-label="Liste des actualités" classNames={{ th: "bg-gray-50 text-gray-600 font-semibold" }}>
                  <TableHeader>
                    <TableColumn>IMAGE</TableColumn>
                    <TableColumn>TITRE</TableColumn>
                    <TableColumn>STATUT</TableColumn>
                    <TableColumn>DATE</TableColumn>
                    <TableColumn>ACTIONS</TableColumn>
                  </TableHeader>
                  <TableBody emptyContent="Aucune actualité">
                    {news.map((item) => (
                      <TableRow key={item.id} className="hover:bg-gray-50">
                        <TableCell>
                          <div className="w-16 h-12 rounded-lg overflow-hidden bg-gray-100">
                            {item.image_url ? (
                              <Image
                                src={`${STORAGE_URL}/actualites/${item.image_url}`}
                                alt={item.title}
                                width={64}
                                height={48}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <ImageIcon className="w-5 h-5 text-gray-400" />
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="font-medium text-gray-900 truncate max-w-xs">{item.title}</p>
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
                          {new Date(item.created_at).toLocaleDateString("fr-FR")}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button size="sm" variant="light" isIconOnly onPress={() => openEditNews(item)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="light" isIconOnly color="danger" onPress={() => confirmDelete("news", item.id)}>
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
          </Tab>

          {/* Onglet Partenariats */}
          <Tab
            key="partnerships"
            title={
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>Partenariats</span>
                <Chip size="sm" variant="flat" className="bg-gray-100">{partnerships.length}</Chip>
              </div>
            }
          >
            <Card className="mt-6 border border-gray-100">
              <CardHeader className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Gestion des partenariats</h2>
                  <p className="text-sm text-gray-500">Gérez vos partenaires</p>
                </div>
                <Button
                  className="bg-edf-blue text-white"
                  startContent={<Plus className="w-4 h-4" />}
                  onPress={openCreatePartnership}
                >
                  Nouveau partenaire
                </Button>
              </CardHeader>
              <CardBody className="p-0">
                <Table aria-label="Liste des partenariats" classNames={{ th: "bg-gray-50 text-gray-600 font-semibold" }}>
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
                          <p className="font-medium text-gray-900">{item.name}</p>
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
                            <Button size="sm" variant="light" isIconOnly onPress={() => openEditPartnership(item)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="light" isIconOnly color="danger" onPress={() => confirmDelete("partnership", item.id)}>
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
          </Tab>
        </Tabs>
      </div>

      {/* Modal Actualité - Design EDF */}
      <Modal 
        isOpen={newsModal.isOpen} 
        onClose={newsModal.onClose} 
        size="2xl"
        backdrop="blur"
        placement="center"
        scrollBehavior="inside"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 border-b border-gray-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-edf-blue flex items-center justify-center">
                <Newspaper className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {editingNews ? "Modifier l'actualité" : "Nouvelle actualité"}
                </h3>
                <p className="text-sm text-gray-500 font-normal">
                  {editingNews ? "Modifiez les informations ci-dessous" : "Remplissez les informations ci-dessous"}
                </p>
              </div>
            </div>
          </ModalHeader>

          <ModalBody className="py-6">
            <div className="space-y-6">
              {/* Zone d'upload image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image de couverture
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file);
                  }}
                />
                
                {imagePreview ? (
                  <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                    <Image
                      src={imagePreview}
                      alt="Prévisualisation"
                      width={600}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <Button
                        size="sm"
                        isIconOnly
                        className="bg-white/90 hover:bg-white"
                        onPress={() => fileInputRef.current?.click()}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        isIconOnly
                        color="danger"
                        className="bg-white/90 hover:bg-red-50"
                        onPress={handleRemoveImage}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    {uploadProgress > 0 && uploadProgress < 100 && (
                      <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/50">
                        <Progress value={uploadProgress} size="sm" color="primary" />
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                    onClick={() => !uploading && fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-edf-blue hover:bg-edf-blue/5 transition-all cursor-pointer"
                  >
                    {uploading ? (
                      <div className="space-y-3">
                        <div className="w-12 h-12 mx-auto rounded-full bg-edf-blue/10 flex items-center justify-center">
                          <Upload className="w-6 h-6 text-edf-blue animate-pulse" />
                        </div>
                        <Progress value={uploadProgress} size="sm" color="primary" className="max-w-xs mx-auto" />
                        <p className="text-sm text-gray-500">Upload en cours...</p>
                      </div>
                    ) : (
                      <>
                        <div className="w-12 h-12 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-3">
                          <Upload className="w-6 h-6 text-gray-400" />
                        </div>
                        <p className="text-sm font-medium text-gray-700">Cliquez pour uploader une image</p>
                        <p className="text-xs text-gray-500 mt-1">PNG, JPG jusqu&apos;à 5MB</p>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Titre */}
              <Input
                label="Titre de l'actualité"
                value={newsForm.title}
                onChange={(e) => {
                  setNewsForm({
                    ...newsForm,
                    title: e.target.value,
                    slug: generateSlug(e.target.value),
                  });
                }}
                isRequired
                variant="bordered"
                classNames={{ label: "text-gray-700" }}
              />

              {/* Slug */}
              <Input
                label="URL (slug)"
                value={newsForm.slug}
                onChange={(e) => setNewsForm({ ...newsForm, slug: e.target.value })}
                variant="bordered"
                description={`Accessible sur : /actualites/${newsForm.slug || "..."}`}
                classNames={{ label: "text-gray-700" }}
              />

              {/* Extrait */}
              <Textarea
                label="Extrait (résumé)"
                value={newsForm.excerpt}
                onChange={(e) => setNewsForm({ ...newsForm, excerpt: e.target.value })}
                variant="bordered"
                minRows={2}
                maxRows={3}
                classNames={{ label: "text-gray-700" }}
              />

              {/* Contenu */}
              <Textarea
                label="Contenu complet"
                value={newsForm.content}
                onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
                variant="bordered"
                minRows={4}
                maxRows={8}
                classNames={{ label: "text-gray-700" }}
              />

              {/* Switch publication */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  {newsForm.is_published ? (
                    <div className="w-10 h-10 rounded-lg bg-edf-green/10 flex items-center justify-center">
                      <Check className="w-5 h-5 text-edf-green" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center">
                      <EyeOff className="w-5 h-5 text-gray-500" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-gray-900">
                      {newsForm.is_published ? "Publié" : "Brouillon"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {newsForm.is_published ? "Visible sur le site" : "Non visible sur le site"}
                    </p>
                  </div>
                </div>
                <Switch
                  isSelected={newsForm.is_published}
                  onValueChange={(value) => setNewsForm({ ...newsForm, is_published: value })}
                  color="success"
                  size="lg"
                />
              </div>
            </div>
          </ModalBody>

          <ModalFooter className="border-t border-gray-100 pt-4">
            <Button variant="light" onPress={newsModal.onClose}>
              Annuler
            </Button>
            <Button 
              className="bg-edf-blue text-white" 
              onPress={saveNews}
              isLoading={saving}
              isDisabled={!newsForm.title}
            >
              {editingNews ? "Enregistrer" : "Créer l'actualité"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal Partenariat */}
      <Modal 
        isOpen={partnershipModal.isOpen} 
        onClose={partnershipModal.onClose} 
        size="lg"
        backdrop="blur"
        placement="center"
      >
        <ModalContent>
          <ModalHeader className="border-b border-gray-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-edf-green flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {editingPartnership ? "Modifier le partenaire" : "Nouveau partenaire"}
                </h3>
                <p className="text-sm text-gray-500 font-normal">
                  {editingPartnership ? "Modifiez les informations" : "Ajoutez un nouveau partenaire"}
                </p>
              </div>
            </div>
          </ModalHeader>

          <ModalBody className="py-6">
            <div className="space-y-4">
              <Input
                label="Nom du partenaire"
                value={partnershipForm.name}
                onChange={(e) => {
                  setPartnershipForm({
                    ...partnershipForm,
                    name: e.target.value,
                    slug: generateSlug(e.target.value),
                  });
                }}
                isRequired
                variant="bordered"
              />

              <Textarea
                label="Description"
                value={partnershipForm.description}
                onChange={(e) => setPartnershipForm({ ...partnershipForm, description: e.target.value })}
                variant="bordered"
                minRows={2}
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Catégorie"
                  value={partnershipForm.category}
                  onChange={(e) => setPartnershipForm({ ...partnershipForm, category: e.target.value })}
                  variant="bordered"
                />
                <Input
                  type="number"
                  label="Ordre d'affichage"
                  value={String(partnershipForm.display_order)}
                  onChange={(e) => setPartnershipForm({ ...partnershipForm, display_order: parseInt(e.target.value) || 0 })}
                  variant="bordered"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-medium text-gray-900">Partenaire actif</p>
                  <p className="text-sm text-gray-500">Visible sur le site</p>
                </div>
                <Switch
                  isSelected={partnershipForm.is_active}
                  onValueChange={(value) => setPartnershipForm({ ...partnershipForm, is_active: value })}
                  color="success"
                />
              </div>
            </div>
          </ModalBody>

          <ModalFooter className="border-t border-gray-100 pt-4">
            <Button variant="light" onPress={partnershipModal.onClose}>Annuler</Button>
            <Button 
              className="bg-edf-blue text-white" 
              onPress={savePartnership}
              isLoading={saving}
              isDisabled={!partnershipForm.name}
            >
              {editingPartnership ? "Enregistrer" : "Créer"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal Suppression */}
      <Modal 
        isOpen={deleteModal.isOpen} 
        onClose={deleteModal.onClose}
        backdrop="blur"
        placement="center"
        size="sm"
      >
        <ModalContent>
          <ModalHeader className="pb-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-red-600" />
              </div>
              <span className="text-lg font-bold text-gray-900">Supprimer ?</span>
            </div>
          </ModalHeader>
          <ModalBody>
            <p className="text-gray-600">Cette action est irréversible. L&apos;élément sera définitivement supprimé.</p>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={deleteModal.onClose}>Annuler</Button>
            <Button color="danger" onPress={handleDelete}>Supprimer</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
