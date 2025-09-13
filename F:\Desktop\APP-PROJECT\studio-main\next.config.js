/** @type {import('next').NextConfig} */

let nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
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

// Check if the build target is for mobile (Capacitor)
if (process.env.BUILD_TARGET === 'mobile') {
  console.log('--- Applying mobile build configuration for static export ---');
  nextConfig = {
    ...nextConfig,
    output: 'export',
    // For a static export, we must disable image optimization.
    images: {
        ...nextConfig.images,
        unoptimized: true,
    },
    // Exclude server-side code from the static export by aliasing them to false.
    // This tells Webpack to treat these imports as empty modules on the client-side.
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.alias = {
          ...config.resolve.alias,
          '@/app/api': false,
          '@/app/actions/sync-calendars.ts': false,
          'node-ical': false,
        };
      }
      
      return config;
    },
  };
}

module.exports = nextConfig;
