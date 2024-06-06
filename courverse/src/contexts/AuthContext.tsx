import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../services/firebase'; // Assume you have Firebase setup
import { login, register, resetPassword } from '../services/authService';

interface User {
  id: string;
  email: string;
  displayName: string;
}

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleAuthStateChange = () => {
    auth.onAuthStateChanged((user) => {
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
  };

  useEffect(() => {
    handleAuthStateChange();
    // Cleanup function
    return () => handleAuthStateChange();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, login, register, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

