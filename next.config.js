/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,                     // 🔥 BẮT BUỘC CHO APP ROUTER
    optimizePackageImports: [],
  },
};

module.exports = nextConfig;
