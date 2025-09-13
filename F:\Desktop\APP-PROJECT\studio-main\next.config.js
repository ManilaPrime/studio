/** @type {import('next').NextConfig} */
let nextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

if (process.env.BUILD_TARGET === 'mobile') {
  const mobileConfig = require('./next.config.mobile.ts').default;
  nextConfig = { ...nextConfig, ...mobileConfig };
}

module.exports = nextConfig;
