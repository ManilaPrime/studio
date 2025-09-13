/** @type {import('next').NextConfig} */

const isMobile = process.env.BUILD_TARGET === 'mobile';

const nextConfig = {
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
  // Apply mobile-specific settings
  ...(isMobile && {
    output: 'export',
    webpack: (config) => {
      config.module.rules.push({
        test: /\/app\/api\//,
        loader: 'ignore-loader',
      });
      return config;
    },
  }),
};

module.exports = nextConfig;
