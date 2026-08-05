/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'flowercorner.vn',
      },
      {
        protocol: 'https',
        hostname: 'in.flowercorner.vn',
      },
      {
        protocol: 'https',
        hostname: 'api.qrserver.com',
      }
    ],
  },
}

module.exports = nextConfig
