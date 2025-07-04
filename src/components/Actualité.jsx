'use client'
import React, { useState } from 'react';
import { Calendar, User, ArrowRight, Play, Eye } from 'lucide-react';
import ArticleCard from './ArticleCard';
import Link from 'next/link';

// All articles data - you might want to move this to a separate data file or API
const articles = [
  {
    id: 1,
    title: "Innovation technologique : L'IA révolutionne l'industrie",
    excerpt: "Les dernières avancées en intelligence artificielle transforment radicalement notre façon de travailler et de créer.",
    content: "L'intelligence artificielle connaît une croissance exponentielle dans tous les secteurs d'activité. Des entreprises aux startups, tous adoptent ces nouvelles technologies pour optimiser leurs processus et créer de nouvelles opportunités. Cette révolution technologique promet de redéfinir notre avenir professionnel et personnel. Les experts prévoient une transformation majeure dans les 5 prochaines années, avec des impacts significatifs sur l'emploi, l'éducation et la société en général.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    author: "Marie Dubois",
    date: "28 Juin 2025",
    type: "image",
    views: 1250,
    readTime: "5 min"
  },
  {
    id: 2,
    title: "Développement durable : Nouvelles initiatives écologiques",
    excerpt: "Les entreprises s'engagent massivement dans la transition écologique avec des projets innovants.",
    content: "Face aux défis climatiques actuels, de nombreuses organisations lancent des initiatives ambitieuses pour réduire leur empreinte carbone. Ces projets incluent l'adoption d'énergies renouvelables, la mise en place de circuits courts, et le développement de produits éco-responsables. Cette démarche collective représente un tournant majeur vers un avenir plus durable. Les investissements dans les technologies vertes atteignent des niveaux record, témoignant d'un engagement réel des acteurs économiques.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop",
    author: "Pierre Martin",
    date: "27 Juin 2025",
    type: "video",
    views: 890,
    readTime: "4 min"
  },
  {
    id: 3,
    title: "Économie numérique : Boom du e-commerce",
    excerpt: "Le commerce électronique continue sa croissance avec de nouveaux modèles d'affaires.",
    content: "Le secteur du e-commerce connaît une expansion remarquable, portée par l'évolution des habitudes de consommation et les innovations technologiques. Les plateformes en ligne développent de nouveaux services pour améliorer l'expérience client et optimiser la logistique. Cette dynamique crée de nombreuses opportunités d'emploi et stimule l'innovation dans le secteur du retail.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    author: "Sophie Laurent",
    date: "26 Juin 2025",
    type: "image",
    views: 756,
    readTime: "3 min"
  },
  {
    id: 4,
    title: "Santé connectée : Révolution des objets connectés",
    excerpt: "Les dispositifs de santé connectés transforment le suivi médical et la prévention.",
    content: "L'essor des objets connectés dans le domaine de la santé ouvre de nouvelles perspectives pour le suivi médical personnalisé. Ces technologies permettent une surveillance continue des paramètres vitaux et facilitent la détection précoce de problèmes de santé. Les professionnels de santé peuvent ainsi proposer des soins plus personnalisés et préventifs.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop",
    author: "Dr. Jean Moreau",
    date: "25 Juin 2025",
    type: "video",
    views: 1100,
    readTime: "6 min"
  }
];

const Actualité = ({articles}) => {

  const [currentView, setCurrentView] = useState('home');
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Tous les <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Articles</span>
            </h1>
            <p className="text-gray-600">
              Explorez notre collection complète d'articles et actualités
            </p>
          </div>
          <Link 
            href="/"
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg transition-all duration-300 flex items-center gap-2"
          >
            ← Retour à l'accueil
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        {/* Pagination could be added here */}
        <div className="text-center mt-12">
          <p className="text-gray-500">
            Affichage de {articles.length} articles
          </p>
        </div>
      </div>
    </div>
  );
};


export default Actualité
