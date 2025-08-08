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

    // COURS DE TECH
    {
      id: 7,
      title: "Développement Web",
      description: "Maîtrisez le japonais professionnel pour travailler avec des entreprises japonaises.",
      duration: "55 heures",
      level: "all",
      format: "Hybride",
      category: "tech",
      sessions: "3 fois/semaine",
      price: "A partir de 60 000 FCFA",
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
    { id: 'comptabilite', name: 'Comptabilité', icon: '📈' },
    { id: 'tech', name: 'Développement Web', icon: '📈' }
  ]