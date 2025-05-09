# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

# Script pour installer expo-location 

npx expo install react-native-maps expo-location

# Script pour installer expo-router

npx expo install expo-router

# Obtenir des clés API Google Maps
   - Allez sur Google Cloud Console
   - Créez un nouveau projet ou sélectionnez un projet existant
   - Dans le menu de navigation, cliquez sur "APIs & Services" > "Library"
   - Recherchez et activez les APIs suivantes :
   - Maps SDK for iOS
   - Maps SDK for Android
   - 5. Allez dans "APIs & Services" > "Credentials"
   - 6. Cliquez sur "Create credentials" > "API key"
   - Vous obtiendrez une clé API. Pour plus de sécurité, vous devriez restreindre cette clé :
   - Cliquez sur "Restrict key"
   - Sous "Application restrictions", sélectionnez "Android apps" ou "iOS apps" selon la plateforme
   - Ajoutez les restrictions appropriées (package name, SHA-1, etc.)

