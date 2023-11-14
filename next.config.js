/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    sassOptions: {
    },
    images: {
      // domains: [process.env.DOMAIN]
      remotePatterns: [{
        protocol: process.env.NODE_ENV === 'production' ? 'https' : 'http',
        hostname: process.env.DOMAIN
      }]
    }
}

module.exports = nextConfig
