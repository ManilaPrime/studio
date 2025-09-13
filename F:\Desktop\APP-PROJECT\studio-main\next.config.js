/** @type {import('next').NextConfig} */
const isMobileBuild = process.env.BUILD_TARGET === 'mobile';

const nextConfig = {
  output: isMobileBuild ? 'export' : undefined,
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
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
    unoptimized: true
  },
  webpack: (config) => {
    if (isMobileBuild) {
      // Ignore all API routes and server-side files in mobile build
      config.module.rules.push({
        test: /(\/app\/api\/|sync-calendars\.ts|services\/discord\.ts|services\/calendar\.ts)/,
        loader: 'ignore-loader',
      });

      // Prevent server-only packages from being bundled
      config.resolve.alias['node-ical'] = false;
      config.resolve.alias['firebase-admin'] = false;
      config.resolve.alias['firebase-functions'] = false;
    }
    return config;
  },
};

module.exports = nextConfig;
