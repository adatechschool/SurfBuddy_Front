export interface FormLoginData {
    email: string;
    password: string;
  }
  
  export interface AuthContextType {
    isAuthenticated: boolean;
    user: any | null;
    setUser: React.Dispatch<React.SetStateAction<any | null>>;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    // Autres méthodes d'authentification si nécessaire
  }