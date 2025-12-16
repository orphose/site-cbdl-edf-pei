"use client";

import { motion } from "framer-motion";
import { Card, CardBody, CardFooter, Button } from "@nextui-org/react";
import { Calendar, ArrowRight } from "lucide-react";

/**
 * Données des actualités (placeholder)
 */
const NEWS_ITEMS = [
  {
    id: 1,
    title: "Avancement des travaux de génie civil",
    excerpt:
      "Les travaux de fondations profondes progressent conformément au calendrier prévu...",
    date: "15 Décembre 2024",
    category: "Chantier",
    image: "/images/news-1.jpg",
  },
  {
    id: 2,
    title: "Partenariat renforcé avec les entreprises locales",
    excerpt:
      "EDF PEI continue de privilégier les entreprises guyanaises pour la construction...",
    date: "10 Décembre 2024",
    category: "Partenariats",
    image: "/images/news-2.jpg",
  },
  {
    id: 3,
    title: "Visite du site par les élus locaux",
    excerpt:
      "Une délégation d'élus locaux a visité le chantier de la future centrale...",
    date: "5 Décembre 2024",
    category: "Événements",
    image: "/images/news-3.jpg",
  },
];

/**
 * Section Actualités - Section 8
 * Nos dernières actualités
 */
export default function NewsSection() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="container-custom relative z-10">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12"
        >
          <div>
            <span className="inline-block px-4 py-2 bg-edf-blue/10 text-edf-blue text-sm font-medium mb-4">
              Actualités
            </span>
            <h2 className="heading-lg text-black uppercase max-w-[65%]">
              Nos dernières <span className="text-edf-orange">actualités</span>
            </h2>
          </div>
          <Button
            className="bg-edf-blue text-white font-medium hover:bg-edf-blue-light transition-all"
            radius="none"
            endContent={<ArrowRight className="w-4 h-4" />}
          >
            Toutes les actualités
          </Button>
        </motion.div>

        {/* Grille d'actualités */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {NEWS_ITEMS.map((news, index) => (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full card-hover bg-white border border-gray-100 shadow-sm">
                {/* Image placeholder */}
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-gray-400 text-sm">
                      📷 Image actualité
                    </p>
                  </div>
                  {/* Badge catégorie */}
                  <span className="absolute top-4 left-4 px-3 py-1 bg-edf-blue text-white text-xs font-medium">
                    {news.category}
                  </span>
                </div>

                <CardBody className="p-6">
                  {/* Date */}
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{news.date}</span>
                  </div>

                  {/* Titre */}
                  <h3 className="text-lg font-bold text-black mb-3 line-clamp-2">
                    {news.title}
                  </h3>

                  {/* Extrait */}
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {news.excerpt}
                  </p>
                </CardBody>

                <CardFooter className="px-6 pb-6 pt-0">
                  <Button
                    variant="light"
                    className="text-edf-orange font-medium p-0 h-auto hover:text-edf-orange-light"
                    endContent={<ArrowRight className="w-4 h-4" />}
                  >
                    Lire la suite
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

