"use client"
import { api } from '@/app/lib/api'
import CoursTemplate from '@/components/CoursTemplate'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const CourseDetailPage = ( ) => {
  const params = useParams()
  const { slug } = params;

  const [courseData, setCourses] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  
  useEffect(() => {

    const fetchCourse = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await api(`/cours-formations?filters[slug][$eq]=${slug}&populate=*`)
    
        let course = null

        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          course = response.data[0];
        }
        if (course) {
          const course = response.data[0];
    
          const transformedCourses = {
            id: course.id,
            title: course.titre || 'Titre non disponible',
            subtitle: course.subtitle || 'Sous-titre non disponible',
            description: course.description || 'Description non disponible',
            instructor: {
                name: course.formateur?.nom || course.instructor?.name || "Formateur à définir",
                bio: course.formateur?.bio || course.instructor?.bio || "Expert dans le domaine avec plusieurs années d'expérience."
              },
            targetAudience: course.public_cible || course.targetAudience || "Professionnels, étudiants et personnes en reconversion.",
            originalPrice: course.prix_original || course.originalPrice || "Prix sur demande",
            currentPrice: course.prix_actuel || course.currentPrice || course.prix || course.price || "Prix sur demande",
            schedule: course.horaire || course.schedule || "Horaire à définir",
            location: course.lieu || course.location || "Nerdx House (Logbessou von Maquié BN)",
            phone: course.telephone || course.phone || "+229 66 63 33 57",
            email: course.email || "academy@nerdxdigital.com",
            website: course.site_web || course.website || "https://nerdxacademy.com",
            dates: course.dates || course.periode || "Dates à définir",
            highlights: course.points_forts || course.highlights || [
              "Formation pratique et interactive",
              "Certificat de fin de formation",
              "Suivi personnalisé"
            ],
            image: (( ) => {
              const imageObj = course.image || course.icone || course.icon;
              if (imageObj && typeof imageObj === 'object' && imageObj.url) {
                return imageObj.url;
              }
              if (typeof imageObj === 'string') {
                return imageObj;
              }
              return "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=200&fit=crop";
            } )(),
            
            // Propriétés supplémentaires pour votre logique métier
            duration: course.duree || course.duration || 'Durée non spécifiée',
            level: course.niveau || course.level || 'Niveau non spécifié',
            format: course.format || course.forme || 'Format non spécifié',
            category: course.category?.slug || course.category || 'general',
            sessions: course.sessions || course.seances || 'Sessions non spécifiées',
            link: course.lien || course.link || `/cours/${course.slug || course.id}`,
            color: course.couleur || course.color || course.classe_couleur || 'from-blue-500 to-indigo-600',
            icon: course.icon || '📚'
          };
      
          setCourses(transformedCourses)
      
          } else {
            setCourses(null); // Aucun cours trouvé
          }
        
      } catch (err) {
        setError(err.message)
        console.error('Erreur lors du chargement des données:', err)
      } finally {
        setLoading(false)
      }
    }
    if (slug) {
      fetchCourse();
    }
    
  }, [slug])

   if (loading) {
    return <div>Chargement des données du cours...</div>;
  }

  if (error) {
    return <div>Erreur: {error.message}</div>;
  }

  if (!courseData || courseData.length === 0) {
    return <div>Aucune donnée de cours disponible pour cette formation.</div>;
  }
  
  return (
    <div>
      <CoursTemplate course={courseData} />
    </div>
  )
}

export default CourseDetailPage
