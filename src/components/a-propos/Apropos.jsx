'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import SecondButton from '../SecondButton'
import Link from 'next/link'
import { api, getStrapiMedia } from '@/app/lib/api'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import { Loader2, TruckElectric } from 'lucide-react'

const Apropos = () => {
  const [activeTab, setActiveTab] = useState('mission')

  const [teams, setTeam] = useState([])
  const [isTeamLoading, setIsLoadingTeam] = useState(true)

  
    useEffect(() =>{
      const fetchTeam = async () => {
        setIsLoadingTeam(true)
         try {
          const response = await api("/enseignants?populate=*")
          
          if(response && response.data && response.data.length > 0) {
            setTeam(response.data)
            console.log("data:", response.data)
          } else {
            console.log("Error de report de la date reportée")
            setDate(null)
          }
        } catch (error) {
          console.error("Erreur lors du chargement de la date:", error)
          setTeam(null)
        } finally {
          setIsLoadingTeam(false)
        }
      }
      
      fetchTeam()
    },[])

  const stats = [
    { number: '2000+', label: 'Étudiants formés', icon: '👥' },
    { number: '13+', label: 'Années d\'expérience', icon: '📅' },
    { number: '10+', label: 'Formations disponibles', icon: '📚' },
    { number: '98%', label: 'Taux de satisfaction', icon: '⭐' }
  ]

  const team = [
    {
      name: 'Marie Dubois',
      role: 'Directrice Pédagogique',
      speciality: 'Langues étrangères',
      image: '👩‍🏫',
      experience: '12 ans',
      description: 'Experte en pédagogie des langues avec une spécialisation en anglais des affaires.'
    },
    {
      name: 'Jean Martin',
      role: 'Formateur Senior',
      speciality: 'Gestion de projet',
      image: '👨‍💼',
      experience: '10 ans',
      description: 'Consultant certifié PMP avec une expertise en méthodologies Agile et Scrum.'
    },
    {
      name: 'Sarah Chen',
      role: 'Formatrice Japonais',
      speciality: 'Langue & Culture japonaise',
      image: '👩‍🎓',
      experience: '8 ans',
      description: 'Native du Japon, spécialisée dans l\'enseignement du japonais des affaires.'
    },
    {
      name: 'Carlos Rodriguez',
      role: 'Formateur Espagnol',
      speciality: 'Langues hispaniques',
      image: '👨‍🏫',
      experience: '9 ans',
      description: 'Linguiste expert en espagnol commercial et communication interculturelle.'
    }
  ]

  const values = [
    {
      title: 'Excellence Pédagogique',
      description: 'Nous proposons des formations de qualité supérieure avec des méthodes d\'enseignement innovantes.',
      icon: '🎯',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Flexibilité',
      description: 'Nos formations s\'adaptent à votre rythme avec des formats en ligne, présentiel et hybride.',
      icon: '⚡',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Accompagnement Personnalisé',
      description: 'Un suivi individualisé pour garantir votre réussite et l\'atteinte de vos objectifs.',
      icon: '🤝',
      color: 'from-green-500 to-teal-500'
    },
    {
      title: 'Innovation Continue',
      description: 'Nous intégrons les dernières technologies et tendances dans nos programmes de formation.',
      icon: '🚀',
      color: 'from-orange-500 to-red-500'
    }
  ]

  const certifications = [
    { name: 'Qualiopi', description: 'Certification qualité des formations', icon: '🏆' },
    { name: 'TOEFL Center', description: 'Centre agréé TOEFL', icon: '📜' },
    { name: 'PMI Partner', description: 'Partenaire officiel PMI', icon: '🤝' },
    { name: 'CPF Éligible', description: 'Formations éligibles CPF', icon: '💳' }
  ]

  const tabContent = {
    mission: {
      title: 'Notre Mission',
      content: `Depuis 2009, notre centre de formation s'engage à démocratiser l'apprentissage des langues et des compétences professionnelles. 
      Notre mission est de rendre accessible une formation de qualité à tous, quels que soient votre niveau de départ et vos contraintes.
      
      Nous croyons fermement que l'éducation est la clé du développement personnel et professionnel. C'est pourquoi nous mettons tout en œuvre 
      pour offrir des parcours de formation adaptés, innovants et orientés vers la réussite de nos apprenants.`
    },
    vision: {
      title: 'Notre Vision',
      content: `Devenir le leader européen de la formation linguistique et professionnelle en proposant des solutions d'apprentissage innovantes 
      et accessibles. Nous aspirons à créer un écosystème éducatif où chaque apprenant peut développer ses compétences selon ses propres objectifs.
      
      Notre vision s'articule autour de trois piliers : l'excellence pédagogique, l'innovation technologique et l'accompagnement humain. 
      Nous voulons que chaque formation soit une expérience transformatrice qui ouvre de nouvelles opportunités à nos apprenants.`
    },
    histoire: {
      title: 'Notre Histoire',
      content: `Fondé en 2009 par une équipe de passionnés de l'éducation, notre centre a commencé avec seulement 3 formateurs et une quinzaine d'étudiants. 
      Aujourd'hui, nous sommes fiers de compter plus de 2000 apprenants formés et une équipe de 25 formateurs experts.
      
      2009 : Création du centre avec les premières formations d'anglais
      2012 : Expansion vers les formations professionnelles (gestion de projet)
      2015 : Lancement des formations en japonais et espagnol
      2018 : Obtention de la certification Qualiopi
      2020 : Développement des formations en ligne et hybrides
      2023 : Ouverture de notre nouveau campus et certification CPF`
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-[138px]">
      {/* Hero Section */}
      <section className="relative overflow-hidden text-white h-[60vh]">
        <div className="absolute inset-0 ">
          <Image alt='contact-header' src="/apropos.jpg" width={500} height={200} className='w-full h-full object-center object-cover' />
        </div>
        <div className="absolute w-full h-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800  text-white opacity-30"></div>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 h-full flex flex-col justify-center">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 lg:mb-8 leading-tight">
              À Propos du <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">Centre de Culture Japonaise Bénin</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl opacity-90 leading-relaxed mb-8 lg:mb-12">
              Votre partenaire de confiance pour l'apprentissage des langues et le développement professionnel depuis 15 ans
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/formations" className="cursor-pointer">
                  <SecondButton>
                  Découvrir nos formations
                  </SecondButton>
                </Link>
                <Link href="/contact">
                  <button className="px-6 lg:px-8 py-3 lg:py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all">
                    Nous contacter
                  </button>
                </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
      </section>

      {/* Stats Section */}
      <section className="py-12 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 lg:p-8 rounded-xl bg-gradient-to-br from-gray-50 to-blue-50 hover:shadow-lg transition-all transform hover:scale-105">
                <div className="text-3xl lg:text-4xl mb-3 lg:mb-4">{stat.icon}</div>
                <div className="text-2xl lg:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-sm lg:text-base text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission/Vision/Histoire Section */}
      <section className="py-12 lg:py-20 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Tabs */}
            <div className="flex flex-col sm:flex-row justify-center mb-8 lg:mb-12 bg-white rounded-lg p-2 shadow-lg">
              {Object.keys(tabContent).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-4 lg:px-6 py-3 lg:py-4 rounded-md font-semibold transition-all ${
                    activeTab === tab
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {tabContent[tab].title}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-xl p-6 lg:p-10 shadow-lg">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6 lg:mb-8">
                {tabContent[activeTab].title}
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                {tabContent[activeTab].content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 lg:mb-6">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 lg:mb-6">
              Nos Valeurs
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              Les principes qui guident notre approche pédagogique et notre engagement envers nos apprenants
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {values.map((value, index) => (
              <div key={index} className="group relative">
                <div className="h-full bg-white rounded-xl p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className={`w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r ${value.color} rounded-full flex items-center justify-center text-2xl lg:text-3xl mb-4 lg:mb-6 mx-auto group-hover:scale-110 transition-transform`}>
                    {value.icon}
                  </div>
                  <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-3 lg:mb-4 text-center">
                    {value.title}
                  </h3>
                  <p className="text-sm lg:text-base text-gray-600 text-center leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 lg:py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 lg:mb-6">
              Notre Équipe d'Experts
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              Des formateurs passionnés et expérimentés, dédiés à votre réussite
            </p>
          </div>

          {
            isTeamLoading ? (
            <div className="h-fit pt-10 flex items-center justify-center bg-gray-50">
              <div className="text-center text-lg font-semibold">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
                <p className="text-gray-600">Chargement des articles..</p>
              </div>
            </div>
            ): (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {teams.map((member, index) => (
                <div key={index} className="bg-white rounded-xl p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <div className="text-center">
                    <div className="text-5xl lg:text-6xl mb-4 lg:mb-6">
                      <Image width={30} height={50} src={getStrapiMedia(member.cover.url)} alt={member.cover.name} className='border-rounded w-fit h-fit'/>
                    </div>
                    <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-blue-600 font-semibold mb-1">{member.role}</p>
                    <p className="text-sm text-gray-600 mb-2">{member.domaine}</p>
                    <div className="inline-block bg-gray-100 px-3 py-1 rounded-full text-xs font-medium text-gray-700 mb-4">
                      {member.year_experience} ans d'expérience
                    </div>
                    <BlocksRenderer
                      content={member?.description}
                      blocks={{                            
                          paragraph: ({ children }) => {
                          return (
                              <p className="text-sm text-gray-600 leading-relaxed">
                              {children}
                              </p>
                          );
                          },
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            )
          }
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-12 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 lg:mb-6">
              Nos Certifications & Agréments
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              Votre garantie de qualité et de reconnaissance professionnelle
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 lg:p-8 text-center hover:shadow-lg transition-all transform hover:scale-105">
                <div className="text-4xl lg:text-5xl mb-4 lg:mb-6">{cert.icon}</div>
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2 lg:mb-3">{cert.name}</h3>
                <p className="text-sm lg:text-base text-gray-600">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 lg:py-20 bg-gradient-to-r from-happy to-purple-400 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 lg:mb-6">
            Prêt à Commencer Votre Formation ?
          </h2>
          <p className="text-lg lg:text-xl opacity-90 mb-8 lg:mb-12 max-w-3xl mx-auto">
            Rejoignez les milliers d'apprenants qui ont fait confiance à FormationPro pour développer leurs compétences
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/formations" className="cursor-pointer">
              <SecondButton>
               Découvrir nos formations
              </SecondButton>
            </Link>
            <Link href="/contact" className='cursor-pointer'>           
              <button className="px-6 lg:px-8 py-3 lg:py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all">
                Demander un devis
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Apropos
