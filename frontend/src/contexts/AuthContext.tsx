'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authAPI, User } from '@/lib/auth-api';
import { TokenManager } from '@/lib/token-manager';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize auth state on mount
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      const accessToken = TokenManager.getAccessToken();
      const refreshToken = TokenManager.getRefreshToken();

      if (!accessToken && !refreshToken) {
        setIsLoading(false);
        return;
      }

      // If we have a valid access token, fetch user data
      if (accessToken && TokenManager.hasValidAccessToken()) {
        const userData = await authAPI.getCurrentUser(accessToken);
        setUser(userData);
        setIsAuthenticated(true);
      } 
      // If access token is expired but we have refresh token, try to refresh
      else if (refreshToken) {
        try {
          const { access_token } = await authAPI.refreshToken(refreshToken);
          TokenManager.setAccessToken(access_token);
          
          const userData = await authAPI.getCurrentUser(access_token);
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          // Refresh failed, clear tokens
          TokenManager.clearTokens();
          setUser(null);
          setIsAuthenticated(false);
        }
      }
    } catch (error) {
      console.error('Auth initialization failed:', error);
      TokenManager.clearTokens();
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { access_token, refresh_token } = await authAPI.login({ email, password });
      
      // Store tokens
      TokenManager.setTokens(access_token, refresh_token);
      
      // Fetch user data
      const userData = await authAPI.getCurrentUser(access_token);
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      const userData = await authAPI.signup({ email, password });
      
      // After successful signup, automatically log the user in
      await login(email, password);
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const refreshToken = TokenManager.getRefreshToken();
      if (refreshToken) {
        await authAPI.logout(refreshToken);
      }
    } catch (error) {
      console.error('Logout API call failed:', error);
      // Continue with local logout even if API call fails
    } finally {
      TokenManager.clearTokens();
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const refreshAuth = async () => {
    const refreshToken = TokenManager.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const { access_token } = await authAPI.refreshToken(refreshToken);
      TokenManager.setAccessToken(access_token);
      
      const userData = await authAPI.getCurrentUser(access_token);
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      TokenManager.clearTokens();
      setUser(null);
      setIsAuthenticated(false);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    signup,
    logout,
    refreshAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
