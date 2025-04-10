import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.purplecamera',
  appName: 'Purple Camera',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    Camera: {
      promptBeforeEnablingPermission: true
    }
  }
};

export default config;