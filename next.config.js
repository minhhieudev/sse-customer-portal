/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: [],
    scrollRestoration: false,         // Disable scroll restoration for manual control
  },
};

module.exports = nextConfig;
