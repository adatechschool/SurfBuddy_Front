# SurfBuddy Frontend 🏄‍♂️

**"Votre meilleur compagnon pour trouver des spots de surf incroyables !"**  
**"Your best buddy to help you find amazing surf spots!"**

---

## 🇫🇷 Version Française

SurfBuddy est une application React Native développée avec Expo qui permet aux utilisateurs de découvrir, répertorier et partager des spots de surf du monde entier. Ce projet a été développé dans le cadre du cursus de développement mobile à Ada Tech School, en se concentrant sur le développement d'applications mobiles fullstack avec un frontend React Native et un backend PHP Symfony.

### Fonctionnalités

- 🌊 **Liste des spots de surf** : Parcourez une liste complète de spots de surf dans le monde entier
- 🗺️ **Carte interactive mondiale** : Visualisez tous les spots de surf sur une carte interactive
- ➕ **Ajouter de nouveaux spots** : Contribuez en ajoutant de nouveaux spots de surf (authentification requise)
- 👤 **Profil utilisateur** : Gérez vos informations personnelles et préférences
- 🔐 **Authentification** : Système de connexion et d'inscription sécurisé
- 📱 **Multi-plateforme** : Fonctionne sur iOS et Android

### Pile technologique

- **React Native** avec **Expo** (~53.0.0)
- **TypeScript** (^5.8.3) pour la sécurité des types
- **Expo Router** (~5.0.0) pour la navigation basée sur les fichiers
- **React Navigation** avec Bottom Tabs pour la navigation par onglets
- **Axios** (^1.9.0) pour les appels API
- **Expo Location** pour les fonctionnalités de géolocalisation
- **Expo Image Picker** pour la gestion des photos
- **Airtable** intégration pour la gestion des données
- **PHP Symfony** backend (dépôt séparé)

### Captures d'écran et maquettes

#### Interface utilisateur et navigation
L'application comprend plusieurs écrans principaux organisés dans une navigation par onglets :

- **Accueil** : Écran principal avec la liste des spots et une barre de recherche
- **Détails** : Vue détaillée de chaque spot avec photos et informations
- **Profil** : Gestion du profil utilisateur avec photo et informations personnelles
- **Connexion** : Système d'authentification pour les utilisateurs
- **Ajout de spot** : Formulaire pour ajouter de nouveaux spots (utilisateurs connectés uniquement)

#### Base de données
Le schéma de base de données comprend deux tables principales :

**Table Users :**
- `id` (bigint) - Identifiant unique
- `alias` (varchar) - Nom d'utilisateur
- `email` (varchar) - Adresse email
- `password` (varchar) - Mot de passe chiffré
- `picture` (blob) - Photo de profil

**Table Spots :**
- `id` (bigint) - Identifiant unique
- `spot_name` (varchar) - Nom du spot
- `difficulty` (enum) - Niveau de difficulté
- `country` (varchar) - Pays
- `city` (varchar) - Ville
- `latitude` (float) - Coordonnée latitude
- `longitude` (float) - Coordonnée longitude
- `season_begin` (date) - Début de saison
- `season_end` (date) - Fin de saison
- `spot_picture` (blob) - Photo du spot
- `type` (enum) - Type de spot
- `users_id` (bigint) - Référence à l'utilisateur créateur

### Prérequis

Avant d'exécuter ce projet, assurez-vous d'avoir installé :

- **Node.js** (version 18.x ou supérieure recommandée)
- **npm** ou **yarn**
- **Expo CLI** : `npm install -g @expo/cli`
- **Git**

Pour le développement sur appareils physiques :
- Application **Expo Go** sur votre appareil mobile
- Ou **Android Studio** (pour l'émulateur Android)
- Ou **Xcode** (pour le simulateur iOS, macOS uniquement)

### Installation

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/votre-nom-utilisateur/surfbuddy-frontend.git
   cd surfbuddy_front
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configuration de l'environnement**
   
   Créez un fichier `.env` dans le répertoire racine et ajoutez l'URL de votre API backend :
   ```env
   API_BASE_URL=http://votre-backend-symfony-url.com/api
   # ou pour le développement local :
   API_BASE_URL=http://localhost:8000/api
   
   # Configuration Airtable (si vous utilisez l'intégration Airtable)
   AIRTABLE_BASE_ID=votre_base_id
   AIRTABLE_API_KEY=votre_cle_api
   ```

4. **Démarrer le serveur de développement**
   ```bash
   npm start
   # ou
   yarn start
   # ou
   npx expo start
   ```

5. **Exécuter sur appareil/émulateur**
   - Scannez le code QR avec l'application **Expo Go** (Android) ou l'application Appareil photo (iOS)
   - Appuyez sur `a` pour exécuter sur l'émulateur Android
   - Appuyez sur `i` pour exécuter sur le simulateur iOS

### Structure du projet

```
SurfBuddy_Front/
├── .expo/                    # Fichiers de configuration Expo
├── app/                      # Répertoire principal de l'application (Expo Router)
│   ├── components/           # Composants UI réutilisables
│   │   ├── addSpotScreen/    # Composants pour ajouter des spots
│   │   │   ├── AddSpotScreen.tsx
│   │   │   ├── ButtonAddSpot.tsx
│   │   │   ├── FormAddContentSpot.tsx
│   │   │   └── FormAddImageSpot.tsx
│   │   ├── commons/          # Composants UI communs
│   │   │   └── buttons/      # Composants de boutons
│   │   │       ├── ButtonDelete.tsx
│   │   │       ├── ButtonLoadImage.tsx
│   │   │       └── ButtonUpdate.tsx
│   │   ├── detailsScreen/    # Composants de détails des spots
│   │   │   ├── DetailsScreen.tsx
│   │   │   ├── DetailsSpotContent.tsx
│   │   │   ├── DetailsSpotImage.tsx
│   │   │   └── DetailsSpotMaps.tsx
│   │   ├── homeScreen/       # Composants de l'écran d'accueil
│   │   │   ├── SearchBar.tsx
│   │   │   ├── SpotCard.tsx
│   │   │   ├── SpotCardDetails.tsx
│   │   │   └── SpotCardImage.tsx
│   │   ├── loginScreen/      # Composants d'authentification
│   │   │   ├── FormContentProfile.tsx
│   │   │   └── FormImageProfile.tsx
│   │   └── profileScreen/    # Composants de l'écran de profil
│   │       ├── ProfileContent.tsx
│   │       ├── ProfileImage.tsx
│   │       └── ProfileScreen.tsx
│   ├── context/              # Fournisseurs de contexte React
│   │   └── AuthContext.tsx   # Contexte d'authentification
│   ├── models/               # Modèles de données
│   │   └── Spot.tsx          # Définition du modèle Spot
│   ├── types/                # Définitions de types TypeScript
│   │   └── Spot.ts           # Définitions des types Spot
│   ├── _layout.tsx           # Composant de mise en page racine
│   ├── index.tsx             # Écran d'accueil (entrée principale)
│   └── sign-in.tsx           # Écran d'authentification
├── assets/                   # Ressources statiques (images, polices, etc.)
├── styles/                   # Styles globaux
│   └── global.tsx            # Feuille de style globale
├── node_modules/             # Dépendances
├── .env                      # Variables d'environnement
├── .gitignore               # Fichier d'ignore Git
├── app.json                 # Configuration de l'application Expo
├── package.json             # Dépendances et scripts du projet
├── package-lock.json        # Fichier de verrouillage des dépendances
└── tsconfig.json            # Configuration TypeScript
```

### Intégration backend

Cette application frontend fonctionne en conjonction avec un **backend PHP Symfony** (dépôt séparé). Le backend fournit :

- Points de terminaison API RESTful pour la gestion des spots de surf
- Authentification et autorisation des utilisateurs
- Intégration de base de données MySQL
- Téléchargement et gestion d'images

Assurez-vous de :

1. Cloner et configurer le dépôt backend SurfBuddy
2. Configurer l'URL API correcte dans votre fichier `.env`
3. S'assurer que le serveur backend Symfony fonctionne avant de démarrer le frontend
4. Configurer correctement CORS dans votre backend Symfony

### Améliorations futures

Basé sur la feuille de route du projet, les fonctionnalités prévues incluent :

- **Opérations CRUD** : Fonctionnalité d'édition et de suppression de spots
- **Gestion des utilisateurs** : Modifier et supprimer les comptes utilisateur
- **Favoris et filtres** : Favoris personnels et options de filtrage avancées
- **Système de modération** : Modération de contenu pour les spots générés par les utilisateurs
- **Refactorisation du code** : Améliorer l'organisation et les performances du code
- **Services supplémentaires** : Services backend et frontend améliorés
- **Intégration météo** : Conditions météorologiques en temps réel pour les spots de surf
- **Accès aux webcams** : Flux de webcams en direct depuis les spots de surf populaires
- **Déploiement en production** : Configuration complète du pipeline de déploiement

---

## 🇬🇧 English Version

SurfBuddy is a React Native application built with Expo that allows users to discover, list, and share surf spots around the world. This project was developed as part of the mobile development curriculum at Ada Tech School, focusing on fullstack mobile application development with React Native frontend and PHP Symfony backend.

### Features

- 🌊 **Surf Spots Listing**: Browse a comprehensive list of surf spots worldwide
- 🗺️ **Interactive World Map**: Visualize all surf spots on an interactive map
- ➕ **Add New Spots**: Contribute by adding new surf spots (requires authentication)
- 👤 **User Profile**: Manage personal information and preferences
- 🔐 **Authentication**: Secure login and registration system
- 📱 **Cross-Platform**: Works on both iOS and Android devices

### Tech Stack

- **React Native** with **Expo** (~53.0.0)
- **TypeScript** (^5.8.3) for type safety
- **Expo Router** (~5.0.0) for file-based navigation
- **React Navigation** with Bottom Tabs for tab navigation
- **Axios** (^1.9.0) for API calls
- **Expo Location** for geolocation features
- **Expo Image Picker** for photo handling
- **Airtable** integration for data management
- **PHP Symfony** backend (separate repository)

### Screenshots and Mockups

#### User Interface and Navigation
The application includes several main screens organized in a tab navigation:

- **Home (Accueil)**: Main screen with spots listing and search bar
- **Details**: Detailed view of each spot with photos and information
- **Profile (Profil)**: User profile management with photo and personal information
- **Login (Connexion)**: Authentication system for users
- **Add Spot (Ajout Spot)**: Form to add new spots (authenticated users only)

#### Database Schema
The database schema includes two main tables:

**Users Table:**
- `id` (bigint) - Unique identifier
- `alias` (varchar) - Username
- `email` (varchar) - Email address
- `password` (varchar) - Encrypted password
- `picture` (blob) - Profile picture

**Spots Table:**
- `id` (bigint) - Unique identifier
- `spot_name` (varchar) - Spot name
- `difficulty` (enum) - Difficulty level
- `country` (varchar) - Country
- `city` (varchar) - City
- `latitude` (float) - Latitude coordinate
- `longitude` (float) - Longitude coordinate
- `season_begin` (date) - Season start
- `season_end` (date) - Season end
- `spot_picture` (blob) - Spot photo
- `type` (enum) - Spot type
- `users_id` (bigint) - Reference to creator user

### Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 18.x or higher recommended)
- **npm** or **yarn**
- **Expo CLI**: `npm install -g @expo/cli`
- **Git**

For development on physical devices:
- **Expo Go** app on your mobile device
- Or **Android Studio** (for Android emulator)
- Or **Xcode** (for iOS simulator, macOS only)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/surfbuddy-frontend.git
   cd surfbuddy_front
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the root directory and add your backend API URL:
   ```env
   API_BASE_URL=http://your-symfony-backend-url.com/api
   # or for local development:
   API_BASE_URL=http://localhost:8000/api
   
   # Airtable configuration (if using Airtable integration)
   AIRTABLE_BASE_ID=your_base_id
   AIRTABLE_API_KEY=your_api_key
   ```

4. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   # or
   npx expo start
   ```

5. **Run on device/emulator**
   - Scan the QR code with **Expo Go** app (Android) or Camera app (iOS)
   - Press `a` to run on Android emulator
   - Press `i` to run on iOS simulator

### Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm run web` - Run in web browser (if web support is enabled)

### Backend Integration

This frontend application works in conjunction with a **PHP Symfony backend** (separate repository). The backend provides:

- RESTful API endpoints for surf spots management
- User authentication and authorization
- MySQL database integration
- Image upload and management

Make sure to:

1. Clone and set up the SurfBuddy backend repository
2. Configure the correct API URL in your `.env` file
3. Ensure the Symfony backend server is running before starting the frontend
4. Set up proper CORS configuration in your Symfony backend

### Development Context

This project was developed as part of the **Mobile Development curriculum at Ada Tech School**. The project focuses on:

- Fullstack mobile application development
- React Native and Expo ecosystem
- TypeScript integration
- API consumption and data management
- Mobile UI/UX best practices
- Authentication flow implementation

### Future Enhancements

Based on the project roadmap, planned features include:

- **CRUD Operations**: Edit and delete spots functionality
- **User Management**: Modify and delete user accounts
- **Favorites & Filters**: Personal favorites and advanced filtering options
- **Moderation System**: Content moderation for user-generated spots
- **Code Refactoring**: Improve code organization and performance
- **Additional Services**: Enhanced backend and frontend services
- **Weather Integration**: Real-time weather conditions for surf spots
- **Webcam Access**: Live webcam feeds from popular surf locations
- **Production Deployment**: Full deployment pipeline setup

### Contributing

This project was developed as part of Ada Tech School's curriculum. If you'd like to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Troubleshooting

#### Common Issues

**Metro bundler issues:**
```bash
npx expo start --clear
```

**Node modules conflicts:**
```bash
rm -rf node_modules
npm install
```

**iOS simulator not starting:**
- Make sure Xcode is installed and updated
- Check that iOS simulator is available

**Android emulator issues:**
- Ensure Android Studio is properly configured
- Check that an Android Virtual Device is created

### About Ada Tech School

This project was developed as part of the mobile development curriculum at [Ada Tech School](https://adatechschool.fr/), a coding school focused on inclusive and collaborative learning.

### License

This project is opensouce.

### Acknowledgments

- **Ada Tech School** for the project framework and guidance
- The **surfing community** for inspiration and domain knowledge
- **Expo team** for the excellent development platform
- Built with ❤️ by students passionate about both technology and surfing

---

**Happy Surfing! 🏄‍♂️🌊**

*"Votre meilleur compagnon pour trouver des spots de surf incroyables !"*  
*"Your best buddy to help you find amazing surf spots!"*