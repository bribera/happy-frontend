import CoursTemplate from '@/components/CoursTemplate'
import React from 'react'

const page = () => {
  const courseData = {
    title: "Formation professionnelle en Design Graphique",
    subtitle: "Développer des concepts visuels pour des projets de communication marketing.",
    description: "Le design graphique est essentiel pour communiquer visuellement les idées et les messages d'une entreprise. Cette formation vise à vous doter des compétences nécessaires pour créer des visuels attrayants, efficaces et qui séduisent.",
    instructor: {
      name: "Fabien AMOUSSOU",
      bio: "expert en Design Graphique avec plus de 10 ans d'expérience dans l'industrie."
    },
    targetAudience: "Des personnes en recherche d'emploi, les professionnels du marketing, les entrepreneurs, les étudiants en art et design, les freelances créatifs.",
    originalPrice: "150 000 FCFA",
    currentPrice: "75 000 FCFA",
    schedule: "08 avril 2024 - 19h",
    location: "Nerdx House (Logbessou von Maquié BN)",
    phone: "+229 66 63 33 57",
    email: "academy@nerdxdigital.com",
    website: "https://nerdxacademy.com",
    dates: "8-12 avril 2024",
    highlights: [
      "Explorez le monde créatif",
      "Découvrez les tendances",
      "Maîtrisez les outils essentiels"
    ],
    image: "/images/design-graphique-hero.jpg"
  }
  return (
    <div>
      <CoursTemplate {...courseData} />
    </div>
  )
}

export default page
