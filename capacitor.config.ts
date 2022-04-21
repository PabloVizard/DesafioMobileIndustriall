import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'DesafioIndustriall',
  webDir: 'www',
  bundledWebRuntime: false,
  server: {
	  hostname: "localhost:3000",
		androidScheme: "https"
	}
};

export default config;
