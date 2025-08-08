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