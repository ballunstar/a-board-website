/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    config.resolve.fallback = { fs: false }
    config.resolve.alias.canvas = false
    return config
  },
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    domains: ['*']
  }
}

export default nextConfig
