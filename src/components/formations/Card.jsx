'use client'
import React, { useState } from 'react'
import Link from 'next/link'

const Card = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeLevel, setActiveLevel] = useState('all')
  const [activeFormat, setActiveFormat] = useState('all')

  const courses = [
    // COURS D'ANGLAIS
    {
      id: 1,
      title: "Cours d'Anglais Débutant",
      description: "Apprenez les bases de l'anglais : grammaire, vocabulaire essentiel et conversation simple.",
      duration: "30 heures",
      level: "Débutant",
      format: "En ligne",
      category: "anglais",
      sessions: "3 fois/semaine",
      price: "180€",
      image: "🇬🇧",
      link: "/cours/anglais-debutant",
      color: "from-blue-500 to-indigo-600"
    },
    {
      id: 2,
      title: "Cours d'Anglais des Affaires",
      description: "Perfectionnez votre anglais professionnel pour réussir dans le monde des affaires.",
      duration: "45 heures",
      level: "Intermédiaire",
      format: "Hybride",
      category: "anglais",
      sessions: "2 fois/semaine",
      price: "350€",
      image: "💼",
      link: "/cours/anglais-affaires",
      color: "from-green-500 to-teal-600"
    },
    {
      id: 3,
      title: "Cours d'Anglais Avancé",
      description: "Maîtrisez l'anglais avancé : expressions idiomatiques, littérature et débats.",
      duration: "40 heures",
      level: "Avancé",
      format: "Présentiel",
      category: "anglais",
      sessions: "2 fois/semaine",
      price: "420€",
      image: "📚",
      link: "/cours/anglais-avance",
      color: "from-purple-500 to-blue-600"
    },
    {
      id: 4,
      title: "Préparation TOEFL/IELTS",
      description: "Préparez-vous efficacement aux examens TOEFL et IELTS avec nos experts.",
      duration: "50 heures",
      level: "Intermédiaire",
      format: "Hybride",
      category: "anglais",
      sessions: "3 fois/semaine",
      price: "480€",
      image: "🎯",
      link: "/cours/preparation-toefl-ielts",
      color: "from-orange-500 to-red-600"
    },

    // COURS DE JAPONAIS
    {
      id: 5,
      title: "Cours de Japonais Débutant",
      description: "Découvrez la langue japonaise : hiragana, katakana, phrases de base et culture.",
      duration: "40 heures",
      level: "Débutant",
      format: "En ligne",
      category: "japonais",
      sessions: "2 fois/semaine",
      price: "280€",
      image: "🇯🇵",
      link: "/cours/japonais-debutant",
      color: "from-pink-500 to-purple-600"
    },
    {
      id: 6,
      title: "Japonais Intermédiaire",
      description: "Approfondissez vos connaissances : kanji, grammaire complexe et conversation.",
      duration: "60 heures",
      level: "Intermédiaire",
      format: "Présentiel",
      category: "japonais",
      sessions: "2 fois/semaine",
      price: "450€",
      image: "🏯",
      link: "/cours/japonais-intermediaire",
      color: "from-indigo-500 to-purple-600"
    },
    {
      id: 7,
      title: "Japonais des Affaires",
      description: "Maîtrisez le japonais professionnel pour travailler avec des entreprises japonaises.",
      duration: "55 heures",
      level: "Avancé",
      format: "Hybride",
      category: "japonais",
      sessions: "3 fois/semaine",
      price: "580€",
      image: "🏢",
      link: "/cours/japonais-affaires",
      color: "from-violet-500 to-pink-600"
    },

    // COURS D'ESPAGNOL
    {
      id: 8,
      title: "Cours d'Espagnol Débutant",
      description: "Commencez votre apprentissage de l'espagnol avec les bases essentielles.",
      duration: "35 heures",
      level: "Débutant",
      format: "En ligne",
      category: "espagnol",
      sessions: "2 fois/semaine",
      price: "200€",
      image: "🇪🇸",
      link: "/cours/espagnol-debutant",
      color: "from-red-500 to-orange-600"
    },
    {
      id: 9,
      title: "Espagnol Conversationnel",
      description: "Perfectionnez votre expression orale et votre compréhension en espagnol.",
      duration: "40 heures",
      level: "Intermédiaire",
      format: "Présentiel",
      category: "espagnol",
      sessions: "3 fois/semaine",
      price: "320€",
      image: "💬",
      link: "/cours/espagnol-conversationnel",
      color: "from-yellow-500 to-red-600"
    },

    // FORMATIONS GESTION DE PROJET
    {
      id: 10,
      title: "Formation Gestion de Projet",
      description: "Apprenez les fondamentaux de la gestion de projet et les méthodologies modernes.",
      duration: "45 heures",
      level: "Débutant",
      format: "Hybride",
      category: "gestion",
      sessions: "2 fois/semaine",
      price: "650€",
      image: "📊",
      link: "/formations/gestion-projet",
      color: "from-cyan-500 to-blue-600"
    },
    {
      id: 11,
      title: "Certification PMP",
      description: "Préparez-vous à la certification PMP (Project Management Professional).",
      duration: "60 heures",
      level: "Avancé",
      format: "Présentiel",
      category: "gestion",
      sessions: "2 fois/semaine",
      price: "890€",
      image: "🏆",
      link: "/formations/certification-pmp",
      color: "from-emerald-500 to-teal-600"
    },
    {
      id: 12,
      title: "Méthodes Agile & Scrum",
      description: "Maîtrisez les méthodologies Agile et devenez Scrum Master certifié.",
      duration: "35 heures",
      level: "Intermédiaire",
      format: "En ligne",
      category: "gestion",
      sessions: "3 fois/semaine",
      price: "720€",
      image: "⚡",
      link: "/formations/agile-scrum",
      color: "from-lime-500 to-green-600"
    },

    // FORMATIONS SECRÉTARIAT INFORMATIQUE
    {
      id: 13,
      title: "Secrétariat Informatique",
      description: "Formation complète en bureautique : Word, Excel, PowerPoint et gestion administrative.",
      duration: "50 heures",
      level: "Débutant",
      format: "Présentiel",
      category: "secretariat",
      sessions: "4 fois/semaine",
      price: "480€",
      image: "💻",
      link: "/formations/secretariat-informatique",
      color: "from-blue-500 to-purple-600"
    },
    {
      id: 14,
      title: "Assistant(e) de Direction",
      description: "Développez les compétences avancées pour assister la direction d'entreprise.",
      duration: "65 heures",
      level: "Intermédiaire",
      format: "Hybride",
      category: "secretariat",
      sessions: "3 fois/semaine",
      price: "750€",
      image: "👔",
      link: "/formations/assistant-direction",
      color: "from-indigo-500 to-blue-600"
    },
    {
      id: 15,
      title: "Gestion Documentaire Numérique",
      description: "Maîtrisez la gestion électronique des documents et l'archivage numérique.",
      duration: "30 heures",
      level: "Intermédiaire",
      format: "En ligne",
      category: "secretariat",
      sessions: "2 fois/semaine",
      price: "380€",
      image: "📁",
      link: "/formations/gestion-documentaire",
      color: "from-teal-500 to-cyan-600"
    },

    // FORMATIONS COMPTABILITÉ
    {
      id: 16,
      title: "Comptabilité Générale",
      description: "Apprenez les principes fondamentaux de la comptabilité et la tenue des livres.",
      duration: "55 heures",
      level: "Débutant",
      format: "Présentiel",
      category: "comptabilite",
      sessions: "3 fois/semaine",
      price: "620€",
      image: "📈",
      link: "/formations/comptabilite-generale",
      color: "from-green-500 to-emerald-600"
    },
    {
      id: 17,
      title: "Comptabilité Analytique",
      description: "Perfectionnez-vous en comptabilité analytique et contrôle de gestion.",
      duration: "40 heures",
      level: "Intermédiaire",
      format: "Hybride",
      category: "comptabilite",
      sessions: "2 fois/semaine",
      price: "580€",
      image: "📊",
      link: "/formations/comptabilite-analytique",
      color: "from-amber-500 to-orange-600"
    },
    {
      id: 18,
      title: "Logiciels Comptables",
      description: "Maîtrisez Sage, Ciel Compta et autres logiciels de comptabilité professionnels.",
      duration: "45 heures",
      level: "Intermédiaire",
      format: "Présentiel",
      category: "comptabilite",
      sessions: "3 fois/semaine",
      price: "680€",
      image: "🧮",
      link: "/formations/logiciels-comptables",
      color: "from-purple-500 to-indigo-600"
    }
  ]

  const categories = [
    { id: 'all', name: 'Tous les cours', icon: '📚' },
    { id: 'anglais', name: 'Cours d\'Anglais', icon: '🇬🇧' },
    { id: 'japonais', name: 'Cours de Japonais', icon: '🇯🇵' },
    { id: 'espagnol', name: 'Cours d\'Espagnol', icon: '🇪🇸' },
    { id: 'gestion', name: 'Gestion de Projet', icon: '📊' },
    { id: 'secretariat', name: 'Secrétariat Informatique', icon: '💻' },
    { id: 'comptabilite', name: 'Comptabilité', icon: '📈' }
  ]

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
                    {course.image}
                  </div>
                  <h3 className="text-lg lg:text-xl font-bold mb-2 lg:mb-3 pr-10 lg:pr-12 leading-tight">
                    {course.title}
                  </h3>
                  <div className="flex flex-wrap gap-1 lg:gap-2">
                    <span className="bg-white/20 px-2 py-1 rounded-full text-xs font-medium">
                      {course.duration}
                    </span>
                    <span className="bg-white/20 px-2 py-1 rounded-full text-xs font-medium">
                      {course.sessions}
                    </span>
                  </div>
                </div>
                
                {/* Contenu */}
                <div className="p-4 lg:p-6 flex-grow flex flex-col">
                  <p className="text-sm lg:text-base text-gray-600 mb-4 leading-relaxed flex-grow">
                    {course.description}
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
                      {course.price}
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