'use client';

import { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { AuthContextType, User } from '../interface';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(Cookies.get('access_token') || null);
  const [user, setUser] = useState<User | any>(token ? jwtDecode<User>(token) : null);

  useEffect(() => {
    if (token) {
      try {
        const decodedUser = jwtDecode<User>(token);
        setUser(decodedUser);
      } catch (error) {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      Cookies.set('access_token', token, {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        expires: 7,
      });
    } else {
      Cookies.remove('access_token');
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, user, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
