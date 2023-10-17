/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    sassOptions: {
    },
    images: {
      domains: [process.env.DOMAIN]
    }
}

module.exports = nextConfig
