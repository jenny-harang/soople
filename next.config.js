/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'api.ts'],
  eslint: {
    ignoreDuringBuilds: true,
  },
};
