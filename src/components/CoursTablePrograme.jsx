'use client'
import React, { useState } from 'react';
import { BookOpen, Globe, Palette, FolderOpen, Users, Briefcase } from 'lucide-react';


const CoursTablePrograme = () => {

    const [activeTab, setActiveTab] = useState('general');

    // Données des programmes généraux
  const generalPrograms = [
    {
      id: 1,
      course: 'Anglais',
      level: 'Débutant à Avancé',
      duration: 'En fonction du choix',
      sessions: 'En fonction du choix',
      price: 'En fonction du choix',
      status: 'Ouvert'
    },
    {
      id: 2,
      course: 'Espagnol',
      level: 'Débutant à Intermédiaire',
      duration: '4 mois',
      sessions: '2 fois/semaine',
      price: '50 000 Fcfa',
      status: 'Ouvert'
    },
    {
      id: 3,
      course: 'Japonais',
      level: 'Débutant',
      duration: '1 mois',
      sessions: '1 fois/semaine',
      price: '35 000 Fcfa',
      status: 'Places limitées'
    },
    {
      id: 4,
      course: 'Infographie',
      level: 'Débutant à Avancé',
      duration: '6 mois',
      sessions: '3 fois/semaine',
      price: '50 000 FCFA',
      status: 'Ouvert'
    },
    {
      id: 5,
      course: 'Gestion de Projet',
      level: 'Intermédiaire à Avancé',
      duration: '3 mois',
      sessions: '2 fois/semaine',
      price: '50 000 Fcfa',
      status: 'Ouvert'
    }
  ];

  // Programmes détaillés par cours
  const courseDetails = {
    anglais: [
      { module: 'Anglais Général et Spécialité', semaine: '3 séances', heures: '3h-4h/par jour', objectifs: 'Maîtriser les temps simples',montant: '70 000 Fcfa' }, 
      { module: 'Anglais de communication', semaine: '4 séances', heures: '2h-3h / jour', objectifs: 'Communiquer dans la vie courante',montant: '80 000 Fcfa' }, 
      { module: 'Anglais de communication accéléré', semaine: '5 séances', heures: '3h-4h / jour', objectifs: 'Conversations fluides',montant: '120 000 Fcfa' }, 
      { module: 'Anglais professionnel', semaine: '2 séances \n (disponibles cours du matin ou cours de l\'après midi)', heures: '2h / jour', objectifs: 'Communication en entreprise',montant: '40 000 Fcfa' }, 
      { module: 'Préparation TOEIC/TOEFL', semaine: '4 séances', heures: '2h-3h / par jour', objectifs: 'Certification officielle',montant: '80 000 Fcfa' }
    ],
    espagnol: [
      { module: 'Alphabet et prononciation', semaine: '1-2', heures: '15h', objectifs: 'Bases phonétiques' },
      { module: 'Grammaire essentielle', semaine: '3-6', heures: '30h', objectifs: 'Structures fondamentales' },
      { module: 'Conversation pratique', semaine: '7-10', heures: '25h', objectifs: 'Dialogues simples' },
      { module: 'Culture hispanique', semaine: '11-14', heures: '20h', objectifs: 'Contexte culturel' },
      { module: 'Espagnol des affaires', semaine: '15-16', heures: '10h', objectifs: 'Vocabulaire professionnel' }
    ],
    japonais: [
      { module: 'Hiragana et Katakana', semaine: '1-4', heures: '40h', objectifs: 'Écriture de base' },
      { module: 'Grammaire N5', semaine: '5-12', heures: '60h', objectifs: 'Structures élémentaires' },
      { module: 'Kanji niveau 1', semaine: '13-20', heures: '50h', objectifs: '100 premiers kanji' },
      { module: 'Conversation simple', semaine: '21-26', heures: '35h', objectifs: 'Échanges basiques' },
      { module: 'Culture japonaise', semaine: '27-30', heures: '25h', objectifs: 'Contexte social' },
      { module: 'Préparation JLPT N5', semaine: '31-32', heures: '20h', objectifs: 'Certification' }
    ],
    infographie: [
      { module: 'Adobe Photoshop', semaine: '1-5', heures: '50h', objectifs: 'Retouche et montage photo' },
      { module: 'Adobe Illustrator', semaine: '6-10', heures: '45h', objectifs: 'Design vectoriel' },
      { module: 'Adobe InDesign', semaine: '11-14', heures: '35h', objectifs: 'Mise en page professionnelle' },
      { module: 'Théorie des couleurs', semaine: '15-16', heures: '15h', objectifs: 'Harmonie chromatique' },
      { module: 'Projet final', semaine: '17-20', heures: '35h', objectifs: 'Portfolio professionnel' }
    ],
    gestion: [
      { module: 'Fondamentaux PM', semaine: '1-2', heures: '20h', objectifs: 'Méthodologies de base' },
      { module: 'Planification projet', semaine: '3-4', heures: '20h', objectifs: 'Outils de planning' },
      { module: 'Gestion équipe', semaine: '5-6', heures: '20h', objectifs: 'Leadership et communication' },
      { module: 'Gestion des risques', semaine: '7-8', heures: '20h', objectifs: 'Identification et mitigation' },
      { module: 'Méthodologies Agile', semaine: '9-10', heures: '20h', objectifs: 'Scrum et Kanban' },
      { module: 'Certification PMP', semaine: '11-12', heures: '20h', objectifs: 'Préparation examen' }
    ]
  };

  const tabs = [
    { id: 'general', label: 'Vue Générale', icon: BookOpen },
    { id: 'anglais', label: 'Anglais', icon: Globe },
    { id: 'espagnol', label: 'Espagnol', icon: Globe },
    { id: 'japonais', label: 'Japonais', icon: Globe },
    { id: 'infographie', label: 'Infographie', icon: Palette },
    { id: 'gestion', label: 'Gestion de Projet', icon: Briefcase }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Ouvert': return 'bg-green-100 text-green-800';
      case 'Places limitées': return 'bg-yellow-100 text-yellow-800';
      case 'Complet': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };



  return (
     <div className="w-full max-w-7xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Programmes des Formations
        </h1>
        <p className="text-gray-600">
          Découvrez nos programmes de cours détaillés
        </p>
      </div>

      {/* Navigation par onglets */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex flex-wrap gap-2 -mb-px">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon size={16} />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Contenu des onglets */}
      <div className="overflow-hidden">
        {activeTab === 'general' && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 rounded-lg">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                    Cours
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                    Niveau
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                    Durée
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                    Fréquence
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                    Prix
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                    Statut
                  </th>
                </tr>
              </thead>
              <tbody>
                {generalPrograms.map((program) => (
                  <tr key={program.id} className="hover:bg-gray-50 transition-colors">
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-800">
                      {program.course}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-600">
                      {program.level}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-600">
                      {program.duration}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-600">
                      {program.sessions}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-600 font-medium">
                      {program.price}
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(program.status)}`}>
                        {program.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab !== 'general' && courseDetails[activeTab] && (
          <div className="overflow-x-auto">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-800 capitalize">
                Programme détaillé - {activeTab === 'gestion' ? 'Gestion de Projet' : activeTab}
              </h2>
            </div>
            <table className="w-full border-collapse border border-gray-300 rounded-lg">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                    Module
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                    Semaines
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                    Volume horaire
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                    Objectifs
                  </th>
                </tr>
              </thead>
              <tbody>
                {courseDetails[activeTab].map((module, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-800">
                      {module.module}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-600 whitespace-pre-line">
                      {module.semaine}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-600 font-medium">
                      {module.heures}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-600">
                      {module.objectifs}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pied de page avec informations supplémentaires */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
          <div>
            <strong className="text-gray-800">📅 Inscriptions :</strong>
            <br />Ouvertes toute l'année
          </div>
          <div>
            <strong className="text-gray-800">💳 Modes de paiement :</strong>
            <br />Mensuel, trimestriel, annuel
          </div>
          <div>
            <strong className="text-gray-800">📞 Contact :</strong>
            <br />+229 01 97 65 29 99
          </div>
        </div>
      </div>
    </div>
  );
};


export default CoursTablePrograme
