import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.manilaprime.app',
  appName: 'Manila Prime',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  }
};

export default config;
