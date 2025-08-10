// This file is not used in the React Router setup
// Keeping as placeholder for potential future Next.js migration

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  experimental: {
    optimizeCss: true,
  },
}

module.exports = nextConfig