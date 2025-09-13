/** @type {import('next').NextConfig} */

const mobileConfig = {
  output: 'export',
  webpack: (config) => {
    config.module.rules.push({
      test: /\/app\/api\//,
      loader: 'ignore-loader',
    });
    return config;
  },
};

let nextConfig = {
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
  nextConfig = { ...nextConfig, ...mobileConfig };
}

module.exports = nextConfig;
