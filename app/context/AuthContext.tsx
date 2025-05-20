// context/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Type d'utilisateur
type User = {
  id: string;
  email: string;
  alias?: string;
  name?: string;
  // Ajoutez d'autres propriétés selon vos besoins
};

// Type pour le contexte d'authentification 
type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
  isLoading: boolean;
};

// Création du contexte avec une valeur par défaut
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  isLoading: false,
});

// Hook pour utiliser le contexte
export const useAuth = () => {
  return useContext(AuthContext);
};

// Type pour les props du provider
type AuthProviderProps = {
  children: ReactNode;
};

// Provider d'authentification
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fonction de connexion
  const login = (userData: User) => {
    setUser(userData);
  };

  // Fonction de déconnexion
  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};