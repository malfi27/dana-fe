/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com'
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc'
      }
    ]
  },
  reactStrictMode: false,
  env: {
    APP_URL: 'http://localhost:3000',
    WHATSAPP_API_URL: 'https://pg-whatsapp.80y3rbfne.com/api',
    API_URL: 'http://localhost:4000/api',
    SECURE_INF: `1d4a8a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f`
  },
  experimental: {
    missingSuspenseWithCSRBailout: false
  }
}

export default nextConfig
