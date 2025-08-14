'use client'
import React, { useState } from 'react';
import { Calendar, User, ArrowRight, Play, Eye } from 'lucide-react';
import ArticleCard from './ArticleCard';
import Link from 'next/link';


const Actualité = ({articles}) => {

  // const [currentView, setCurrentView] = useState('home');
  // const [selectedArticle, setSelectedArticle] = useState(null);

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
