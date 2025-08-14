import React from 'react'
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Calendar, MapPin, Phone, Mail, Globe} from 'lucide-react';
import { IoLogoFacebook, IoLogoLinkedin } from 'react-icons/io5';
import { GrInstagram } from 'react-icons/gr';
import Image from 'next/image';
import { getStrapiMedia } from '@/app/lib/api';


const CoursTemplate = ({ course }) => {
    
 // Destructurez avec des valeurs par défaut
    const {
        title = '',
        subtitle = '',
        description = '',
        instructor = { name: '', bio: '' },
        targetAudience = '',
        originalPrice = '',
        currentPrice = '',
        schedule = '',
        location = 'Abomey-Calavi, Carefour Bidossessi, immeuble avant le supermarchet AZIMA dernier étage',
        phone = '+229 97 65 29 99',
        email = 'ccjbenin@gmail.com',
        // website = 'https://nerdxacademy.com',
        dates = '',
        highlights = [],
        image = "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=200&fit=crop"
    } = course || {};

  // Assurez-vous que title est une chaîne avant d'appeler split( )
  const displayTitle = title || '';
  const instructorName = instructor?.name || '';
  const instructorBio = instructor?.bio || '';
  const courseHighlights = highlights || [];


  return (
    <div className='bg-[#1b3d75] text-white '>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Colone de gauche  */}
            <div className="space-y-8">
                <div>
                    <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                        <span className="text-orange-400">Formation</span>
                        <br />
                        <span className="text-orange-400">professionnelle en</span>
                        <br />
                        <span className="text-white">{displayTitle.split(' ').slice(-2).join(' ')}</span>
                    </h1>
                </div>

                <p className="text-gray-300 text-lg leading-relaxed">
                 {subtitle}
                </p>

                <div className="space-y-6">
                    <div>
                        <h2 className="text-orange-400 text-xl font-semibold mb-3">
                        Description de la Formation
                        </h2>
                        <p className="text-gray-300 leading-relaxed">
                        {description}
                        </p>
                    </div>

                    <div>
                        <h2 className="text-orange-400 text-xl font-semibold mb-3">
                        Formateur(s)
                        </h2>
                        <p className="text-gray-300">
                        <span className="font-semibold">{instructorName}</span>, {instructorBio}
                        </p>
                    </div>

                    <div>
                        <h2 className="text-orange-400 text-xl font-semibold mb-3">
                        Public cible
                        </h2>
                        <p className="text-gray-300 leading-relaxed">
                        {targetAudience}
                        </p>
                    </div>
                </div>
            </div>
             {/* Colonne de droite - Card d'inscription */}
          <div className="flex justify-center">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-md w-full">
              {/* Header avec logo */}
              <div className="bg-slate-800 p-4 text-center">
                <h3 className="text-white font-bold text-lg">Nerdx Academy</h3>
                <div className="flex justify-center space-x-4 mt-2">
                  <IoLogoFacebook className="w-5 h-5 text-white hover:text-orange-400 cursor-pointer" />
                  <GrInstagram className="w-5 h-5 text-white hover:text-orange-400 cursor-pointer" />
                  <IoLogoLinkedin className="w-5 h-5 text-white hover:text-orange-400 cursor-pointer" />
                </div>
              </div>

              {/* Badge "Cours du soir" */}
              <div className="bg-orange-500 text-white text-center py-2 font-semibold">
                COURS DU SOIR
              </div>

              {/* Image du cours */}
              <div className="relative">
                <Image
                  width={200}
                  height={200} 
                  src={getStrapiMedia(image) || "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=200&fit=crop"} 
                  alt={title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h4 className="text-white text-2xl font-bold">
                    {displayTitle.split(' ' ).slice(-2).join(' ')}
                  </h4>
                </div>
              </div>

              {/* Contenu de la card */}
              <div className="p-6 space-y-4">
                {/* Points forts */}
                <div className="space-y-2">
                  {courseHighlights.map((highlight, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Prix */}
                <div className="bg-slate-800 text-white p-4 rounded-lg text-center">
                  <div className="flex justify-center items-center space-x-2">
                    <span className="text-gray-400 line-through text-sm">{originalPrice}</span>
                    <span className="text-orange-400 text-2xl font-bold">{currentPrice}</span>
                  </div>
                </div>

                {/* Informations pratiques */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-orange-500" />
                    <div className="text-sm">
                      <div className="font-semibold">{schedule}</div>
                      <div className="text-gray-600">{location}</div>
                    </div>
                  </div>
                </div>

                {/* Contact */}
                <div className="bg-orange-500 text-white p-4 rounded-lg space-y-2">
                  <div className="flex items-center justify-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span className="font-semibold">{phone}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{email}</span>
                  </div>
                </div>

                {/* Dates */}
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 text-gray-700">
                    <Calendar className="w-4 h-4" />
                    <span className="font-semibold">{dates}</span>
                  </div>
                </div>

                {/* Bouton d'inscription */}
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                  S'inscrire maintenant
                </button>
              </div>
            </div>
          </div>
        </div>       
      </div>
    </div>
  )
}

export default CoursTemplate
