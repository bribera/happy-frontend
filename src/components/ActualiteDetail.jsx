'use client'
import React from 'react';
import { Calendar, User, ArrowLeft, Home } from 'lucide-react';

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

const ActualiteDetail = () => {

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-4 mb-8">
          <Link 
            to="/articles"
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Articles
          </Link>
          <Link 
            to="/"
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2"
          >
            <Home size={16} />
            Accueil
          </Link>
        </div>

        {/* Article Content */}
        <article className="bg-white rounded-xl shadow-lg overflow-hidden">
          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-64 md:h-80 object-cover"
          />
          
          <div className="p-8">
            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <User size={14} />
                <span className="font-medium">{article.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>{article.date}</span>
              </div>
              <span className="bg-gray-100 px-2 py-1 rounded">
                {article.views} vues
              </span>
              <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded font-medium">
                {article.readTime}
              </span>
              <span className={`px-2 py-1 rounded text-white text-xs ${
                article.type === 'video' ? 'bg-red-500' : 'bg-blue-500'
              }`}>
                {article.type === 'video' ? 'Vidéo' : 'Article'}
              </span>
            </div>
            
            {/* Article Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">
              {article.title}
            </h1>
            
            {/* Article Content */}
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="text-xl text-gray-600 mb-6 font-medium leading-relaxed">
                {article.excerpt}
              </p>
              <div className="text-base leading-relaxed space-y-4">
                {article.content.split('. ').map((sentence, index) => (
                  <p key={index} className="mb-4">
                    {sentence}{sentence.endsWith('.') ? '' : '.'}
                  </p>
                ))}
              </div>
            </div>

            {/* Article Footer */}
            <div className="border-t pt-8 mt-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {article.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{article.author}</p>
                    <p className="text-sm text-gray-500">Publié le {article.date}</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Link 
                    to="/articles"
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition-all duration-300"
                  >
                    Autres articles
                  </Link>
                  <Link 
                    to="/"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                  >
                    Retour à l'accueil
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles could be added here */}
      </div>
    </div>
  );
};

export default ActualiteDetail