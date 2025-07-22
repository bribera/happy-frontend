'use client'
import ArticleCard from '@/components/ArticleCard'
import React, { useEffect, useState } from 'react'
import { Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import Image from 'next/image';
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import ButtonAction from '@/components/ButtonAction';
import { ArrowBigDown, ArrowDown, Loader2 } from 'lucide-react';
import { api } from '../lib/api';


const images =[
    '/anglais.jpg',
    '/contact.jpg',
    '/video.jpg',
]

const ZoomProperties = {
  scale:1,
  duration:5000,
  transitionDuration:300,
  infinity:true,


  prevArrow:(
    <div className="bg-orange rounded-full ml-10 top-40 md:top-72">
      <GrFormPrevious  className='h-8 w-8 text-white cursor-pointer'/>
    </div>
  ),
  nextArrow:(
    <div className="mr-10 bg-orange rounded-full top-40 md:top-72">
      <MdOutlineNavigateNext  className='h-8 w-8 text-white cursor-pointer'/>
    </div>
  )
}

const page = () => {

   const [articles, setArticles] = useState([])
    const [isArticleLoading, setIsArticleLoading] = useState(true)
    
      useEffect(() => {
        const fetchArticles = async () => {
          setIsArticleLoading(true)
          try {        
            // const slug = params.slug
            const response = await api(`/articles?populate=*`);
            if (response && response.data) {
              setArticles(response.data)
            }
          } catch (error) {
            console.log(error)
          }finally{
            setIsArticleLoading(false)
          }
        }
  
        //  if (params.slug) {
        // }
        fetchArticles()
    
      },[])

  return (
     <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="px-20 h-[80vh] mt-30">
        <Zoom {...ZoomProperties} >
          {
            images.map((each, index) => (
              <div className="flex justify-center md:items-center items-start  min-h-full relative " key={index}>
                <img alt='image-articles' src={each} className='h-[70vh] w-[77vw] rounded-lg'/>
                <div className="bg-black/60 inset-0 absolute"></div>
                <div className="absolute top-0 text-white  font-semibold flex flex-col gap-y-5 items-center justify-center w-full h-full">
                  <p className="text-[47px] text-center">Retrouvez <br /> ici toutes  nos actualités</p>
                  <div className="flex flex-col items-center space-y-2">
                  <div className="flex space-x-2">
                    <ArrowDown 
                      size={48} 
                      className="text-blue-500 animate-bounce" 
                      style={{ animationDelay: '0s', animationDuration: '2s' }}
                    />
                    <ArrowDown 
                      size={58} 
                      className="text-blue-500 animate-bounce" 
                      style={{ animationDelay: '0.3s', animationDuration: '2s' }}
                    />
                  </div>
                  <ArrowBigDown 
                    size={58} 
                    className="text-blue-500 animate-pulse" 
                    style={{ animationDuration: '1.5s' }}
                  />
                  </div>
                </div>
              </div>
            ))
          }
        </Zoom>
      </div>
      <div className="max-w-6xl mx-auto px-6 pt-2">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Tous les <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Articles</span>
            </h2>
            <p className="text-gray-600">
              Explorez notre collection complète d'articles et actualités
            </p>
          </div>
          <button 
            onClick={() => setCurrentView('home')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg transition-all duration-300 flex items-center gap-2"
          >
            ← Retour à l'accueil
          </button>
        </div>

         {
          isArticleLoading ? (
          <div className="h-fit pt-10 flex items-center justify-center bg-gray-50">
            <div className="text-center text-lg font-semibold">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600">Chargement des articles..</p>
            </div>
          </div>
          ):(

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map(article => (
              <ArticleCard 
                key={article.id} 
                article={article} 
              />
            ))}
          </div>
          )
         } 
      </div>
    </div>
  )
}

export default page