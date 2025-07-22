'use client'
import { ArrowRight, Calendar, Eye, Loader2, Play, User } from 'lucide-react'
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import ButtonAction from './ButtonAction';
import { api } from '@/app/lib/api';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { getStrapiMedia } from '@/app/lib/api';


const NewCard = ({ article }) => {
  return (

    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <Image 
          src={getStrapiMedia(article?.cover?.url)} 
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
        
        <BlocksRenderer
          content={article.desc}
          blocks={{                            
              paragraph: ({ children }) => {
              return (
                  <p className="text-base md:text-inherit text-gray-600 mb-4 line-clamp-3">
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
      </div>
    </div>
  )

};



const DerniereActualite = () => {
  const [articles, setArticles] = useState([])
  const [isArticleLoading, setIsArticleLoading] = useState(true)

  useEffect(() => {
    const fetchArticles = async () => {
      setIsArticleLoading(true)
      try {        
        const response = await api("/articles?populate=*");
        if (response && response.data) {
          setArticles(response.data)
        }
      } catch (error) {
        console.log(error)
      }finally{
        setIsArticleLoading(false)
      }
    }

    fetchArticles()
  },[])

  if (isArticleLoading) {
    return (
      <div className="h-fit pt-10 flex items-center justify-center bg-gray-50">
        <div className="text-center text-lg font-semibold">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Chargement des articles..</p>
        </div>
      </div>
    );
  }

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
          {articles.slice(0, 2).map((article,id) => (
            <Link href={`/actualites/${article.slug}/`} key={id} className="cursor-pointer">
              <NewCard key={article.id} article={article} isPreview />
            </Link>
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