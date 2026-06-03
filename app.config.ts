import type { ExpoConfig } from "expo/config";

type AppVariant = "development" | "preview" | "production";

const APP_VARIANT =
  (process.env.APP_VARIANT as AppVariant | undefined) ?? "production";

const variantConfig: Record<
  AppVariant,
  {
    name: string;
    scheme: string;
    iosBundleId: string;
    androidPackage: string;
  }
> = {
  development: {
    name: "jpvideo (Dev)",
    scheme: "jpvideo-dev",
    iosBundleId: "com.15158314786.jpvideo.dev",
    androidPackage: "com.x15158314786.jpvideo.dev",
  },
  preview: {
    name: "jpvideo (Preview)",
    scheme: "jpvideo-preview",
    iosBundleId: "com.15158314786.jpvideo.preview",
    androidPackage: "com.x15158314786.jpvideo.preview",
  },
  production: {
    name: "jpvideo",
    scheme: "jpvideo",
    iosBundleId: "com.15158314786.jpvideo",
    androidPackage: "com.x15158314786.jpvideo",
  },
};

const selected = variantConfig[APP_VARIANT] ?? variantConfig.production;

const config: ExpoConfig = {
  name: selected.name,
  slug: "jpvideo",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: selected.scheme,
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    bundleIdentifier: selected.iosBundleId,
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
  },
  android: {
    adaptiveIcon: {
      backgroundColor: "#E6F4FE",
      foregroundImage: "./assets/images/android-icon-foreground.png",
      backgroundImage: "./assets/images/android-icon-background.png",
      monochromeImage: "./assets/images/android-icon-monochrome.png",
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
    package: selected.androidPackage,
  },
  web: {
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff",
        dark: {
          backgroundColor: "#000000",
        },
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
  extra: {
    router: {},
    eas: {
      projectId: "74328e2f-7c9a-490f-a2a6-2503239e5a00",
    },
  },
};

export default config;
