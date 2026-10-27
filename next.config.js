/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@neondatabase/serverless'],
  },
  images: {
    domains: ['images.unsplash.com', 'res.cloudinary.com'],
  },
  async rewrites() {
    return {
      beforeFiles: [
        // Cheka Kalahari Domes: its own domain (any host starting with "cheka" or "www.cheka") shows the Cheka site.
        { source: '/', has: [{ type: 'host', value: '(?:www\\.)?cheka.*' }], destination: '/cheka/index.html' },
        { source: '/cheka', destination: '/cheka/index.html' },
      ],
    };
  },
}

module.exports = nextConfig
