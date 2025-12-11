import "dotenv/config";

export default {
  expo: {
    name: "BudgetMate",
    slug: "budgetmate",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "budgetmate",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.budgetmate.app",
    },
    android: {
      package: "com.budgetmate.app",
      versionCode: 1,
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        foregroundImage: "./assets/images/android-icon-foreground.png",
        backgroundImage: "./assets/images/android-icon-background.png",
        monochromeImage: "./assets/images/android-icon-monochrome.png",
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
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
      "expo-font",
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
    extra: {
      eas: {
        projectId: "9829e17f-b295-4358-996f-2ed270952a25"
      },
      WEB_API_URL: process.env.WEB_API_URL,
      IOS_API_URL: process.env.IOS_API_URL,
      ANDROID_API_URL: process.env.ANDROID_API_URL,
      DEFAULT_API_URL: process.env.DEFAULT_API_URL,
    },
  },
};
