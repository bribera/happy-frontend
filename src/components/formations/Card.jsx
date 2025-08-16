'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { api } from '@/app/lib/api'
import ReactCountryFlag from "react-country-flag";


const Card = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeLevel, setActiveLevel] = useState('all')
  const [activeFormat, setActiveFormat] = useState('all')
  const [courses, setCourses] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fonction pour récupérer les données depuis Strapi
  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Récupération des cours avec les relations (catégories, niveaux, etc.)
      const coursesData = await api('/cours-formations?populate=*')
      const categoriesData = await api('/categories')

    //  const coursesData =  Array.isArray(response.data)

      console.log('Données courses reçues:', coursesData)
      console.log('Données categories reçues:', categoriesData)

      // Helper function pour récupérer les propriétés avec fallback
    const getProperty = (obj, ...keys) => {
      for (const key of keys) {
        if (obj && obj[key] !== undefined && obj[key] !== null) {
          return obj[key];
        }
      }
      return null;
    };

      // Transformation des données Strapi pour correspondre à votre structure
    const transformedCourses = coursesData.data?.map(course => ({
      id: course.id,
      title: getProperty(course, 'titre', 'title') || 'Titre non disponible', // Utiliser 'title' pas 'titre'
      subtitle: getProperty(course, 'subtitle') || 'Sous-titre non disponible',
      duration: getProperty(course, 'duree', 'duration', 'durée') || 'Durée non spécifiée',
      level: getProperty(course, 'niveau', 'level') || 'Niveau non spécifié',
      format: getProperty(course, 'format', 'forme') || 'Format non spécifié',
      category: course.category?.slug || getProperty(course, 'category') || 'general',
      sessions: getProperty(course, 'sessions', 'seances') || [],
      price: getProperty(course, 'prix', 'price', 'tarif') || 'Prix sur demande',
      image: (() => {
        const imageObj = getProperty(course, 'image', 'icone', 'icon');
        // Si c'est un objet Strapi image, extraire l'URL ou utiliser un emoji par défaut
        if (imageObj && typeof imageObj === 'object' && imageObj.url) {
          return imageObj.url;
        }
        // Si c'est déjà une string (emoji ou URL), la retourner
        if (typeof imageObj === 'string') {
          return imageObj;
        }
        // Fallback emoji
        return '📚';
      })(),
      link: getProperty(course, 'lien', 'link', 'url') || `/cours/${course.slug || course.id}`,
      color: getProperty(course, 'couleur', 'color', 'classe_couleur') || 'from-blue-500 to-indigo-600',
      icon: getProperty(course, "icon")
    })) || []

    // Transformation des catégories
    const transformedCategories = [
      { id: 'all', name: 'Tous les cours', icon: '📚' },
      ...(categoriesData.data?.map(category => ({
        id: category.attributes?.slug || category.slug || category.id,
        name: category.attributes?.name || category.name || 'Catégorie sans nom',
        icon: category.attributes?.icon || category.icon || '📚'
      })) || [])
    ]

      setCourses(transformedCourses)
      setCategories(transformedCategories)
      console.log('cours transformated',transformedCourses)
      
    } catch (err) {
      setError(err.message)
      console.error('Erreur lors du chargement des données:', err)
    } finally {
      setLoading(false)
    }
  }

  // Chargement des données au montage du composant
  useEffect(() => {
    fetchData()
  }, [])

  

  const levels = [
    { id: 'all', name: 'Tous niveaux' },
    { id: 'Débutant', name: 'Débutant' },
    { id: 'Intermédiaire', name: 'Intermédiaire' },
    { id: 'Avancé', name: 'Avancé' }
  ]

  const formats = [
    { id: 'all', name: 'Tous formats' },
    { id: 'En ligne', name: 'En ligne' },
    { id: 'Présentiel', name: 'Présentiel' },
    { id: 'Hybride', name: 'Hybride' }
  ]

  const filteredCourses = courses.filter(course => {
    return (activeCategory === 'all' || course.category === activeCategory) &&
           (activeLevel === 'all' || course.level === activeLevel) &&
           (activeFormat === 'all' || course.format === activeFormat)
  })

  const getLevelColor = (level) => {
    switch (level) {
      case 'Débutant':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'Intermédiaire':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Avancé':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getFormatColor = (format) => {
    switch (format) {
      case 'En ligne':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Présentiel':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'Hybride':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  // Affichage du loading
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des cours...</p>
        </div>
      </div>
    )
  }


   // Affichage de l'erreur
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">❌</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Erreur de chargement</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchData}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    )
  }


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* En-tête responsive */}
        <div className="mb-8 lg:mb-12 text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 lg:mb-6">
            Cours de Langues & Formations Professionnelles
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Développez vos compétences linguistiques et professionnelles avec nos cours d'anglais, japonais, espagnol 
            et nos formations spécialisées en gestion de projet, secrétariat informatique et comptabilité.
          </p>
        </div>

        {/* Filtres responsive */}
        <div className="mb-6 lg:mb-8 space-y-4 lg:space-y-6">
          {/* Filtres par catégorie */}
          <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm">
            <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-3 lg:mb-4">Catégories</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-2 lg:gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full px-3 lg:px-4 py-2 lg:py-3 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 border ${
                    activeCategory === category.id
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md transform scale-105'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-1 lg:space-x-2">
                    <span className="text-sm lg:text-base">{category.icon}</span>
                    <span className="truncate">{category.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Filtres par niveau et format */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm">
              <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-3">Niveau</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-2">
                {levels.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => setActiveLevel(level.id)}
                    className={`px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 border ${
                      activeLevel === level.id
                        ? 'bg-green-600 text-white border-green-600 shadow-md'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {level.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm">
              <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-3">Format</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-2">
                {formats.map((format) => (
                  <button
                    key={format.id}
                    onClick={() => setActiveFormat(format.id)}
                    className={`px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 border ${
                      activeFormat === format.id
                        ? 'bg-purple-600 text-white border-purple-600 shadow-md'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {format.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Compteur de résultats et bouton reset */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm lg:text-base text-gray-600">
            <span className="font-semibold text-gray-900">{filteredCourses.length}</span> 
            {filteredCourses.length > 1 ? ' cours trouvés' : ' cours trouvé'}
          </p>
          
          {(activeCategory !== 'all' || activeLevel !== 'all' || activeFormat !== 'all') && (
            <button
              onClick={() => {
                setActiveCategory('all')
                setActiveLevel('all')
                setActiveFormat('all')
              }}
              className="self-start sm:self-auto px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm"
            >
              Réinitialiser les filtres
            </button>
          )}
        </div>

        {/* Grille des cours responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {filteredCourses.map((course) => (
            <Link 
              key={course.id} 
              href={course.link}
              className="group block transform transition-all duration-300 hover:scale-105"
            >
              <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 h-full flex flex-col">
                {/* Header avec gradient */}
                <div className={`bg-gradient-to-r ${course.color} p-4 lg:p-6 text-white relative`}>
                  <div className="absolute top-3 lg:top-4 right-3 lg:right-4 text-2xl lg:text-3xl opacity-80">
                   <ReactCountryFlag countryCode={course.icon} svg />
                  </div>
                  <h3 className="text-lg lg:text-xl font-bold mb-2 lg:mb-3 pr-10 lg:pr-12 leading-tight">
                    {course.title}
                  </h3>
                  <div className="flex flex-wrap gap-1 lg:gap-2">
                    <span className="bg-white/20 px-2 py-1 rounded-full text-xs font-medium">
                      {course.duration}
                    </span>
                    <span className="bg-white/20 px-2 py-1 rounded-full text-xs font-medium">
                      {course.sessions.length > 0
                        ? `${course.sessions.length} session${course.sessions.length > 1 ? 's' : ''}`
                        : 'Détails à venir'
                      }
                    </span>
                  </div>
                </div>
                
                {/* Contenu */}
                <div className="p-4 lg:p-6 flex-grow flex flex-col">
                  <p className="text-sm lg:text-base text-gray-600 mb-4 leading-relaxed flex-grow">
                    {course.subtitle}
                  </p>
                  
                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getLevelColor(course.level)}`}>
                      {course.level}
                    </span>
                    <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getFormatColor(course.format)}`}>
                      {course.format}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xl lg:text-2xl font-bold text-gray-900">
                      {course.price} F CFA
                    </div>
                    
                    <div className="flex items-center text-blue-600 group-hover:text-blue-700 font-medium">
                      <span className="text-xs lg:text-sm">S'inscrire</span>
                      <svg className="w-3 h-3 lg:w-4 lg:h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Barre de progression (décorative) */}
                <div className="h-1 bg-gray-100">
                  <div className={`h-full bg-gradient-to-r ${course.color} w-0 group-hover:w-full transition-all duration-700 ease-out`}></div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Message si aucun résultat */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12 lg:py-16">
            <div className="text-4xl lg:text-6xl mb-4">🔍</div>
            <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">Aucun cours trouvé</h3>
            <p className="text-sm lg:text-base text-gray-600 mb-4">Essayez de modifier vos critères de recherche</p>
            <button
              onClick={() => {
                setActiveCategory('all')
                setActiveLevel('all')
                setActiveFormat('all')
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm lg:text-base"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Card