'use client'
import { ArrowRight, Calendar, Eye, Play, User } from 'lucide-react'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import ButtonAction from './ButtonAction';

const articles = [
  {
    id: 1,
    title: "Formation aux enfants de 05 à 16 ans en anglais",
    excerpt: "Les dernières avancées en intelligence artificielle transforment radicalement notre façon de travailler et de créer.",
    image: "/enfant.jpg",
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
    image: "/video.jpg",
    author: "Pierre Martin",
    date: "27 Juin 2025",
    type: "video",
    views: 890,
    readTime: "4 min"
  }
]

const NewCard = ({ article }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
    <div className="relative">
      <Image 
        src={article.image} 
        alt={article.title}
        width={500}
        height={200}
        className="w-full h-48 object-cover"
      />
      <div className="absolute top-3 right-3">
        {article.type === 'video' ? (
          <div className="bg-red-500 text-white px-2 py-1 rounded-full flex items-center gap-1 text-xs">
            <Play size={12} />
            Vidéo
          </div>
        ) : (
          <div className="bg-blue-500 text-white px-2 py-1 rounded-full flex items-center gap-1 text-xs">
            <Eye size={12} />
            Photo
          </div>
        )}
      </div>
    </div>
    
    <div className="p-6">
      <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 line-clamp-2">
        {article.title}
      </h3>
      
      <p className="text-base md:text-inherit text-gray-600 mb-4 line-clamp-3">
        {article.excerpt}
      </p>
      
      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <User size={14} />
            {article.author}
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            {article.date}
          </div>
        </div>
        <span className="text-blue-600 font-medium">{article.readTime}</span>
      </div>
    </div>
  </div>
);


const DerniereActualite = () => {
  return (
   <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-auto py-12">
      <div className=" mx-auto px-6">
        <div className="text-center lg:text-start mb-6 md:mb-12">
          <h2 className="text-xl md:text-4xl font-bold text-gray-800 mb-4">
            Dernières <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Actualités</span>
          </h2>
          <p className="text-base text-gray-600 max-w-2xl lg:max-w-full mx-auto">
            Découvrez les dernières nouvelles et tendances qui façonnent notre monde
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {articles.slice(0, 2).map(article => (
            <NewCard key={article.id} article={article} isPreview />
          ))}
        </div>

        <div className="text-center">
            <Link href="/actualites">          
                <ButtonAction 
                    onClick={() => setCurrentView('articles')}
                    className=" text-white px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3 mx-auto lg:text-lg font-semibold shadow-lg"
                >
                    Voir plus d'articles <ArrowRight size={20} />
                </ButtonAction>
            </Link>
        </div>
      </div>
    </div>
  )
}

export default DerniereActualite