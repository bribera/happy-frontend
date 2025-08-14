'use client'
import { api } from '@/app/lib/api'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

// const formations = [
//     {
//         name: "Anglais",
//         link: "/cours/anglais",
//     },
//     {
//         name: "Japonais",
//         link: "/cours/japonais",
//     },
//     {
//         name: "Espagnol",
//         link: "/cours/espagnol",
//     },
//     {
//         name: "Infographie",
//         link: "/cours/infographie",
//     },
//     {
//         name: "Gestion de Projet",
//         link: "/cours/gestionprojet",
//     },
//     {
//         name: "Sécrétariat informatique",
//         link: "/cours/secretariat",
//     },
//     {
//         name: "Comptabilité",
//         link: "/comptabilite",
//     },
// ]

const ListFormation = () => {

    const [formations, setFormations] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
    const fetchFormations = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Récupération des formations depuis Strapi
        const response = await api('/cours-formations?populate=*')
        
        console.log('Données formations reçues:', response)

        if (response.data && Array.isArray(response.data)) {
          // Transformation des données Strapi pour correspondre à votre structure
          const transformedFormations = response.data.map(formation => ({
            id: formation.id,
            name: formation.attributes?.titre || formation.titre || 'Formation sans nom',
            // Générer le lien basé sur le slug ou l'ID
            link: `/cours/${formation.attributes?.slug || formation.slug || formation.id}`,
            // Propriétés supplémentaires si nécessaire
            description: formation.attributes?.description || formation.description,
            category: formation.attributes?.category || formation.category,
            level: formation.attributes?.niveau || formation.niveau || formation.attributes?.level || formation.level
          }))

          setFormations(transformedFormations)
        } else {
          setFormations([])
        }
        
      } catch (err) {
        setError(err.message)
        console.error('Erreur lors du chargement des formations:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchFormations()
  }, [])

  // Affichage pendant le chargement
  if (loading) {
    return (
      <div className='pt-10 min-h-[65px]'>
        <div className="">
          <p className="text-lg md:text-4xl font-semibold pb-10 text-happySecond underline-offset-6 underline">Listes des formations:</p>
        </div>
        <div className="text-center py-8">
          <p className="text-lg">Chargement des formations...</p>
        </div>
      </div>
    )
  }

  // Affichage en cas d'erreur
  if (error) {
    return (
      <div className='pt-10 min-h-[65px]'>
        <div className="">
          <p className="text-lg md:text-4xl font-semibold pb-10 text-happySecond underline-offset-6 underline">Listes des formations:</p>
        </div>
        <div className="text-center py-8">
          <p className="text-lg text-red-500">Erreur lors du chargement: {error}</p>
        </div>
      </div>
    )
  }

  // Affichage si aucune formation n'est trouvée
  if (formations.length === 0) {
    return (
      <div className='pt-10 min-h-[65px]'>
        <div className="">
          <p className="text-lg md:text-4xl font-semibold pb-10 text-happySecond underline-offset-6 underline">Listes des formations:</p>
        </div>
        <div className="text-center py-8">
          <p className="text-lg">Aucune formation disponible pour le moment.</p>
        </div>
      </div>
    )
  }


  return (
    <div className='pt-10 min-h-[65px]'>
        <div className="">
            <p className="text-lg md:text-4xl font-semibold pb-10 text-happySecond underline-offset-6 underline ">Listes des formations:</p>
        </div>
        <div className="overflow-x-auto  whitespace-nowrap custom-scroll">
            <div className="flex space-x-6 pb-6">
                {
                    formations.map((item, index) => (
                        <Link key={item.id} href={item.link}  className='px-10 md:px-20 py-2 md:py-4 text-center border-2 md:border-4 !border-happy rounded-2xl bg-white hover:bg-happy hover:text-white transition'>
                            <span className="text-base md:text-2xl" >
                                {item.name}
                            </span>
                        </Link>
                    ))
                }
            </div>
            {/* <div className="custom-scroll w-full h-4"></div> */}
        </div>
    </div>
  )
}

export default ListFormation
