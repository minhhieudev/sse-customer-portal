/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: false, // Set to true if you want to ignore ESLint errors during build
  },
  experimental: {
    optimizePackageImports: [],
    scrollRestoration: false,         // Disable scroll restoration for manual control
  },
};

module.exports = nextConfig;
