import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'client',
  webDir: 'build',
  "server": {
    "url": "http://192.168.1.77:3000",  // Use your machine's IP address
    "cleartext": true
  }
};

export default config;
