import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
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
  // Exclude the api directory from the build for static export
  webpack: (config, { isServer }) => {
    if (!isServer) {
        config.resolve.alias = {
            ...config.resolve.alias,
            '@/app/api': false
        };
    }
    config.module.rules.push({
        test: /\/api\//,
        loader: 'ignore-loader',
    });

    return config;
  },
};

export default nextConfig;