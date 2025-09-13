/** @type {import('next').NextConfig} */

const mobileConfig = {
  output: 'export',
  // For a static export, we must disable image optimization.
  images: {
      unoptimized: true,
  },
  // Exclude server-side code from the static export by aliasing them to false.
  // This tells Webpack to treat these imports as empty modules on the client-side.
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        // These are server-side only and should not be in the mobile build
        'node-ical': false,
        'firebase-admin': false,
      };
    }
    
    // This is an additional rule to ensure the /api directory and other server files are ignored.
     config.module.rules.push({
      test: /(\/app\/api\/|sync-calendars\.ts|services\/discord\.ts|services\/calendar\.ts)/,
      loader: 'ignore-loader',
    });
    
    return config;
  },
};

module.exports = mobileConfig;
