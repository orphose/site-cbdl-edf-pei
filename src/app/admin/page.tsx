"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import type { News, Partnership } from "@/lib/database.types";
import type { User } from "@supabase/supabase-js";
import Link from "next/link";

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

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  // Chargement des données quand l'utilisateur est connecté
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

  // Générer un slug à partir du titre
  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
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
    newsModal.onOpen();
  };

  // Sauvegarder actualité
  const saveNews = async () => {
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

      newsModal.onClose();
      loadData();
    } catch (error) {
      console.error("Erreur sauvegarde actualité:", error);
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

      partnershipModal.onClose();
      loadData();
    } catch (error) {
      console.error("Erreur sauvegarde partenariat:", error);
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
        {/* Fond décoratif */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 right-0 h-2 bg-edf-blue" />
          <div className="absolute top-20 right-0 w-96 h-96 bg-edf-blue/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-0 w-80 h-80 bg-edf-orange/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-edf-green/5 rounded-full blur-3xl" />
        </div>

        {/* Header */}
        <header className="relative z-10 p-6">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-edf-blue transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Retour au site</span>
          </Link>
        </header>

        {/* Formulaire de connexion */}
        <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-md"
          >
            {/* Formulaire */}
            <Card className="shadow-xl border border-gray-100">
              <CardBody className="p-8">
                <div className="space-y-5">
                  {/* Message d'erreur */}
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
      <header className="bg-white sticky top-0 z-50">
        <div className="h-1 bg-gradient-to-r from-edf-blue via-edf-orange to-edf-green" />
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div>
                <h1 className="text-lg font-bold text-gray-900">Tableau de bord</h1>
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
                          <div className="max-w-sm">
                            <p className="font-medium text-gray-900 truncate">{item.title}</p>
                            <p className="text-xs text-gray-400 truncate">/actualites/{item.slug}</p>
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
                              onPress={() => confirmDelete("news", item.id)}
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
                              onPress={() => confirmDelete("partnership", item.id)}
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
          </Tab>
        </Tabs>
      </div>

      {/* Modal Actualité */}
      <Modal 
        isOpen={newsModal.isOpen} 
        onClose={newsModal.onClose} 
        size="3xl"
        backdrop="blur"
        scrollBehavior="inside"
      >
        <ModalContent>
          <ModalHeader className="border-b border-gray-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-edf-blue/10 flex items-center justify-center">
                <Newspaper className="w-5 h-5 text-edf-blue" />
              </div>
              <div>
                <h3 className="text-lg font-bold">
                  {editingNews ? "Modifier l'actualité" : "Nouvelle actualité"}
                </h3>
                <p className="text-sm text-gray-500 font-normal">
                  {editingNews ? "Modifiez les informations" : "Créez une nouvelle actualité"}
                </p>
              </div>
            </div>
          </ModalHeader>
          <ModalBody className="py-6">
            <div className="space-y-5">
              <Input
                label="Titre"
                placeholder="Titre de l'actualité"
                value={newsForm.title}
                onChange={(e) => {
                  setNewsForm({
                    ...newsForm,
                    title: e.target.value,
                    slug: generateSlug(e.target.value),
                  });
                }}
                isRequired
                labelPlacement="outside"
              />
              <Input
                label="Slug (URL)"
                placeholder="titre-de-lactualite"
                value={newsForm.slug}
                onChange={(e) => setNewsForm({ ...newsForm, slug: e.target.value })}
                labelPlacement="outside"
                description="URL de l'actualité : /actualites/votre-slug"
              />
              <Textarea
                label="Extrait"
                placeholder="Résumé court"
                value={newsForm.excerpt}
                onChange={(e) => setNewsForm({ ...newsForm, excerpt: e.target.value })}
                minRows={2}
                labelPlacement="outside"
              />
              <Textarea
                label="Contenu"
                placeholder="Contenu complet"
                value={newsForm.content}
                onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
                minRows={6}
                labelPlacement="outside"
              />
              <Input
                label="URL de l'image"
                placeholder="https://..."
                value={newsForm.image_url}
                onChange={(e) => setNewsForm({ ...newsForm, image_url: e.target.value })}
                labelPlacement="outside"
              />
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-medium text-gray-900">Publier l&apos;actualité</p>
                  <p className="text-sm text-gray-500">Visible sur le site</p>
                </div>
                <Switch
                  isSelected={newsForm.is_published}
                  onValueChange={(value) => setNewsForm({ ...newsForm, is_published: value })}
                  color="success"
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter className="border-t border-gray-100 pt-4">
            <Button variant="light" onPress={newsModal.onClose}>Annuler</Button>
            <Button className="bg-edf-blue text-white" onPress={saveNews}>
              {editingNews ? "Enregistrer" : "Créer"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal Partenariat */}
      <Modal 
        isOpen={partnershipModal.isOpen} 
        onClose={partnershipModal.onClose} 
        size="2xl"
        backdrop="blur"
        scrollBehavior="inside"
      >
        <ModalContent>
          <ModalHeader className="border-b border-gray-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-edf-green/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-edf-green" />
              </div>
              <div>
                <h3 className="text-lg font-bold">
                  {editingPartnership ? "Modifier le partenaire" : "Nouveau partenaire"}
                </h3>
                <p className="text-sm text-gray-500 font-normal">
                  {editingPartnership ? "Modifiez les informations" : "Ajoutez un partenaire"}
                </p>
              </div>
            </div>
          </ModalHeader>
          <ModalBody className="py-6">
            <div className="space-y-5">
              <Input
                label="Nom"
                placeholder="Nom du partenaire"
                value={partnershipForm.name}
                onChange={(e) => {
                  setPartnershipForm({
                    ...partnershipForm,
                    name: e.target.value,
                    slug: generateSlug(e.target.value),
                  });
                }}
                isRequired
                labelPlacement="outside"
              />
              <Textarea
                label="Description"
                placeholder="Description"
                value={partnershipForm.description}
                onChange={(e) => setPartnershipForm({ ...partnershipForm, description: e.target.value })}
                minRows={3}
                labelPlacement="outside"
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Catégorie"
                  placeholder="institutionnel..."
                  value={partnershipForm.category}
                  onChange={(e) => setPartnershipForm({ ...partnershipForm, category: e.target.value })}
                  labelPlacement="outside"
                />
                <Input
                  type="number"
                  label="Ordre d'affichage"
                  value={String(partnershipForm.display_order)}
                  onChange={(e) => setPartnershipForm({ ...partnershipForm, display_order: parseInt(e.target.value) || 0 })}
                  labelPlacement="outside"
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
            <Button className="bg-edf-blue text-white" onPress={savePartnership}>
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
      >
        <ModalContent>
          <ModalHeader className="text-red-600">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-red-600" />
              </div>
              <span>Confirmer la suppression</span>
            </div>
          </ModalHeader>
          <ModalBody>
            <p className="text-gray-700">Êtes-vous sûr de vouloir supprimer cet élément ?</p>
            <p className="text-sm text-gray-500">Cette action est irréversible.</p>
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
