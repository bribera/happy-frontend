'use client'
import React from 'react';
import { Calendar, User, ArrowRight, Play, Eye } from 'lucide-react';
import Link from 'next/link';
import { getStrapiMedia } from '@/app/lib/api';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import Image from 'next/image';


const ArticleCard = ({article}) => (  
  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
    <div className="relative">
      <Image 
        src={getStrapiMedia(article.cover.url)} 
        alt={article.title}
        className="w-full h-48 object-cover"
        width={200}
        height={200}
        priority
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
      <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
        {article.title}
      </h3>

      <BlocksRenderer
        content={article?.desc}
        blocks={{                            
            paragraph: ({ children }) => {
            return (
                <p className=" text-gray-600 mb-4 line-clamp-3">
                {children}
                </p>
            );
            },
        }}
      />
      
      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <User size={14} />
            {article.author.name}
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            {article.date}
          </div>
        </div>
        <span className="text-blue-600 font-medium">{article.readTime}</span>
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">{article.views} vues</span>
        <Link 
          href={`/actualites/${article.slug}`}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center gap-2"
        >
          Lire plus <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  </div>
);
  
  

export default ArticleCard