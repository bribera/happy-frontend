export function getStrapiURL(path = "") {
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${path}`;
}

export const getStrapiMedia = (url) => {
  if (!url) return null;
  const mediaUrl = url.startsWith("/")
    ? `${process.env.NEXT_PUBLIC_STRAPI_DOMAIN_URL}${url}`
    : url;
  return mediaUrl;
};

export function formatDate2(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).replace(/(\w+)\s(\d{4})/, '$1, $2');
}

export function formatDate(dateString){
  const months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];
  
  const date = new Date(dateString);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  
  return `${day} ${month} ${year}`;
};

export async function api(path, options = {}) {
  try {
    // Merge default and user options
    const mergedOptions = {
      next: { revalidate: 60 },
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    };

    // Build request URL
    const requestUrl = getStrapiURL(`${path}`);

    // Call API
    const response = await fetch(requestUrl, mergedOptions);

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
        `Veuillez vérifier si votre serveur est en cours d'exécution et que vous avez configuré tous les jetons requis.`
    );
  }
}

export function optimizeCloudinaryUrl(url, width = 800, quality = 'auto:best') {
  return url.replace('/upload/', `/upload/q_${quality},f_auto,w_${width}/`);
}

// Fedapay Config

// Fonction pour initialiser un paiement avec Fedapay
// export async function initiateFedapayPayment(amount, phoneNumber) {
//   const fedapayUrl = 'https://api.fedapay.com/v1/transactions';
//   const fedapayOptions = {
//     method: 'POST',
//     headers: {
//       'Authorization': `Bearer ${process.env.NEXT_PUBLIC_FEDAPAY_PUBLIC_KEY}`,
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       amount,
//       currency: "XOF",
//       description: "Paiement pour inscription au cours",
//       callback_url: `${process.env.NEXT_PUBLIC_STRAPI_DOMAIN_URL}/callback`,
//       customer: {
//         phone_number: phoneNumber,
//       },
//     }),
//   };

//   try {
//     const response = await fetch(fedapayUrl, fedapayOptions);
//     if (!response.ok) {
//       throw new Error(`Error: ${response.statusText}`);
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error initiating Fedapay payment:', error);
//     throw error;
//   }
// }

export async function initiateFedapayPayment(amount, phoneNumber, customerData = {}) {
  // Vérifier si les clés Fedapay sont configurées
  if (!process.env.NEXT_PUBLIC_FEDAPAY_PUBLIC_KEY) {
    throw new Error('Clés API Fedapay non configurées. Veuillez ajouter NEXT_PUBLIC_FEDAPAY_PUBLIC_KEY dans votre fichier .env');
  }

  const fedapayUrl = 'https://api.fedapay.com/v1/transactions';
  const fedapayOptions = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_FEDAPAY_PUBLIC_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount: parseFloat(amount.toString().replace('€', '').trim()) * 655.957, // Conversion EUR vers XOF
      currency: "XOF",
      description: `Inscription au cours - ${customerData.courseName || 'Formation'}`,
      callback_url: `${process.env.NEXT_PUBLIC_STRAPI_DOMAIN_URL}/callback`,
      customer: {
        firstname: customerData.firstName || '',
        lastname: customerData.lastName || '',
        email: customerData.email || '',
        phone_number: {
          number: phoneNumber,
          country: 'bj' // Bénin
        }
      },
    }),
  };

  try {
    const response = await fetch(fedapayUrl, fedapayOptions);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return {
      success: true,
      transaction_id: data.id,
      status: data.status,
      payment_url: data.payment_url,
      message: 'Paiement initié avec succès via Fedapay'
    };
  } catch (error) {
    console.error('Error initiating Fedapay payment:', error);
    throw error;
  }
}


// Kikipay Config

// Configuration des clés API Kikipay (Sandbox)
const KIKIPAY_CONFIG = {
  publicKey:`${process.env.NEXT_PUBLIC_KIKIPAY_PUBLIC_KEY}`,
  privateKey: `${process.env.NEXT_PUBLIC_KIKIPAY_PRIVATE_KEY}`,
  secret: `${process.env.NEXT_PUBLIC_KIKIPAY_SECRET_KEY}`,
  sandbox: true
};

// Fonction pour initialiser un paiement avec Kikipay
// export async function initiateKikipayPayment(amount, phoneNumber) {
//   const kikipayUrl = 'https://api.kikipay.com/v1/transactions';
//   const kikipayOptions = {
//     method: 'POST',
//     headers: {
//       'Authorization': `Bearer ${process.env.NEXT_PUBLIC_KIKIPAY_PUBLIC_KEY}`,
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       amount,
//       currency: "XOF",
//       description: "Paiement pour inscription au cours",
//       callback_url: `${process.env.NEXT_PUBLIC_STRAPI_DOMAIN_URL}/callback`,
//       customer: {
//         phone_number: phoneNumber,
//       },
//     }),
//   };

//   try {
//     const response = await fetch(kikipayUrl, kikipayOptions);
//     if (!response.ok) {
//       throw new Error(`Error: ${response.statusText}`);
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error initiating Kikipay payment:', error);
//     throw error;
//   }
// }

export async function initiateKikipayPayment(amount, phoneNumber, customerData = {}) {
  try {
    // Nettoyer le montant (enlever le symbole €)
    const cleanAmount = parseFloat(amount.toString().replace('€', '').trim());
    
    // Configuration de base pour Kikipay
    const paymentData = {
      amount: cleanAmount,
      currency: 'XOF', // Franc CFA
      phone: phoneNumber,
      name: `${customerData.firstName || ''} ${customerData.lastName || ''}`.trim(),
      email: customerData.email || '',
      reason: `Inscription au cours - ${customerData.courseName || 'Formation'}`,
      sandbox: KIKIPAY_CONFIG.sandbox,
      api_key: KIKIPAY_CONFIG.publicKey
    };

    // Pour l'environnement sandbox, on simule une réponse
    if (KIKIPAY_CONFIG.sandbox) {
      console.log('Kikipay Payment Data (Sandbox):', paymentData);
      
      // Simulation d'une réponse de succès
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            transaction_id: `kikipay_test_${Date.now()}`,
            status: 'pending',
            payment_url: `https://widget.kkiapay.me/#/${KIKIPAY_CONFIG.publicKey}`,
            message: 'Paiement initié avec succès via Kikipay',
            paymentData: paymentData
          });
        }, 1000);
      });
    }

    // Pour la production, vous devrez implémenter l'appel API réel
    const kikipayUrl = 'https://api.kkiapay.me/api/v1/transactions';
    const kikipayOptions = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${KIKIPAY_CONFIG.privateKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: cleanAmount,
        currency: "XOF",
        description: `Inscription au cours - ${customerData.courseName || 'Formation'}`,
        callback_url: `${process.env.NEXT_PUBLIC_STRAPI_DOMAIN_URL}/callback`,
        customer: {
          phone_number: phoneNumber,
          firstname: customerData.firstName || '',
          lastname: customerData.lastName || '',
          email: customerData.email || ''
        },
      }),
    };

    const response = await fetch(kikipayUrl, kikipayOptions);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return {
      success: true,
      transaction_id: data.id,
      status: data.status,
      payment_url: data.payment_url,
      message: 'Paiement initié avec succès via Kikipay'
    };

  } catch (error) {
    console.error('Error initiating Kikipay payment:', error);
    throw new Error(`Échec du paiement Kikipay: ${error.message}`);
  }
}

/**
 * Ouvre le widget de paiement Kikipay
 * @param {object} paymentData - Données de paiement
 * @param {function} onSuccess - Callback en cas de succès
 * @param {function} onError - Callback en cas d'erreur
 */
export const openKikipayWidget = (paymentData, onSuccess, onError) => {
  // Chargement du SDK Kikipay si pas déjà chargé
  if (!window.kkiapay) {
    const script = document.createElement('script');
    script.src = 'https://cdn.kkiapay.me/k.js';
    script.onload = () => {
      initializeKikipayWidget(paymentData, onSuccess, onError);
    };
    script.onerror = () => {
      if (onError) onError('Erreur lors du chargement du SDK Kikipay');
    };
    document.head.appendChild(script);
  } else {
    initializeKikipayWidget(paymentData, onSuccess, onError);
  }
};

/**
 * Initialise le widget Kikipay
 * @param {object} paymentData - Données de paiement
 * @param {function} onSuccess - Callback en cas de succès
 * @param {function} onError - Callback en cas d'erreur
 */
const initializeKikipayWidget = (paymentData, onSuccess, onError) => {
  try {
    window.kkiapay.open({
      amount: paymentData.amount,
      api_key: KIKIPAY_CONFIG.publicKey,
      sandbox: KIKIPAY_CONFIG.sandbox,
      phone: paymentData.phone,
      name: paymentData.name,
      email: paymentData.email,
      reason: paymentData.reason,
      callback: (response) => {
        console.log('Kikipay Payment Response:', response);
        if (response.status === 'SUCCESS') {
          // Paiement réussi
          if (onSuccess) {
            onSuccess(response);
          } else {
            alert('Paiement réussi ! Votre inscription a été confirmée.');
            window.location.reload();
          }
        } else {
          // Paiement échoué
          if (onError) {
            onError('Le paiement a échoué');
          } else {
            alert('Le paiement a échoué. Veuillez réessayer.');
          }
        }
      }
    });
  } catch (error) {
    console.error('Erreur lors de l\'initialisation du widget Kikipay:', error);
    if (onError) onError('Erreur lors de l\'initialisation du paiement');
  }
};