/** @type {import('next').NextConfig} */

const isMobile = process.env.BUILD_TARGET === 'mobile';

const defaultConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co', pathname: '/**' },
      { protocol: 'https', hostname: 'picsum.photos', pathname: '/**' },
    ],
  },
};

const mobileConfig = {
  ...defaultConfig,
  output: 'export',
  // Exclude API routes from the mobile build by modifying page extensions.
  // This prevents Next.js from trying to process them during a static export.
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
};

module.exports = isMobile ? mobileConfig : defaultConfig;
