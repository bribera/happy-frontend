'use client'
import React, { useEffect, useState } from 'react'
import { TiSocialFacebook, TiSocialInstagram } from "react-icons/ti";
import { BiLogoTiktok, BiLogoTwitter } from "react-icons/bi";
import Image from 'next/image';
import ButtonAction from '../ButtonAction';
import Link from 'next/link';
import SecondButton from '../SecondButton';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';
import { api } from '@/app/lib/api';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';


const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Chargement de la carte...</p>
      </div>
    </div>
  )
});

const Contact = () => {

  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    sujet: '',
    formation: '',
    message: ''
  })
  const [formStatus, setFormStatus] = useState('')

  const centerLocation = {
    position: [6.430077, 2.350947], // Coordonnées GPS précises d'AZIMA Store
    name: 'Centre de Culture Japonaise Bénin',
    address: 'Carrefour Bidossessi, immeuble avant le supermarché AZIMA, dernier étage',
    details: 'Abomey-Calavi, Bénin',
    phone: '+229 01 97 65 2999',
    email: 'ccjbenin@gmail.com',
    description: 'Centre de formation en langues (Japonais, Anglais, Espagnol) et compétences professionnelles. Situé au dernier étage de l\'immeuble avant le supermarché AZIMA Store, au carrefour Bidossessi.',
    category: 'Centre de formation',
    landmark: 'Supermarché AZIMA Store',
    floor: 'Dernier étage',
    directions: 'Immeuble situé juste avant le supermarché AZIMA au carrefour Bidossessi'
  }

  const contactInfo = [
    {
      icon: '📍',
      title: 'Adresse',
      info: 'Carrefour Bidossessi immeuble avant le supermarché AZIMA, dernier étage',
      details: 'Abomey-Calavi, Bénin',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '📞',
      title: 'Téléphone',
      info: '+229 01 97 65 2999',
      details: 'Lun-Ven: 9h-18h',
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: '✉️',
      title: 'Email',
      info: 'ccjbenin@gmail.com',
      details: 'Réponse sous 24h',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: '🕒',
      title: 'Horaires',
      info: 'Lun-Ven: 9h-18h',
      details: 'Sam: 10h-16h',
      color: 'from-orange-500 to-red-500'
    }
  ]

  const sujets = [
    'Demande d\'information générale',
    'Inscription à une formation',
    'Demande de devis personnalisé',
    'Financement CPF',
    'Formation en entreprise',
    'Certification',
    'Support technique',
    'Autre'
  ]

  const formations = [
    'Cours d\'Anglais',
    'Cours de Japonais',
    'Cours d\'Espagnol',
    'Gestion de Projet',
    'Secrétariat Informatique',
    'Comptabilité',
    'Formation sur mesure'
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormStatus('sending')
    setTimeout(() => {
      setFormStatus('success')
      setFormData({
        nom: '',
        email: '',
        telephone: '',
        sujet: '',
        formation: '',
        message: ''
      })
    }, 2000)
  }

  const socialLinks = [
    { icon: <TiSocialFacebook />, name: 'Facebook', url: '#', color: 'hover:text-blue-600' },
    { icon: <TiSocialInstagram />, name: 'Instagram', url: '#', color: 'hover:text-pink-600' },
    { icon: <BiLogoTiktok />, name: 'Tiktok', url: '#', color: 'hover:text-blue-700' },
    { icon: <BiLogoTwitter />, name: 'Twitter', url: '#', color: 'hover:text-blue-400' }
  ]

  const [faq, setFaq] = useState([])
    const [isFaqLoading, setIsFaqLoading] = useState(true)
  
    useEffect(() =>{
      const fetchFaq = async () => {
        setIsFaqLoading(true)
         try {
          const response = await api("/question-frequentes")
          
          if(response && response.data && response.data.length > 0) {
            setFaq(response.data)
          } else {
            console.log("Erreur de report des questions fréquentes")
            setFaq(null)
          }
        } catch (error) {
          console.error("Erreur lors du chargement des questions", error)
          setFaq(null)
        } finally {
          setIsFaqLoading(false)
        }
      }
      
      fetchFaq()
    },[])
  
    if (isFaqLoading) {
      return (
        <div className="h-fit pt-10 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Chargement des questions...</p>
          </div>
        </div>
      );
    }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-36">
      {/* Hero Section */}
      <section className="relative overflow-hidden h-full">
        <div className="absolute inset-0 ">
          <Image alt='contact-header' src="/contact.jpg" width={500} height={200} className='w-full h-full object-center object-cover' priority/>
        </div>
        <div className="absolute w-full h-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800  text-white opacity-30"></div>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 h-full">
          <div className="text-center max-w-4xl mx-auto flex flex-col justify-center h-full">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 lg:mb-8 leading-tight text-white/90">
              Contactez notre <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">Centre de Culture Japonaise</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl opacity-90 leading-relaxed mb-8 lg:mb-12 text-white/90">
              Nous sommes là pour répondre à toutes vos questions et vous accompagner dans votre projet de formation
            </p>
            <div className="flex justify-center">
              <Link href="/apropos">
                <ButtonAction>
                  Voir nos formations
                </ButtonAction>
              </Link>
            </div>
            {/* buttons applez nous et écrivez nous */}
            {/* <div className="flex flex-wrap justify-center gap-4">
              <a href="tel:+33123456789" className="px-6 lg:px-8 py-3 lg:py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
                📞 Appelez-nous
              </a>
              <a href="mailto:contact@formationpro.fr" className="px-6 lg:px-8 py-3 lg:py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all">
                ✉️ Écrivez-nous
              </a>
                </div> */}
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="group relative">
                <div className="h-full bg-white rounded-xl p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                  <div className={`w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r ${info.color} rounded-full flex items-center justify-center text-2xl lg:text-3xl mb-4 lg:mb-6 mx-auto group-hover:scale-110 transition-transform`}>
                    {info.icon}
                  </div>
                  <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2 text-center">
                    {info.title}
                  </h3>
                  <p className="text-sm lg:text-base font-semibold text-gray-800 text-center mb-1">
                    {info.info}
                  </p>
                  <p className="text-xs lg:text-sm text-gray-600 text-center">
                    {info.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-12 lg:py-20 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Formulaire de contact */}
            <div className="bg-white rounded-xl p-6 lg:p-10 shadow-lg">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6 lg:mb-8">
                Envoyez-nous un message
              </h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="nom"
                      name="nom"
                      value={formData.nom}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Votre nom"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      id="telephone"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="06 12 34 56 78"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="votre@email.com"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="sujet" className="block text-sm font-medium text-gray-700 mb-2">
                      Sujet *
                    </label>
                    <select
                      id="sujet"
                      name="sujet"
                      value={formData.sujet}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="">Sélectionnez un sujet</option>
                      {sujets.map((sujet, index) => (
                        <option key={index} value={sujet}>{sujet}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="formation" className="block text-sm font-medium text-gray-700 mb-2">
                      Formation d'intérêt
                    </label>
                    <select
                      id="formation"
                      name="formation"
                      value={formData.formation}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="">Choisissez une formation</option>
                      {formations.map((formation, index) => (
                        <option key={index} value={formation}>{formation}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Décrivez votre projet de formation ou posez vos questions..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className={`w-full py-4 px-6 rounded-lg font-semibold transition-all transform hover:scale-105 ${
                    formStatus === 'sending'
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-happy to-purple-400 hover:from-blue-700 hover:to-purple-500 text-white shadow-lg'
                  }`}
                >
                  {formStatus === 'sending' ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                      </svg>
                      Envoi en cours...
                    </span>
                  ) : (
                    'Envoyer le message 📨'
                  )}
                </button>

                {formStatus === 'success' && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800">
                    <div className="flex items-center">
                      <span className="text-xl mr-3">✅</span>
                      <div>
                        <p className="font-medium">Message envoyé avec succès !</p>
                        <p className="text-sm">Nous vous répondrons dans les plus brefs délais.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Map & Info */}
            <div className="space-y-6">
              {/* Map placeholder */}
              {/* <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Nous trouver</h3>
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🗺️</div>
                    <p className="text-gray-600 font-medium">Carte interactive</p>
                    <p className="text-sm text-gray-500">123 Avenue de la Formation<br />75001 Paris, France</p>
                  </div>
                </div>
              </div> */}
               <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Nous trouver</h3>
                <div className="rounded-lg overflow-hidden">
                  <MapComponent 
                    locations={[centerLocation]}
                    center={centerLocation.position}
                    zoom={17} // Zoom plus élevé pour voir les détails du quartier
                    height="h-64"
                    tileProvider="cartodb" // Utiliser CartoDB par défaut pour une meilleure visibilité
                  />
                </div>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="text-blue-600 text-xl">📍</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{centerLocation.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{centerLocation.address}</p>
                      <p className="text-sm text-gray-600">{centerLocation.details}</p>
                      
                      {/* Informations de localisation détaillées */}
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm font-medium text-blue-800">🏢 Point de repère :</p>
                        <p className="text-sm text-blue-700">{centerLocation.landmark}</p>
                        <p className="text-sm text-blue-700">📍 {centerLocation.directions}</p>
                        <p className="text-sm text-blue-700">🏢 {centerLocation.floor}</p>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-2 mt-3">
                        <a 
                          href={`tel:${centerLocation.phone}`}
                          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          📞 {centerLocation.phone}
                        </a>
                        <a 
                          href={`mailto:${centerLocation.email}`}
                          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          ✉️ {centerLocation.email}
                        </a>
                      </div>
                      
                      {/* Lien Google Maps pour navigation */}
                      <div className="mt-3">
                        <a 
                          href={`https://www.google.com/maps/dir/?api=1&destination=${centerLocation.position[0]},${centerLocation.position[1]}&destination_place_id=ChIJAQAAAAAAAAAAAAAAAAAAAA`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          🗺️ Itinéraire Google Maps
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Suivez-nous</h3>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      className={`flex items-center p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-all transform hover:scale-105 ${social.color}`}
                    >
                      <span className="text-2xl mr-3">{social.icon}</span>
                      <span className="font-medium">{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 lg:mb-6">
              Questions Fréquentes
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              Trouvez rapidement les réponses aux questions les plus courantes
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faq.map((item, index) => (
              <div key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 lg:p-8 shadow-sm">
                <div className="text-lg lg:text-xl font-bold text-gray-900 mb-3 flex items-start">
                  <span className="text-blue-600 mr-3 mt-1">❓</span>               
                  <BlocksRenderer
                    content= {item.question}
                    blocks={{                            
                        heading: ({ children }) => {
                        return (
                            <h3 className=" text-gray-600 mb-4 line-clamp-3">
                            {children}
                            </h3>
                        );
                        }
                    }}
                  />
                </div>
                <BlocksRenderer
                  content={item.reponse}
                  blocks={{                            
                      paragraph: ({ children }) => {
                      return (
                          <p className=" text-gray-700 ml-8 leading-relaxed">
                          {children}
                          </p>
                      );
                      },
                  }}
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-12 glex flex flex-col items-center ">
            <p className="text-gray-600 mb-4">Vous ne trouvez pas la réponse à votre question ?</p>
            <Link href="mailto:contact@formationpro.fr" className=" hover:bg-blue-700 transition-colors font-semibold">
              <ButtonAction className="!text-base">
                Contactez notre équipe
              </ButtonAction>
            </Link>
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
            Notre équipe est là pour vous accompagner dans le choix et la réalisation de votre projet de formation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/formations" className="">
              <SecondButton>
               Découvrir nos formations
              </SecondButton>
            </Link>
            <a href="tel:+229 01 97 65 29 99" className="px-6 lg:px-8 py-3 lg:py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all">
              Appeler maintenant
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact