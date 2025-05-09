import { createContext, useContext, useState, useEffect, type PropsWithChildren } from 'react';
import { useStorageState } from '../../useStorageState';

// Définir le type pour un utilisateur (ajustez selon vos besoins)
type User = {
  id: string;
  name: string;
  email: string;
  // Ajoutez d'autres propriétés selon vos besoins
};

// Type pour le contexte d'authentification
type AuthContextType = {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean; // Ajout de la propriété isAuthenticated
};

// Création du contexte avec des valeurs par défaut
const AuthContext = createContext<AuthContextType>({
  signIn: async () => {},
  signOut: () => {},
  setUser: () => {},
  user: null,
  isLoading: true,
  isAuthenticated: false, // Valeur par défaut
});

// Hook pour utiliser le contexte d'authentification
export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  return value;
}

// Provider du contexte d'authentification
export function AuthProvider({ children }: PropsWithChildren) {
  const [[isLoading, storedUser], setStoredUser] = useStorageState('user');
  const [user, setUser] = useState<User | null>(storedUser ? JSON.parse(storedUser) : null);
  
  // Calculer isAuthenticated en fonction de la présence d'un utilisateur
  const isAuthenticated = user !== null;

  // Mise à jour du state local quand le storage change
  useEffect(() => {
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, [storedUser]);

  // Fonction de connexion
  const signIn = async (email: string, password: string) => {
    // Ici, implémentez votre logique d'authentification réelle
    // Par exemple, appel API, vérification des identifiants, etc.
    
    // Pour cet exemple, on simule une authentification réussie
    const userData: User = {
      id: '123',
      name: 'Utilisateur Test',
      email: email,
    };
    
    // Stockage de l'utilisateur
    setStoredUser(JSON.stringify(userData));
    setUser(userData); // Mettre à jour l'état local
  };

  // Fonction de déconnexion
  const signOut = () => {
    setStoredUser(null);
    setUser(null); // Mettre l'utilisateur à null lors de la déconnexion
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut, user, isLoading, setUser, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}