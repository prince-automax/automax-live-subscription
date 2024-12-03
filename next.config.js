/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    trailingSlash: true,
    env: {
        BASE_URL: "https://api-dev.autobse.com",
        API_URL: "https://api-dev.autobse.com/graphql",
    //    BASE_URL: "https://api.autobse.com",
    //    API_URL: "https://api.autobse.com/api/graphql",
     },
    images: {
        domains: [
            "chnimgs3bkt.s3.ap-south-1.amazonaws.com",
            "api.autobse.com",
            "photos.google.com",
            "firebasestorage.googleapis.com",
            "api-dev.autobse.com",
            "ops.adroitauto.in",
            "autobseimagesandexcel-dev.s3.ap-south-1.amazonaws.com",
            "aiv2client.autoinspekt.com"
        ],
        minimumCacheTTL: 60, // Cache time in seconds (default is 60)

    },
};

module.exports = nextConfig;