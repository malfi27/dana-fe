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
  env: {
    APP_URL: 'http://localhost:3000',
    WHATSAPP_API_URL:
      'https://pty-greatest-size-functioning.trycloudflare.com/api/v1'
  }
}

export default nextConfig
