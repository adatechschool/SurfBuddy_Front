export interface FormLoginData {
    email: string;
    password: string;
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
    // Autres propriétés selon vos besoins
  }
  
  export interface AuthContextType {
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => void;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean; // Ajout de la propriété isAuthenticated
  }