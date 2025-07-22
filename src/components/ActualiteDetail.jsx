'use client'
import React, { useEffect, useState } from 'react';
import { Calendar, User, ArrowLeft, Home, Loader2 } from 'lucide-react';
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { api, getStrapiMedia } from '@/app/lib/api';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

const ActualiteDetail = () => {

  const [article, setArticles] = useState([])
  const [isArticleLoading, setIsArticleLoading] = useState(true)
  const params = useParams()
  
    useEffect(() => {
      const fetchArticles = async () => {
        setIsArticleLoading(true)
        try {        
          const slug = params.slug
          const response = await api(`/articles?filters[slug][$eq]=${slug}&populate=*`);
          if (response && response.data) {
            setArticles(response.data[0])
          }
        } catch (error) {
          console.log(error)
        }finally{
          setIsArticleLoading(false)
        }
      }

       if (params.slug) {
          fetchArticles()
        }
  
    },[params.slug])


  return (
    <div className="">
      {
        isArticleLoading ? (
          <div className="h-fit pt-10 flex items-center justify-center bg-gray-50">
            <div className="text-center text-lg font-semibold">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600">Chargement des articles..</p>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen py-12 mt-30">
            <div className="max-w-4xl mx-auto px-6">
              {/* Navigation Breadcrumb */}
              <div className="flex items-center gap-4 mb-8">
                <Link 
                  href="/articles"
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2"
                >
                  <ArrowLeft size={16} />
                  Articles
                </Link>
                <Link 
                  href="/"
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2"
                >
                  <Home size={16} />
                  Accueil
                </Link>
              </div>

              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <img 
                  src={getStrapiMedia(article.cover.url)} 
                  alt={article.title}
                  className="w-full h-64 md:h-80 object-cover"
                />
                
                <div className="p-8">
                  {/* Article Meta */}
                  <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <User size={14} />
                      <span className="font-medium">{article.author.name}</span>
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
                    <BlocksRenderer
                      content={article?.desc}
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
                    <div className="text-base leading-relaxed space-y-4">
                      {/* {article.content.split('. ').map((sentence, index) => (
                        <p key={index} className="mb-4">
                          {sentence}{sentence.endsWith('.') ? '' : '.'}
                        </p>
                      ))} */}
                      <BlocksRenderer
                        content={article?.content}
                        blocks={{                            
                          paragraph: ({ children }) => {
                          return (
                              <p className="text-base md:text-inherit text-gray-600 mb-4 ">
                                {children}
                              </p>
                          );
                          },
                      }}
                      />
                    </div>
                  </div>

                  {/* Article Footer */}
                  <div className="border-t pt-8 mt-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                          {article.author.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{article.author.name}</p>
                          <p className="text-sm text-gray-500">Publié le {article.date}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <Link 
                          href="/actualites"
                          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition-all duration-300"
                        >
                          Autres articles
                        </Link>
                        <Link 
                          href="/"
                          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                        >
                          Retour à l'accueil
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Related Articles could be added here */}
            </div>
          </div>
        )
      }
    </div>
  );
};

export default ActualiteDetail