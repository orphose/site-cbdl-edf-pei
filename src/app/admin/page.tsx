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
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { News, Partnership } from "@/lib/database.types";
import { IMAGES } from "@/lib/media";
import Image from "next/image";

// Mot de passe admin (en production, utiliser Supabase Auth)
const ADMIN_PASSWORD = "cbdl2024admin";

/**
 * Page d'administration du CMS
 * Gestion des actualités et partenariats
 */
export default function AdminPage() {
  // États d'authentification
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  // États des données
  const [news, setNews] = useState<News[]>([]);
  const [partnerships, setPartnerships] = useState<Partnership[]>([]);
  const [loading, setLoading] = useState(true);

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

  // Vérification authentification au montage
  useEffect(() => {
    const savedAuth = sessionStorage.getItem("cbdl_admin_auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Chargement des données
  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  // Fonction de connexion
  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("cbdl_admin_auth", "true");
      setAuthError("");
    } else {
      setAuthError("Mot de passe incorrect");
    }
  };

  // Fonction de déconnexion
  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("cbdl_admin_auth");
  };

  // Chargement des données
  const loadData = async () => {
    setLoading(true);
    try {
      // Charger les actualités (toutes, pas seulement publiées)
      const { data: newsData } = await supabase
        .from("news")
        .select("*")
        .order("created_at", { ascending: false });

      // Charger les partenariats (tous)
      const { data: partnershipsData } = await supabase
        .from("partnerships")
        .select("*")
        .order("display_order", { ascending: true });

      setNews(newsData || []);
      setPartnerships(partnershipsData || []);
    } catch (error) {
      console.error("Erreur chargement données:", error);
    } finally {
      setLoading(false);
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
      const data = {
        ...newsForm,
        slug: newsForm.slug || generateSlug(newsForm.title),
        published_at: newsForm.is_published ? new Date().toISOString() : null,
      };

      if (editingNews) {
        await supabase.from("news").update(data).eq("id", editingNews.id);
      } else {
        await supabase.from("news").insert(data);
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
      const data = {
        ...partnershipForm,
        slug: partnershipForm.slug || generateSlug(partnershipForm.name),
      };

      if (editingPartnership) {
        await supabase.from("partnerships").update(data).eq("id", editingPartnership.id);
      } else {
        await supabase.from("partnerships").insert(data);
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

  // Page de connexion
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-edf-blue to-edf-blue-dark p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full max-w-md">
            <CardHeader className="flex flex-col items-center pt-8 pb-0">
              <Image
                src={IMAGES.logo.couleurs}
                alt="CBDL Logo"
                width={150}
                height={60}
                className="mb-4"
              />
              <h1 className="text-xl font-bold text-gray-800">Administration</h1>
              <p className="text-gray-500 text-sm">Centrale Bioénergie du Larivot</p>
            </CardHeader>
            <CardBody className="px-8 py-6">
              <div className="space-y-4">
                <Input
                  type="password"
                  label="Mot de passe"
                  placeholder="Entrez le mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  startContent={<Lock className="w-4 h-4 text-gray-400" />}
                  isInvalid={!!authError}
                  errorMessage={authError}
                />
                <Button
                  color="primary"
                  className="w-full bg-edf-blue"
                  onPress={handleLogin}
                >
                  Se connecter
                </Button>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Interface admin
  return (
    <div className="min-h-screen">
      {/* Header admin */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src={IMAGES.logo.couleurs}
              alt="CBDL Logo"
              width={120}
              height={48}
            />
            <div>
              <h1 className="text-lg font-bold text-gray-800">Administration</h1>
              <p className="text-xs text-gray-500">Gestion du contenu</p>
            </div>
          </div>
          <Button
            variant="light"
            color="danger"
            startContent={<LogOut className="w-4 h-4" />}
            onPress={handleLogout}
          >
            Déconnexion
          </Button>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Tabs aria-label="Sections admin" color="primary" variant="bordered">
          {/* Onglet Actualités */}
          <Tab
            key="news"
            title={
              <div className="flex items-center gap-2">
                <Newspaper className="w-4 h-4" />
                <span>Actualités ({news.length})</span>
              </div>
            }
          >
            <Card className="mt-4">
              <CardHeader className="flex justify-between items-center">
                <h2 className="text-lg font-bold">Gestion des actualités</h2>
                <Button
                  color="primary"
                  startContent={<Plus className="w-4 h-4" />}
                  onPress={openCreateNews}
                >
                  Nouvelle actualité
                </Button>
              </CardHeader>
              <CardBody>
                <Table aria-label="Liste des actualités">
                  <TableHeader>
                    <TableColumn>TITRE</TableColumn>
                    <TableColumn>STATUT</TableColumn>
                    <TableColumn>DATE</TableColumn>
                    <TableColumn>ACTIONS</TableColumn>
                  </TableHeader>
                  <TableBody emptyContent="Aucune actualité">
                    {news.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div className="max-w-xs truncate font-medium">
                            {item.title}
                          </div>
                        </TableCell>
                        <TableCell>
                          {item.is_published ? (
                            <span className="inline-flex items-center gap-1 text-green-600 text-sm">
                              <Eye className="w-3 h-3" /> Publié
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-gray-400 text-sm">
                              <EyeOff className="w-3 h-3" /> Brouillon
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-sm text-gray-500">
                          {new Date(item.created_at).toLocaleDateString("fr-FR")}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="light"
                              isIconOnly
                              onPress={() => openEditNews(item)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="light"
                              color="danger"
                              isIconOnly
                              onPress={() => confirmDelete("news", item.id)}
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
                <span>Partenariats ({partnerships.length})</span>
              </div>
            }
          >
            <Card className="mt-4">
              <CardHeader className="flex justify-between items-center">
                <h2 className="text-lg font-bold">Gestion des partenariats</h2>
                <Button
                  color="primary"
                  startContent={<Plus className="w-4 h-4" />}
                  onPress={openCreatePartnership}
                >
                  Nouveau partenaire
                </Button>
              </CardHeader>
              <CardBody>
                <Table aria-label="Liste des partenariats">
                  <TableHeader>
                    <TableColumn>NOM</TableColumn>
                    <TableColumn>CATÉGORIE</TableColumn>
                    <TableColumn>STATUT</TableColumn>
                    <TableColumn>ACTIONS</TableColumn>
                  </TableHeader>
                  <TableBody emptyContent="Aucun partenariat">
                    {partnerships.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div className="font-medium">{item.name}</div>
                        </TableCell>
                        <TableCell className="text-sm text-gray-500">
                          {item.category || "-"}
                        </TableCell>
                        <TableCell>
                          {item.is_active ? (
                            <span className="text-green-600 text-sm">Actif</span>
                          ) : (
                            <span className="text-gray-400 text-sm">Inactif</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="light"
                              isIconOnly
                              onPress={() => openEditPartnership(item)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="light"
                              color="danger"
                              isIconOnly
                              onPress={() => confirmDelete("partnership", item.id)}
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
      </main>

      {/* Modal Actualité */}
      <Modal isOpen={newsModal.isOpen} onClose={newsModal.onClose} size="3xl">
        <ModalContent>
          <ModalHeader>
            {editingNews ? "Modifier l'actualité" : "Nouvelle actualité"}
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
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
              />
              <Input
                label="Slug (URL)"
                placeholder="titre-de-lactualite"
                value={newsForm.slug}
                onChange={(e) => setNewsForm({ ...newsForm, slug: e.target.value })}
              />
              <Textarea
                label="Extrait"
                placeholder="Résumé court de l'actualité"
                value={newsForm.excerpt}
                onChange={(e) => setNewsForm({ ...newsForm, excerpt: e.target.value })}
                minRows={2}
              />
              <Textarea
                label="Contenu"
                placeholder="Contenu complet de l'actualité"
                value={newsForm.content}
                onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
                minRows={6}
              />
              <Input
                label="URL de l'image"
                placeholder="https://..."
                value={newsForm.image_url}
                onChange={(e) => setNewsForm({ ...newsForm, image_url: e.target.value })}
              />
              <Switch
                isSelected={newsForm.is_published}
                onValueChange={(value) => setNewsForm({ ...newsForm, is_published: value })}
              >
                Publier l&apos;actualité
              </Switch>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={newsModal.onClose}>
              Annuler
            </Button>
            <Button color="primary" onPress={saveNews}>
              {editingNews ? "Modifier" : "Créer"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal Partenariat */}
      <Modal isOpen={partnershipModal.isOpen} onClose={partnershipModal.onClose} size="2xl">
        <ModalContent>
          <ModalHeader>
            {editingPartnership ? "Modifier le partenaire" : "Nouveau partenaire"}
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
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
              />
              <Input
                label="Slug (URL)"
                placeholder="nom-du-partenaire"
                value={partnershipForm.slug}
                onChange={(e) => setPartnershipForm({ ...partnershipForm, slug: e.target.value })}
              />
              <Textarea
                label="Description"
                placeholder="Description du partenaire"
                value={partnershipForm.description}
                onChange={(e) => setPartnershipForm({ ...partnershipForm, description: e.target.value })}
                minRows={3}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="URL du logo"
                  placeholder="https://..."
                  value={partnershipForm.logo_url}
                  onChange={(e) => setPartnershipForm({ ...partnershipForm, logo_url: e.target.value })}
                />
                <Input
                  label="Site web"
                  placeholder="https://..."
                  value={partnershipForm.website_url}
                  onChange={(e) => setPartnershipForm({ ...partnershipForm, website_url: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Catégorie"
                  placeholder="institutionnel, technique..."
                  value={partnershipForm.category}
                  onChange={(e) => setPartnershipForm({ ...partnershipForm, category: e.target.value })}
                />
                <Input
                  type="number"
                  label="Ordre d'affichage"
                  value={String(partnershipForm.display_order)}
                  onChange={(e) => setPartnershipForm({ ...partnershipForm, display_order: parseInt(e.target.value) || 0 })}
                />
              </div>
              <Switch
                isSelected={partnershipForm.is_active}
                onValueChange={(value) => setPartnershipForm({ ...partnershipForm, is_active: value })}
              >
                Partenaire actif
              </Switch>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={partnershipModal.onClose}>
              Annuler
            </Button>
            <Button color="primary" onPress={savePartnership}>
              {editingPartnership ? "Modifier" : "Créer"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal Confirmation suppression */}
      <Modal isOpen={deleteModal.isOpen} onClose={deleteModal.onClose}>
        <ModalContent>
          <ModalHeader>Confirmer la suppression</ModalHeader>
          <ModalBody>
            <p>Êtes-vous sûr de vouloir supprimer cet élément ?</p>
            <p className="text-sm text-gray-500">Cette action est irréversible.</p>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={deleteModal.onClose}>
              Annuler
            </Button>
            <Button color="danger" onPress={handleDelete}>
              Supprimer
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

