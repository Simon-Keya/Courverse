import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { auth } from '../services/firebase'; // Ensure your firebase.ts file is correctly set up
import { login as authLogin, register as authRegister, resetPassword as authResetPassword } from '../services/authService';

export interface User {
  id: string;
  email: string;
  displayName: string;
}

export interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

const mapFirebaseUserToUser = (user: FirebaseUser): User => ({
  id: user.uid,
  email: user.email || '',
  displayName: user.displayName || '',
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: FirebaseUser | null) => {
      if (user) {
        setCurrentUser(mapFirebaseUserToUser(user));
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    await authLogin(email, password);
  };

  const register = async (email: string, password: string, displayName: string) => {
    await authRegister(email, password, displayName);
  };

  const resetPassword = async (email: string) => {
    await authResetPassword(email);
  };

  const logout = async () => {
    await auth.signOut();
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, register, resetPassword, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
