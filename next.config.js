/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@neondatabase/serverless'],
  },
  images: {
    domains: ['images.unsplash.com', 'res.cloudinary.com'],
  },
}

module.exports = nextConfig
