// lib/strapi.js
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
// En développement: http://localhost:1337
// En production: https://happyscience-7c38f3ffe9.strapi.cloud

const API_TOKEN = process.env.STRAPI_API_TOKEN;

export async function fetchFromStrapi(endpoint) {
  const response = await fetch(`${STRAPI_URL}/api${endpoint}`, {
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}