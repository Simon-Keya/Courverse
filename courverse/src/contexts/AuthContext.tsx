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
  updateProfile: (displayName: string) => Promise<void>;
  logout: () => Promise<void>; // Add the logout function
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined); // Export AuthContext

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

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: FirebaseUser | null) => {
      if (user) {
        setCurrentUser({
          id: user.uid,
          email: user.email || '',
          displayName: user.displayName || '',
        });
      } else {
        setCurrentUser(null);
      }
    });

    // Cleanup subscription on unmount
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

  const updateProfile = async (displayName: string) => {
    if (auth.currentUser) {
      await auth.currentUser.updateProfile({
        displayName: displayName,
      });
      setCurrentUser({
        ...currentUser!,
        displayName: displayName,
      });
    }
  };

  const logout = async () => { // Implement logout function
    await auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, register, resetPassword, updateProfile, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
