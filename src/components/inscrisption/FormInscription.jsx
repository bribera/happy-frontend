'use client'
import React, { useState, useEffect } from 'react'
import { User, Mail, Phone, MapPin, Calendar, CreditCard, CheckCircle, ArrowLeft, GraduationCap } from 'lucide-react'

const InscriptionForm = () => {
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [step, setStep] = useState(1)
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
    paymentMethod: 'card',
    installments: false,
    
    // Conditions
    acceptTerms: false,
    newsletterOptIn: false
  })

  const courses = [
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
      color: "from-blue-500 to-indigo-600",
      startDates: ["15 Juillet 2025", "1 Août 2025", "15 Août 2025"]
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
      color: "from-green-500 to-teal-600",
      startDates: ["20 Juillet 2025", "5 Août 2025", "20 Août 2025"]
    },
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
      color: "from-cyan-500 to-blue-600",
      startDates: ["10 Juillet 2025", "25 Juillet 2025", "10 Août 2025"]
    },
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
      color: "from-green-500 to-emerald-600",
      startDates: ["12 Juillet 2025", "28 Juillet 2025", "12 Août 2025"]
    }
  ]

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

  useEffect(() => {
    // Simuler la sélection d'un cours (dans un vrai cas, ceci viendrait des paramètres de l'URL)
    setSelectedCourse(courses[0])
  }, [])

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

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Inscription soumise:', { course: selectedCourse, formData })
    setStep(5) // Étape de confirmation
  }

  const getStepIcon = (stepNumber) => {
    if (step > stepNumber) return <CheckCircle className="w-6 h-6" />
    return <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-sm font-bold">{stepNumber}</span>
  }

  if (!selectedCourse) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    )
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Votre niveau d'expérience</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Vos objectifs</label>
                <textarea
                  value={formData.objectives}
                  onChange={(e) => handleInputChange('objectives', e.target.value)}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Décrivez vos objectifs et attentes pour cette formation..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Disponibilité générale</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['Temps plein', 'Temps partiel', 'Week-ends uniquement'].map((option) => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name="availability"
                        value={option}
                        checked={formData.availability === option}
                        onChange={(e) => handleInputChange('availability', e.target.value)}
                        className="mr-3 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">Date de début souhaitée</label>
                <div className="grid grid-cols-1 gap-3">
                  {selectedCourse.startDates.map((date) => (
                    <label key={date} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="startDate"
                        value={date}
                        className="mr-3 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="flex items-center">
                        <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                        <span className="text-gray-700">{date}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Étape 3: Planning */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center mb-6">
                <Calendar className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Préférences de planning</h2>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-blue-900 mb-2">Information</h3>
                <p className="text-sm text-blue-700">
                  Sélectionnez vos créneaux préférés. Nous ferons notre possible pour vous proposer un planning qui correspond à vos disponibilités.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">Créneaux préférés (sélection multiple)</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {scheduleOptions.map((schedule) => (
                    <label key={schedule} className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                      formData.preferredSchedule.includes(schedule)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}>
                      <input
                        type="checkbox"
                        checked={formData.preferredSchedule.includes(schedule)}
                        onChange={() => handleScheduleChange(schedule)}
                        className="mr-3 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{schedule}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h3 className="font-medium text-amber-900 mb-2">Planning du cours</h3>
                <p className="text-sm text-amber-700 mb-2">
                  <strong>{selectedCourse.title}</strong> - {selectedCourse.sessions}
                </p>
                <p className="text-sm text-amber-700">
                  Durée totale : {selectedCourse.duration} • Format : {selectedCourse.format}
                </p>
              </div>
            </div>
          )}

          {/* Étape 4: Paiement */}
          {step === 4 && (
            <div className="space-y-6">
                <div className="flex items-center mb-6">
                <CreditCard className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Modalités de paiement</h2>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg p-6">
                <div className="flex items-center justify-between">
                    <div>
                    <h3 className="text-lg font-semibold text-green-900">{selectedCourse.title}</h3>
                    <p className="text-sm text-green-700">{selectedCourse.duration} • {selectedCourse.format}</p>
                    </div>
                    <div className="text-right">
                    <div className="text-2xl font-bold text-green-900">{selectedCourse.price}</div>
                    <div className="text-sm text-green-700">Prix total</div>
                    </div>
                </div>
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">Mode de paiement</label>
                <div className="space-y-3">
                    <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                        className="mr-3 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex items-center">
                        <CreditCard className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                        <div className="font-medium text-gray-900">Carte bancaire</div>
                        <div className="text-sm text-gray-500">Paiement sécurisé par carte</div>
                        </div>
                    </div>
                    </label>
                    <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="transfer"
                        checked={formData.paymentMethod === 'transfer'}
                        onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                        className="mr-3 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex items-center">
                        <div className="w-5 h-5 bg-blue-100 rounded mr-3 flex items-center justify-center">
                        <span className="text-xs text-blue-600">€</span>
                        </div>
                        <div>
                        <div className="font-medium text-gray-900">Virement bancaire</div>
                        <div className="text-sm text-gray-500">Paiement par virement</div>
                        </div>
                    </div>
                    </label>
                    <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="mobile"
                        checked={formData.paymentMethod === 'mobile'}
                        onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                        className="mr-3 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex items-center">
                        <Phone className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                        <div className="font-medium text-gray-900">Mobile Money</div>
                        <div className="text-sm text-gray-500">MTN, Moov, Celtiis</div>
                        </div>
                    </div>
                    </label>
                </div>
                </div>
                <div className="border-t pt-6">
                <label className="flex items-start">
                    <input
                    type="checkbox"
                    checked={formData.installments}
                    onChange={(e) => handleInputChange('installments', e.target.checked)}
                    className="mt-1 mr-3 text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                    <div className="font-medium text-gray-900">Paiement en plusieurs fois</div>
                    <div className="text-sm text-gray-500">Étalez votre paiement sur 2 ou 3 mensualités</div>
                    </div>
                </label>
                </div>
                <div className="space-y-4 border-t pt-6">
                <label className="flex items-start">
                    <input
                    type="checkbox"
                    required
                    checked={formData.acceptTerms}
                    onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                    className="mt-1 mr-3 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="text-sm text-gray-700">
                    J'accepte les <a href="#" className="text-blue-600 hover:underline">conditions générales</a> et la <a href="#" className="text-blue-600 hover:underline">politique de confidentialité</a>
                    </div>
                </label>
                <label className="flex items-start">
                    <input
                    type="checkbox"
                    checked={formData.newsletterOptIn}
                    onChange={(e) => handleInputChange('newsletterOptIn', e.target.checked)}
                    className="mt-1 mr-3 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="text-sm text-gray-700">
                    Je souhaite recevoir la newsletter avec des offres spéciales et des mises à jour
                    </div>
                </label>
                </div>
            </div>
          )}
          
          {/* Bouton de Navigation */}
          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Précédent
              </button>
            )}
            {step < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="ml-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Suivant
              </button>
            ) : (
              <button
                type="submit"
                className="ml-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Valider l'inscription
              </button>
            )}
          </div>
        </form>
        </div>
    </div>
  )
}

export default InscriptionForm
