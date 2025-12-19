
// const withBundleAnalyzer = nextBundleAnalyzer({
//     enabled: process.env.ANALYZE === 'true',
// });
// import nextBundleAnalyzer from '@next/bundle-analyzer';
/** @type {import('next').NextConfig} */
import withBundleAnalyzer from '@next/bundle-analyzer';

const nextConfig = {
    env: {
        NEXT_PUBLIC_STRAPI_API_URL: process.env.NEXT_PUBLIC_STRAPI_API_URL,

        NEXT_PUBLIC_STRAPI_API_TOKEN: process.env.NEXT_PUBLIC_STRAPI_API_TOKEN,

        NEXT_PUBLIC_STRAPI_DOMAIN_URL: process.env.NEXT_PUBLIC_STRAPI_DOMAIN_URL,
    },

    images: {

        dangerouslyAllowSVG: true,
        contentDispositionType: 'attachment',
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
        
        remotePatterns: [
            {
                protocol: process.env.IMAGE_PROTOCOL || "https",
                hostname: process.env.IMAGE_HOSTNAME || "cloudinary.com",
                port: process.env.IMAGE_PORT || "",
                pathname: process.env.IMAGE_PATHNAME || "/**",
            },
            {
                protocol: 'https',
                hostname: '*.media.strapiapp.com', // Autorise tous les sous-domaines de media.strapiapp.com
                port: '',
                pathname: '/**',
            },
        ],

        domains: (process.env.IMAGE_DOMAINS || "cloudinary.com").split(","),
    },

     // Optimisation générale
    compress: true,
    poweredByHeader: false,

    // Configuration des en-têtes de cache
    async headers() {
        return [
        // Assets Next.js (JS/CSS) - Cache très long avec immutable
        {
            source: '/_next/static/:all*',
            locale: false,
            headers: [
            {
                key: 'Cache-Control',
                value: 'public, max-age=31536000, s-maxage=31536000, immutable'
            }
            ]
        },
        
        // Images dans le dossier public/images - Cache long
        {
            source: "/images/(.*)", 
            headers: [
            {
                key: "Cache-Control",
                value: "public, max-age=31536000, s-maxage=31536000, immutable",
            },
            ],
        },
        
        // Polices - Cache long
        {
            source: '/fonts/:all*(woff|woff2|eot|ttf|otf)',
            locale: false,
            headers: [
            {
                key: 'Cache-Control',
                value: 'public, max-age=31536000, s-maxage=31536000, immutable'
            }
            ]
        },
        
        // Media assets - Cache long
        {
            source: '/media/:all*(svg|jpg|jpeg|png|webp|avif|mp4|webm|mov|avi)',
            locale: false,
            headers: [
            {
                key: 'Cache-Control',
                value: 'public, max-age=2592000, s-maxage=2592000' // 30 jours
            }
            ]
        },
        
        // Favicon et icônes racine
        {
            source: '/:all*(ico|png|svg)',
            locale: false,
            headers: [
            {
                key: 'Cache-Control',
                value: 'public, max-age=86400, s-maxage=86400' // 1 jour
            }
            ]
        },
        
        // API routes - Pas de cache par défaut
        {
            source: '/api/:path*',
            headers: [
            {
                key: 'Cache-Control',
                value: 'no-store, no-cache, must-revalidate'
            }
            ]
        },
        
        // Pages HTML - Cache avec revalidation
        {
            source: '/((?!api|_next|images|fonts|media).*)',
            headers: [
            {
                key: 'Cache-Control',
                value: 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400'
            }
            ]
        }
        ]
    },

    // Configuration pour les images optimisées
    experimental: {
        optimizeCss: true,
    }
};

// Enable the bundle analyzer if the ANALYZE environment variable is set to "true"
export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(nextConfig);; 
