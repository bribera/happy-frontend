/** @type {import('next').NextConfig} */
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
        ],

        domains: (process.env.IMAGE_DOMAINS || "cloudinary.com").split(","),
    },
};

export default nextConfig;
