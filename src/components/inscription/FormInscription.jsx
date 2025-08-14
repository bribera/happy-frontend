'use client'
import React, { useState, useEffect } from 'react'
import { User, Mail, Phone, MapPin, Calendar, CreditCard, CheckCircle, ArrowLeft, GraduationCap } from 'lucide-react'
import { api, initiateFedapayPayment, initiateKikipayPayment, openKikipayWidget } from '@/app/lib/api';


const InscriptionForm = () => {
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [step, setStep] = useState(1)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [categories, setCategories] = useState([])
  const [courses, setCourses] = useState([])
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    // Informations personnelles
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    city: '',
    postalCode: '',
    
    // Préférences de formation
    experience: '',
    objectives: '',
    availability: '',
    preferredSchedule: [],
    
    // Informations de paiement
    paymentMethod: 'kikipay', // Valeur par défaut
    installments: false,
    acceptTerms: false,
    newsletterOptIn: false,
    
    // Conditions
    acceptTerms: false,
    newsletterOptIn: false
  })

  // const courses = [
  //   {
  //     id: 1,
  //     title: "Cours d'Anglais Débutant",
  //     description: "Apprenez les bases de l'anglais : grammaire, vocabulaire essentiel et conversation simple.",
  //     duration: "30 heures",
  //     level: "Débutant",
  //     format: "En ligne",
  //     category: "anglais",
  //     sessions: "3 fois/semaine",
  //     price: "180€",
  //     image: "🇬🇧",
  //     color: "from-blue-500 to-indigo-600",
  //     startDates: ["15 Juillet 2025", "1 Août 2025", "15 Août 2025"]
  //   },
  //   {
  //     id: 2,
  //     title: "Cours d'Anglais des Affaires",
  //     description: "Perfectionnez votre anglais professionnel pour réussir dans le monde des affaires.",
  //     duration: "45 heures",
  //     level: "Intermédiaire",
  //     format: "Hybride",
  //     category: "anglais",
  //     sessions: "2 fois/semaine",
  //     price: "350€",
  //     image: "💼",
  //     color: "from-green-500 to-teal-600",
  //     startDates: ["20 Juillet 2025", "5 Août 2025", "20 Août 2025"]
  //   },
  //   {
  //     id: 10,
  //     title: "Formation Gestion de Projet",
  //     description: "Apprenez les fondamentaux de la gestion de projet et les méthodologies modernes.",
  //     duration: "45 heures",
  //     level: "Débutant",
  //     format: "Hybride",
  //     category: "gestion",
  //     sessions: "2 fois/semaine",
  //     price: "650€",
  //     image: "📊",
  //     color: "from-cyan-500 to-blue-600",
  //     startDates: ["10 Juillet 2025", "25 Juillet 2025", "10 Août 2025"]
  //   },
  //   {
  //     id: 16,
  //     title: "Comptabilité Générale",
  //     description: "Apprenez les principes fondamentaux de la comptabilité et la tenue des livres.",
  //     duration: "55 heures",
  //     level: "Débutant",
  //     format: "Présentiel",
  //     category: "comptabilite",
  //     sessions: "3 fois/semaine",
  //     price: "620€",
  //     image: "📈",
  //     color: "from-green-500 to-emerald-600",
  //     startDates: ["12 Juillet 2025", "28 Juillet 2025", "12 Août 2025"]
  //   }
  // ]

  // Fonction utilitaire pour récupérer les propriétés de manière sécurisée
  const getProperty = (obj, ...keys) => {
    for (const key of keys) {
      if (obj && obj[key] !== undefined && obj[key] !== null) {
        return obj[key];
      }
    }
    return null;
  };

  // Fonction pour transformer les données Strapi en format utilisable par le formulaire
 const transformCourseData = (strapiCourse) => {
  const attributes = strapiCourse.attributes;

  const availableStartDates = (attributes.sessions?.data || [])
    .filter(session => 
      session.attributes?.etat === 'Disponible' && session.attributes?.startDate
    )
    .map(session => {
      // On utilise 'startDate' ici aussi
      const date = new Date(session.attributes.startDate);
      if (isNaN(date.getTime())) {
        return null;
      }
      return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    })
    .filter(Boolean); // Nettoie les dates invalides

  const transformed = {
    id: strapiCourse.id,
    title: attributes.titre || 'Titre non disponible',
    description: attributes.description || 'Description non disponible',
    duration: attributes.duree || 'Durée non spécifiée',
    level: attributes.niveau || 'Niveau non spécifié',
    format: attributes.formats?.data[0]?.attributes?.name || 'Format non spécifié',
    price: attributes.prix ? `${attributes.prix}€` : 'Prix sur demande',
    color: attributes.color || 'from-blue-500 to-indigo-600',
    category: attributes.category?.data?.attributes?.slug || 'general', 
    image: attributes.image?.data?.attributes?.url || '📚',
    startDates: availableStartDates
  };

  return transformed;
};

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      

      const coursesResponse = await api('/cours-formations?populate=*');
      const categoriesData = await api('/categories')

       // Transformation des catégories
     const transformedCategories = [
      { id: 'all', name: 'Tous les cours', icon: '📚' },
      ...(categoriesData.data?.map(category => ({
        id: category.attributes?.slug || category.slug || category.id,
        name: category.attributes?.name || category.name || 'Catégorie sans nom',
        icon: category.attributes?.icon || category.icon || '📚'
      })) || [])
    ];
    
      
      if (coursesResponse?.data) {
       const transformedCourses = coursesResponse.data
        .filter(course => course && course.attributes) 
        .map(transformCourseData)   

        setCourses(transformedCourses);
        if (transformedCourses.length > 0) {
          setSelectedCourse(transformedCourses[0]);
        }
        setCategories(transformedCategories)
      }

    } catch (err) {
      setError(err.message);
      console.error('Erreur lors du chargement des données:', err);
    } finally {
      setLoading(false);
    }
  };

 

  useEffect(() => {
    fetchCourses();
  }, []);

  const scheduleOptions = [
    "Lundi matin (9h-12h)",
    "Lundi après-midi (14h-17h)",
    "Mardi matin (9h-12h)",
    "Mardi après-midi (14h-17h)",
    "Mercredi matin (9h-12h)",
    "Mercredi après-midi (14h-17h)",
    "Jeudi matin (9h-12h)",
    "Jeudi après-midi (14h-17h)",
    "Vendredi matin (9h-12h)",
    "Vendredi après-midi (14h-17h)",
    "Samedi matin (9h-12h)"
  ]


  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleScheduleChange = (schedule) => {
    setFormData(prev => ({
      ...prev,
      preferredSchedule: prev.preferredSchedule.includes(schedule)
        ? prev.preferredSchedule.filter(s => s !== schedule)
        : [...prev.preferredSchedule, schedule]
    }))
  }

  const nextStep = () => {
    setStep(prev => Math.min(prev + 1, 4))
  }

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1))
  }

 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsProcessingPayment(true);

  const isWaitlist = selectedCourse.startDates.length === 0;
  const customerData = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    courseName: selectedCourse.title
  };

  try {
    const paymentResult = await initiateKikipayPayment(selectedCourse.price, formData.phone, customerData);

    if (paymentResult.success) {
      openKikipayWidget(
        paymentResult.paymentData, // Utilise les données de paiement retournées par initiateKikipayPayment
        async (response) => { // onSuccess callback
          console.log('Kikipay Payment Success:', response);
          if (isWaitlist) {
          // CAS 1: Inscription sur la liste d'attente
          console.log("Création d'une entrée dans la liste d'attente...");
          await api('/liste-d-attentes', { // Notez le 's' à la fin
            method: 'POST',
            body: JSON.stringify({
              data: {
                informations_client: JSON.stringify(formData), // Stocke tout le formulaire
                statut_paiement: 'Payé',
                montant_paye: parseFloat(selectedCourse.price.replace('€', '')),
                id_transaction: response.transactionId, // ou une autre référence de Kikipay
                cours_formation: selectedCourse.id, // Lie à la formation
                statut_notification: 'Non notifié'
              }
            })
          });
          alert('Paiement réussi ! Vous avez été ajouté à la liste d\'attente.');
          setStep(5); // Étape de confirmation

        } else {
          console.log("Création d'une inscription finale...");
          // await api('/inscriptions', { ... }); // Exemple
          alert('Paiement réussi ! Votre inscription a été confirmée.');
          setStep(5);
        }
      },
      (error) => { // onError Callback
        console.error('Kikipay Payment Error:', error);
        alert(`Le paiement Kikipay a échoué: ${error}`);
        setIsProcessingPayment(false);
      }
    );
    } else {
      throw new Error(paymentResult.message || 'Échec de l\'initialisation du paiement Kikipay');
    }
    // if (formData.paymentMethod === 'kikipay') {
    //   paymentResult = await initiateKikipayPayment(selectedCourse.price, formData.phone, customerData);
    // } else if (formData.paymentMethod === 'fedapay') {
    //   paymentResult = await initiateFedapayPayment(selectedCourse.price, formData.phone, customerData);
      
    //   if (paymentResult.success && paymentResult.payment_url) {
    //     window.open(paymentResult.payment_url, '_blank');
    //     alert(`Paiement initié avec succès via Fedapay. Veuillez compléter le paiement dans la nouvelle fenêtre.`);
    //     setStep(5); // Étape de confirmation
    //   } else {
    //     throw new Error(paymentResult.message || 'Échec de l\'initialisation du paiement Fedapay');
    //   }
    // }
  } catch (error) {
    console.error('Payment failed:', error);
    alert(`Une erreur est survenue: ${error.message}`);
    setIsProcessingPayment(false);
    // Vous pouvez ajouter ici une logique pour informer l'utilisateur de l'échec du paiement
  }
};


const getStepIcon = (stepNumber) => {
  if (step > stepNumber) return <CheckCircle className="w-6 h-6" />
  return <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-sm font-bold">{stepNumber}</span>
}

 if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des cours...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-4">
          <h2 className="text-xl font-bold text-red-600 mb-4">Erreur de chargement</h2>
          <p className="text-gray-600">Une erreur est survenue lors du chargement des données: {error}</p>
          <button 
            onClick={fetchCourses}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  if (step === 5) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Inscription confirmée !</h2>
            <p className="text-gray-600">
              Votre inscription au cours <strong>{selectedCourse.title}</strong> a été enregistrée avec succès.
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-2">Prochaines étapes :</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Vous recevrez un email de confirmation dans les prochaines minutes
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Les détails de connexion vous seront envoyés 24h avant le début
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Vous pouvez accéder à votre espace personnel dès maintenant
              </li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Accéder à mon espace
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Nouvelle inscription
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* En-tête avec informations du cours */}
        <div className="mb-8">
          {selectedCourse ? (
            // Cas 1 : Un cours est sélectionné (comportement normal)
            <div className={`bg-gradient-to-r ${selectedCourse.color} text-white rounded-2xl p-6 mb-6`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className="text-3xl mr-3">{selectedCourse.image}</span>
                    <h1 className="text-2xl font-bold">{selectedCourse.title}</h1>
                  </div>
                  <p className="text-white/90 mb-4">{selectedCourse.description}</p>
                  <div className="flex flex-wrap gap-3">
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                      {selectedCourse.duration}
                    </span>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                      {selectedCourse.level}
                    </span>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                      {selectedCourse.format}
                    </span>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                      {selectedCourse.sessions}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{selectedCourse.price}</div>
                  <div className="text-white/80 text-sm">Prix total</div>
                </div>
              </div>
            </div>
          ) : (
            // Cas 2 : Aucun cours n'est disponible ou sélectionné
            <div className="bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-2xl p-6 mb-6">
              <div className="flex items-center">
                <span className="text-3xl mr-3">📝</span>
                <h1 className="text-2xl font-bold">Formulaire d'Inscription Générale</h1>
              </div>
              <p className="text-white/90 mt-2">
                Aucune formation n'est actuellement sélectionnée. Remplissez ce formulaire pour être ajouté à notre liste d'attente.
              </p>
            </div>
          )}         

          {/* Indicateur de progression */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div className={`${step >= stepNumber ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'} rounded-full p-2 transition-colors`}>
                    {getStepIcon(stepNumber)}
                  </div>
                  <div className="ml-2 hidden sm:block">
                    <div className={`text-sm font-medium ${step >= stepNumber ? 'text-blue-600' : 'text-gray-500'}`}>
                      {stepNumber === 1 && 'Informations'}
                      {stepNumber === 2 && 'Préférences'}
                      {stepNumber === 3 && 'Planning'}
                      {stepNumber === 4 && 'Paiement'}
                    </div>
                  </div>
                  {stepNumber < 4 && (
                    <div className={`hidden sm:block w-12 h-1 mx-4 ${step > stepNumber ? 'bg-blue-600' : 'bg-gray-200'} transition-colors`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
        {/* Étape 1: Informations personnelles */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="flex items-center mb-6">
              <User className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Informations personnelles</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prénom *</label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Votre prénom"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom *</label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Votre nom"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="+229 XX XX XX XX"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date de naissance</label>
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Adresse</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Votre adresse complète"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ville</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Cotonou"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Code postal</label>
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => handleInputChange('postalCode', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="XXXXX"
                />
              </div>
            </div>
          </div>
        )}

        {/* Étape 2: Préférences de formation */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="flex items-center mb-6">
              <GraduationCap className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Préférences de formation</h2>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Niveau d'expérience actuel</label>
              <select
                value={formData.experience}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                <option value="">Sélectionnez votre niveau</option>
                <option value="debutant">Débutant complet</option>
                <option value="faux-debutant">Faux débutant</option>
                <option value="intermediaire">Intermédiaire</option>
                <option value="avance">Avancé</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Objectifs de formation</label>
              <textarea
                value={formData.objectives}
                onChange={(e) => handleInputChange('objectives', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Décrivez vos objectifs et ce que vous souhaitez accomplir avec cette formation..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Disponibilité générale</label>
              <select
                value={formData.availability}
                onChange={(e) => handleInputChange('availability', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                <option value="">Sélectionnez votre disponibilité</option>
                <option value="temps-plein">Temps plein (disponible toute la journée)</option>
                <option value="matins">Matins uniquement</option>
                <option value="apres-midis">Après-midis uniquement</option>
                <option value="soirs">Soirs uniquement</option>
                <option value="week-ends">Week-ends uniquement</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>
          </div>
        )}

        {/* Étape 3: Planning préféré */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="flex items-center mb-6">
              <Calendar className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Planning préféré</h2>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Sélectionnez vos créneaux préférés (plusieurs choix possibles)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {scheduleOptions.map((schedule) => (
                  <label key={schedule} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.preferredSchedule.includes(schedule)}
                      onChange={() => handleScheduleChange(schedule)}
                      className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">{schedule}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-blue-900 mb-2">Dates de début disponibles :</h3>
              {selectedCourse && selectedCourse.startDates.length > 0 ? (
                // Cas 1 : Il y a des dates disponibles
                <div className="space-y-1">
                  {selectedCourse.startDates.map((date, index) => (
                    <div key={index} className="text-sm text-blue-700">• {date}</div>
                  ))}
                </div>
              ) : (
                // Cas 2 : Aucune date disponible
                <p className="text-sm text-orange-800 bg-orange-100 p-3 rounded-md">
                  Il n'y a pas encore de dates de début programmées pour cette formation.
                  En complétant votre inscription, vous serez placé sur notre liste d'attente et notifié en priorité.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Étape 4: Paiement */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="flex items-center mb-6">
              <CreditCard className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Informations de paiement</h2>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-gray-900 mb-2">Récapitulatif de votre commande</h3>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">{selectedCourse ? selectedCourse.title : "Inscription sur liste d'attente"}</span>
                <span className="font-bold text-lg">{selectedCourse ? selectedCourse.price : "N/A"}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Mode de paiement</label>
              <div className="space-y-3">
                <label className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="kikipay"
                    checked={formData.paymentMethod === 'kikipay'}
                    onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Kikipay</div>
                    <div className="text-sm text-gray-600">Paiement par mobile money, carte bancaire et Wave</div>
                  </div>
                  <div className="text-2xl">📱</div>
                </label>
                
                <label className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer opacity-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="fedapay"
                    checked={formData.paymentMethod === 'fedapay'}
                    onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500"
                    disabled
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Fedapay</div>
                    <div className="text-sm text-gray-600">Paiement sécurisé par carte bancaire et mobile money</div>
                    <div className="text-xs text-orange-600 mt-1">Configuration en cours...</div>
                  </div>
                  <div className="text-2xl">💳</div>
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  required
                  checked={formData.acceptTerms}
                  onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                  className="mt-1 mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">
                  J'accepte les <a href="#" className="text-blue-600 hover:underline">conditions générales</a> et la 
                  <a href="#" className="text-blue-600 hover:underline ml-1">politique de confidentialité</a> *
                </span>
              </label>

              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={formData.newsletterOptIn}
                  onChange={(e) => handleInputChange('newsletterOptIn', e.target.checked)}
                  className="mt-1 mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">
                  Je souhaite recevoir des informations sur les nouvelles formations et offres spéciales
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Boutons de navigation */}
        <div className="flex justify-between pt-6 border-t border-gray-200">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="flex items-center px-6 py-3 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Précédent
            </button>
          )}
          
          <div className="ml-auto">
            {step < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Suivant
              </button>
            ) : (
              <button
                type="submit"
                // Le bouton est désactivé si les conditions ne sont pas remplies OU si aucun cours n'est sélectionné
                disabled={!formData.acceptTerms || isProcessingPayment || !selectedCourse}
                className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isProcessingPayment ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Traitement...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 mr-2" />
                    {/* Le texte du bouton s'adapte à la situation */}
                    {selectedCourse && selectedCourse.startDates.length === 0
                      ? "Rejoindre la liste d'attente"
                      : "Procéder au paiement"}
                  </>
                )}
              </button>
                )}
              </div>
        </div>
        </form>
      </div>
    </div>
  )
}

export default InscriptionForm
