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
  Sparkles,
  Wand2,
  Linkedin,
  Hash,
  ExternalLink,
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import type { News, Partnership } from "@/lib/database.types";
import type { User } from "@supabase/supabase-js";
import Link from "next/link";
import Image from "next/image";
import { IMAGES } from "@/lib/media";
import { getMediaUrl } from "@/lib/supabase";

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
    gallery: [] as string[],
    is_published: false,
  });

  // États pour le partage LinkedIn
  const [linkedInShare, setLinkedInShare] = useState({
    enabled: false,
    customText: "",
    hashtags: ["CBDL", "EnergieRenouvelable", "Guyane"] as string[],
    newHashtag: "",
  });

  // États du formulaire partenariat (simplifié)
  const [editingPartnership, setEditingPartnership] = useState<Partnership | null>(null);
  const [partnershipForm, setPartnershipForm] = useState({
    name: "",
    description: "",
    logo_url: "",
    color: "#001A70",
    is_active: true,
  });

  // États d'upload
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  // États de sauvegarde
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // États assistant IA
  const [aiMode, setAiMode] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiError, setAiError] = useState("");

  // Fonction pour générer du contenu complet avec l'IA
  const generateWithAI = async (type: "news" | "partnership") => {
    if (!aiPrompt.trim()) {
      setAiError("Décrivez ce que vous souhaitez rédiger");
      return;
    }

    setAiGenerating(true);
    setAiError("");

    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          prompt: aiPrompt,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de la génération");
      }

      // Mettre à jour tous les champs
      if (type === "news") {
        setNewsForm({
          ...newsForm,
          title: data.title || newsForm.title,
          slug: data.title ? generateSlug(data.title) : newsForm.slug,
          excerpt: data.excerpt || newsForm.excerpt,
          content: data.content || newsForm.content,
        });
      } else {
        setPartnershipForm({
          ...partnershipForm,
          name: data.title || partnershipForm.name,
          description: data.description || partnershipForm.description,
        });
      }

      setAiPrompt("");
      setAiMode(false);
    } catch (error) {
      console.error("Erreur IA:", error);
      setAiError(error instanceof Error ? error.message : "Erreur de génération");
    } finally {
      setAiGenerating(false);
    }
  };

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

  // Ouvrir la fenêtre de partage LinkedIn
  const openLinkedInShare = (articleUrl: string, _title: string, content: string) => {
    // Construire le texte du post avec hashtags et lien
    const hashtags = linkedInShare.hashtags.map(h => `#${h}`).join(" ");
    const postText = linkedInShare.customText || content;
    // Inclure le lien et les hashtags dans le texte (pas de limite de caractères)
    const fullText = `${postText}\n\n🔗 ${articleUrl}\n\n${hashtags}`;
    
    // Utiliser l'URL de création de post LinkedIn (permet de pré-remplir le texte)
    // Format: https://www.linkedin.com/feed/?shareActive=true&text=TEXTE_ENCODE
    const linkedInUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(fullText)}`;
    
    // Ouvrir dans une nouvelle fenêtre popup
    const width = 600;
    const height = 700;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    
    window.open(
      linkedInUrl,
      "linkedin-share",
      `width=${width},height=${height},left=${left},top=${top},scrollbars=yes`
    );
  };

  // Ajouter un hashtag
  const addHashtag = () => {
    const tag = linkedInShare.newHashtag.trim().replace(/^#/, "");
    if (tag && !linkedInShare.hashtags.includes(tag) && linkedInShare.hashtags.length < 10) {
      setLinkedInShare({
        ...linkedInShare,
        hashtags: [...linkedInShare.hashtags, tag],
        newHashtag: "",
      });
    }
  };

  // Supprimer un hashtag
  const removeHashtag = (tagToRemove: string) => {
    setLinkedInShare({
      ...linkedInShare,
      hashtags: linkedInShare.hashtags.filter(tag => tag !== tagToRemove),
    });
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

  // Gestionnaire de sélection de fichiers pour la galerie (max 8)
  const handleGalleryFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const remainingSlots = 8 - newsForm.gallery.length;
    if (remainingSlots <= 0) {
      setUploadError("La galerie est pleine (max 8 photos)");
      return;
    }

    const filesToUpload = Array.from(files).slice(0, remainingSlots);
    const newGalleryUrls: string[] = [];

    for (const file of filesToUpload) {
      const url = await handleImageUpload(file, "actualites");
      if (url) {
        newGalleryUrls.push(url);
      }
    }

    if (newGalleryUrls.length > 0) {
      setNewsForm({
        ...newsForm,
        gallery: [...newsForm.gallery, ...newGalleryUrls],
      });
    }

    // Reset l'input pour permettre de re-sélectionner les mêmes fichiers
    if (galleryInputRef.current) {
      galleryInputRef.current.value = "";
    }
  };

  // Supprimer une photo de la galerie
  const removeGalleryPhoto = (index: number) => {
    setNewsForm({
      ...newsForm,
      gallery: newsForm.gallery.filter((_, i) => i !== index),
    });
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
      gallery: [],
      is_published: false,
    });
    // Réinitialiser les options LinkedIn
    setLinkedInShare({
      enabled: false,
      customText: "",
      hashtags: ["CBDL", "EnergieRenouvelable", "Guyane"],
      newHashtag: "",
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
      gallery: item.gallery || [],
      is_published: item.is_published,
    });
    // Réinitialiser les options LinkedIn
    setLinkedInShare({
      enabled: false,
      customText: "",
      hashtags: ["CBDL", "EnergieRenouvelable", "Guyane"],
      newHashtag: "",
    });
    setViewMode("edit");
  };

  // Sauvegarder actualité
  const saveNews = async () => {
    setSaving(true);
    setSaveSuccess(false);

    try {
      const finalSlug = newsForm.slug || generateSlug(newsForm.title);
      const newsData = {
        title: newsForm.title,
        slug: finalSlug,
        excerpt: newsForm.excerpt || null,
        content: newsForm.content || null,
        image_url: newsForm.image_url || null,
        gallery: newsForm.gallery || [],
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

      // Ouvrir LinkedIn si l'option est activée et l'article est publié
      if (linkedInShare.enabled && newsForm.is_published) {
        // Construire l'URL de l'article (adapter selon votre domaine)
        const baseUrl = window.location.origin;
        const articleUrl = `${baseUrl}/actualites/${finalSlug}`;
        
        // Ouvrir la fenêtre LinkedIn après un court délai
        // Utiliser le contenu (description) par défaut, pas l'extrait
        setTimeout(() => {
          openLinkedInShare(
            articleUrl,
            newsForm.title,
            newsForm.content || newsForm.title
          );
        }, 500);
      }

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
      description: "",
      logo_url: "",
      color: "#001A70",
      is_active: true,
    });
    setViewMode("create");
  };

  // Ouvrir édition partenariat
  const openEditPartnership = (item: Partnership) => {
    setEditingPartnership(item);
    setPartnershipForm({
      name: item.name,
      description: item.description || "",
      logo_url: item.logo_url || "",
      color: item.color || "#001A70",
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
        slug: generateSlug(partnershipForm.name),
        description: partnershipForm.description || null,
        logo_url: partnershipForm.logo_url || null,
        website_url: null,
        category: "local", // Étiquette "Partenariat local" par défaut
        display_order: editingPartnership?.display_order ?? partnerships.length,
        is_active: partnershipForm.is_active,
        color: partnershipForm.color || "#001A70",
        icon_name: "zap", // Icône par défaut
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
      {/* Header - même style que le site principal */}
      <header className="bg-white sticky top-0 z-50 shadow-md h-[100px]">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo + Titre */}
          <div className="flex items-center gap-6">
            <Link href="/">
              <Image
                src={IMAGES.logo.couleurs}
                alt="EDF PEI"
                width={200}
                height={80}
                className="h-20 w-auto"
              />
            </Link>
            <div className="h-12 w-px bg-gray-200" />
            <div>
              <h1 className="text-lg font-bold text-gray-900">Administration</h1>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          </div>

          {/* Actions */}
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
                    {/* Assistant IA en haut du formulaire */}
                    <div className="mb-6">
                      <button
                        type="button"
                        onClick={() => {
                          setAiMode(!aiMode);
                          setAiPrompt("");
                          setAiError("");
                        }}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                          aiMode
                            ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg"
                            : "bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-700 hover:from-purple-100 hover:to-indigo-100 border border-purple-200"
                        }`}
                      >
                        <Sparkles className="w-4 h-4" />
                        {aiMode ? "Fermer l'assistant IA" : "Rédiger avec l'assistant IA"}
                      </button>
                      
                      {aiMode && (
                        <div className="mt-4 p-5 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-100">
                          <p className="text-sm text-purple-800 mb-3 flex items-center gap-2">
                            <Wand2 className="w-4 h-4" />
                            Décrivez le sujet, l&apos;IA génère <strong>titre + résumé + contenu</strong>
                          </p>
                          <textarea
                            placeholder="Ex: Inauguration de la centrale prévue en 2025 avec présence du préfet, mise en service progressive, création de 50 emplois locaux..."
                            value={aiPrompt}
                            onChange={(e) => setAiPrompt(e.target.value)}
                            rows={3}
                            className="w-full px-4 py-3 bg-white border border-purple-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-300 resize-none"
                          />
                          {aiError && (
                            <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {aiError}
                            </p>
                          )}
                          <div className="flex justify-end gap-2 mt-3">
                            <Button
                              size="sm"
                              variant="flat"
                              onPress={() => {
                                setAiMode(false);
                                setAiPrompt("");
                                setAiError("");
                              }}
                            >
                              Annuler
                            </Button>
                            <Button
                              size="sm"
                              className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white"
                              startContent={aiGenerating ? null : <Sparkles className="w-4 h-4" />}
                              isLoading={aiGenerating}
                              onPress={() => generateWithAI("news")}
                            >
                              {aiGenerating ? "Génération..." : "Générer tout"}
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>

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

                        {/* Galerie photos (max 8) */}
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Galerie photos
                            </label>
                            <span className="text-xs text-gray-400">
                              {newsForm.gallery.length}/8
                            </span>
                          </div>
                          
                          {/* Grille des photos de la galerie */}
                          <div className="grid grid-cols-2 gap-2 mb-3">
                            {newsForm.gallery.map((url, index) => (
                              <div key={index} className="relative aspect-square">
                                <Image
                                  src={url}
                                  alt={`Galerie ${index + 1}`}
                                  fill
                                  className="object-cover rounded-lg"
                                />
                                <Button
                                  size="sm"
                                  isIconOnly
                                  variant="flat"
                                  className="absolute top-1 right-1 bg-white/90 min-w-6 w-6 h-6"
                                  onPress={() => removeGalleryPhoto(index)}
                                >
                                  <X className="w-3 h-3" />
                                </Button>
                              </div>
                            ))}
                          </div>

                          {/* Bouton ajouter si moins de 8 photos */}
                          {newsForm.gallery.length < 8 && (
                            <div
                              className="border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-edf-blue/50 transition-colors cursor-pointer"
                              onClick={() => galleryInputRef.current?.click()}
                            >
                              <div className="flex flex-col items-center justify-center py-2">
                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                                  <Plus className="w-5 h-5 text-gray-400" />
                                </div>
                                <p className="text-sm font-medium text-gray-700">Ajouter des photos</p>
                                <p className="text-xs text-gray-400 mt-1">
                                  {8 - newsForm.gallery.length} emplacement{newsForm.gallery.length < 7 ? "s" : ""} disponible{newsForm.gallery.length < 7 ? "s" : ""}
                                </p>
                              </div>
                            </div>
                          )}
                          
                          <input
                            ref={galleryInputRef}
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/gif"
                            multiple
                            onChange={handleGalleryFileSelect}
                            className="hidden"
                          />
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

                        {/* Partage LinkedIn */}
                        <div className="border border-[#0A66C2]/20 rounded-xl overflow-hidden">
                          <div 
                            className={`p-4 cursor-pointer transition-colors ${
                              linkedInShare.enabled ? "bg-[#0A66C2]/10" : "bg-gray-50 hover:bg-gray-100"
                            }`}
                            onClick={() => setLinkedInShare({ ...linkedInShare, enabled: !linkedInShare.enabled })}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                  linkedInShare.enabled ? "bg-[#0A66C2]" : "bg-gray-200"
                                }`}>
                                  <Linkedin className={`w-4 h-4 ${linkedInShare.enabled ? "text-white" : "text-gray-500"}`} />
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900">Partager sur LinkedIn</p>
                                  <p className="text-xs text-gray-500">Ouvre une fenêtre pré-remplie</p>
                                </div>
                              </div>
                              <div 
                                className={`w-12 h-7 rounded-full transition-colors flex items-center px-1 ${
                                  linkedInShare.enabled ? "bg-[#0A66C2]" : "bg-gray-300"
                                }`}
                              >
                                <div 
                                  className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                                    linkedInShare.enabled ? "translate-x-5" : "translate-x-0"
                                  }`}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Options LinkedIn (visible si activé) */}
                          {linkedInShare.enabled && (
                            <div className="p-4 border-t border-[#0A66C2]/20 space-y-4">
                              {/* Texte personnalisé */}
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                                  Texte du post (optionnel)
                                </label>
                                <textarea
                                  placeholder="Par défaut : le contenu de l'actualité sera utilisé"
                                  value={linkedInShare.customText}
                                  onChange={(e) => setLinkedInShare({ ...linkedInShare, customText: e.target.value })}
                                  rows={3}
                                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0A66C2]/30 focus:border-[#0A66C2] resize-none"
                                />
                              </div>

                              {/* Hashtags */}
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                                  Hashtags
                                </label>
                                
                                {/* Liste des hashtags */}
                                <div className="flex flex-wrap gap-1.5 mb-2">
                                  {linkedInShare.hashtags.map((tag) => (
                                    <span
                                      key={tag}
                                      className="inline-flex items-center gap-1 px-2 py-1 bg-[#0A66C2]/10 text-[#0A66C2] text-xs rounded-full"
                                    >
                                      <Hash className="w-3 h-3" />
                                      {tag}
                                      <button
                                        type="button"
                                        onClick={() => removeHashtag(tag)}
                                        className="ml-0.5 hover:text-red-500"
                                      >
                                        <X className="w-3 h-3" />
                                      </button>
                                    </span>
                                  ))}
                                </div>

                                {/* Ajouter un hashtag */}
                                {linkedInShare.hashtags.length < 10 && (
                                  <div className="flex gap-2">
                                    <Input
                                      size="sm"
                                      placeholder="Ajouter un hashtag"
                                      value={linkedInShare.newHashtag}
                                      onChange={(e) => setLinkedInShare({ ...linkedInShare, newHashtag: e.target.value })}
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                          e.preventDefault();
                                          addHashtag();
                                        }
                                      }}
                                      startContent={<Hash className="w-3 h-3 text-gray-400" />}
                                      classNames={{
                                        inputWrapper: "h-8 bg-white border border-gray-200",
                                        input: "text-xs",
                                      }}
                                    />
                                    <Button
                                      size="sm"
                                      variant="flat"
                                      className="h-8 min-w-8 bg-[#0A66C2]/10 text-[#0A66C2]"
                                      isIconOnly
                                      onPress={addHashtag}
                                    >
                                      <Plus className="w-4 h-4" />
                                    </Button>
                                  </div>
                                )}
                              </div>

                              {/* Aperçu */}
                              <div className="p-3 bg-gray-50 rounded-lg max-h-48 overflow-y-auto">
                                <p className="text-xs font-medium text-gray-500 mb-2 flex items-center gap-1">
                                  <Eye className="w-3 h-3" />
                                  Aperçu du post
                                </p>
                                <p className="text-xs text-gray-700 whitespace-pre-wrap">
                                  {linkedInShare.customText || newsForm.content || "Votre texte apparaîtra ici..."}
                                  {linkedInShare.hashtags.length > 0 && (
                                    <>
                                      {"\n\n"}
                                      <span className="text-[#0A66C2]">
                                        {linkedInShare.hashtags.map(h => `#${h}`).join(" ")}
                                      </span>
                                    </>
                                  )}
                                </p>
                              </div>

                              {/* Info */}
                              <p className="text-xs text-gray-400 flex items-center gap-1">
                                <ExternalLink className="w-3 h-3" />
                                Ouvrira LinkedIn après la sauvegarde
                              </p>
                            </div>
                          )}
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
                                    src={getMediaUrl(item.logo_url)}
                                    alt={item.name}
                                    width={40}
                                    height={40}
                                    className="w-full h-full object-contain"
                                  />
                                </div>
                              )}
                              <div>
                                <p className="font-medium text-gray-900">{item.name}</p>
                                {item.color && (
                                  <div 
                                    className="w-3 h-3 rounded-full mt-1" 
                                    style={{ backgroundColor: item.color }}
                                  />
                                )}
                              </div>
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
                    {/* Assistant IA en haut du formulaire */}
                    <div className="mb-6">
                      <button
                        type="button"
                        onClick={() => {
                          setAiMode(!aiMode);
                          setAiPrompt("");
                          setAiError("");
                        }}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                          aiMode
                            ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg"
                            : "bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-700 hover:from-purple-100 hover:to-indigo-100 border border-purple-200"
                        }`}
                      >
                        <Sparkles className="w-4 h-4" />
                        {aiMode ? "Fermer l'assistant IA" : "Rédiger avec l'assistant IA"}
                      </button>
                      
                      {aiMode && (
                        <div className="mt-4 p-5 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-100">
                          <p className="text-sm text-purple-800 mb-3 flex items-center gap-2">
                            <Wand2 className="w-4 h-4" />
                            Décrivez le partenariat, l&apos;IA génère <strong>titre + description</strong>
                          </p>
                          <textarea
                            placeholder="Ex: Partenariat avec la miellerie de Macouria pour installer des ruches sur le site et favoriser la biodiversité locale..."
                            value={aiPrompt}
                            onChange={(e) => setAiPrompt(e.target.value)}
                            rows={3}
                            className="w-full px-4 py-3 bg-white border border-purple-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-300 resize-none"
                          />
                          {aiError && (
                            <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {aiError}
                            </p>
                          )}
                          <div className="flex justify-end gap-2 mt-3">
                            <Button
                              size="sm"
                              variant="flat"
                              onPress={() => {
                                setAiMode(false);
                                setAiPrompt("");
                                setAiError("");
                              }}
                            >
                              Annuler
                            </Button>
                            <Button
                              size="sm"
                              className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white"
                              startContent={aiGenerating ? null : <Sparkles className="w-4 h-4" />}
                              isLoading={aiGenerating}
                              onPress={() => generateWithAI("partnership")}
                            >
                              {aiGenerating ? "Génération..." : "Générer tout"}
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Colonne principale - Formulaire simplifié */}
                      <div className="lg:col-span-2 space-y-6">
                        {/* Titre du partenariat - max 80 caractères (2 lignes) */}
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Titre du partenariat <span className="text-red-500">*</span>
                            </label>
                            <span className={`text-xs ${partnershipForm.name.length > 80 ? 'text-red-500 font-medium' : 'text-gray-400'}`}>
                              {partnershipForm.name.length}/80
                            </span>
                          </div>
                          <Input
                            placeholder="Ex: Électrification du village Palikour"
                            value={partnershipForm.name}
                            onChange={(e) => {
                              if (e.target.value.length <= 80) {
                                setPartnershipForm({ ...partnershipForm, name: e.target.value });
                              }
                            }}
                            size="lg"
                            classNames={{
                              inputWrapper: `bg-gray-50 border ${partnershipForm.name.length > 70 ? 'border-orange-300' : 'border-gray-200'}`,
                            }}
                          />
                          {partnershipForm.name.length > 70 && (
                            <p className="text-xs text-orange-500 mt-1">Approche de la limite</p>
                          )}
                        </div>
                        
                        {/* Description - max 280 caractères (5 lignes) */}
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Description
                            </label>
                            <span className={`text-xs ${partnershipForm.description.length > 280 ? 'text-red-500 font-medium' : 'text-gray-400'}`}>
                              {partnershipForm.description.length}/280
                            </span>
                          </div>
                          <textarea
                            placeholder="Décrivez le partenariat et son impact..."
                            value={partnershipForm.description}
                            onChange={(e) => {
                              if (e.target.value.length <= 280) {
                                setPartnershipForm({ ...partnershipForm, description: e.target.value });
                              }
                            }}
                            rows={5}
                            className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-edf-blue/20 focus:border-edf-blue resize-none ${
                              partnershipForm.description.length > 250 ? 'border-orange-300' : 'border-gray-200'
                            }`}
                          />
                          {partnershipForm.description.length > 250 && (
                            <p className="text-xs text-orange-500 mt-1">Approche de la limite ({280 - partnershipForm.description.length} caractères restants)</p>
                          )}
                        </div>

                        {/* Couleur de l'étiquette - Palette EDF */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">
                            Couleur de l&apos;étiquette
                          </label>
                          
                          {/* Palette de couleurs EDF */}
                          <div className="space-y-3">
                            {/* Orange */}
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500 w-16">Orange</span>
                              <div className="flex gap-2">
                                {[
                                  { hex: "#FE5716", name: "Foncé" },
                                  { hex: "#FF861D", name: "Moyen" },
                                  { hex: "#FFB210", name: "Clair" },
                                ].map((color) => (
                                  <button
                                    key={color.hex}
                                    type="button"
                                    onClick={() => setPartnershipForm({ ...partnershipForm, color: color.hex })}
                                    className={`w-10 h-10 rounded-lg transition-all ${
                                      partnershipForm.color === color.hex 
                                        ? "ring-2 ring-offset-2 ring-gray-900 scale-110" 
                                        : "hover:scale-105"
                                    }`}
                                    style={{ backgroundColor: color.hex }}
                                    title={color.name}
                                  />
                                ))}
                              </div>
                            </div>
                            
                            {/* Bleu */}
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500 w-16">Bleu</span>
                              <div className="flex gap-2">
                                {[
                                  { hex: "#001A70", name: "Foncé" },
                                  { hex: "#1057C8", name: "Moyen" },
                                  { hex: "#1089FF", name: "Clair" },
                                ].map((color) => (
                                  <button
                                    key={color.hex}
                                    type="button"
                                    onClick={() => setPartnershipForm({ ...partnershipForm, color: color.hex })}
                                    className={`w-10 h-10 rounded-lg transition-all ${
                                      partnershipForm.color === color.hex 
                                        ? "ring-2 ring-offset-2 ring-gray-900 scale-110" 
                                        : "hover:scale-105"
                                    }`}
                                    style={{ backgroundColor: color.hex }}
                                    title={color.name}
                                  />
                                ))}
                              </div>
                            </div>
                            
                            {/* Vert */}
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500 w-16">Vert</span>
                              <div className="flex gap-2">
                                {[
                                  { hex: "#4F9E30", name: "Foncé" },
                                  { hex: "#88D910", name: "Moyen" },
                                  { hex: "#C0E410", name: "Clair" },
                                ].map((color) => (
                                  <button
                                    key={color.hex}
                                    type="button"
                                    onClick={() => setPartnershipForm({ ...partnershipForm, color: color.hex })}
                                    className={`w-10 h-10 rounded-lg transition-all ${
                                      partnershipForm.color === color.hex 
                                        ? "ring-2 ring-offset-2 ring-gray-900 scale-110" 
                                        : "hover:scale-105"
                                    }`}
                                    style={{ backgroundColor: color.hex }}
                                    title={color.name}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Aperçu de l'étiquette */}
                          <div className="mt-4 flex items-center gap-3">
                            <span className="text-xs text-gray-500">Aperçu :</span>
                            <span
                              className="px-3 py-1.5 text-xs font-medium text-white"
                              style={{ backgroundColor: partnershipForm.color }}
                            >
                              PARTENARIAT LOCAL
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Colonne latérale */}
                      <div className="space-y-6">
                        {/* Upload photo */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Photo du partenariat
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
