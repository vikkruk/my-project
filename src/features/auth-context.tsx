import React, { createContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthService, { AuthPromise } from './auth-service';
import useLocalStorage from '../hooks/use-local-storage';

import { Credentials, UserRegistration, User } from '../types';
import pause from '../helpers/pause';

export type AuthContextType = {
  user: null | User,
  loggedIn: boolean,
  error: string | null,
  loading: boolean,
  clearError: VoidFunction,
  login: (credentials: Credentials, next: string) => void,
  register:(credentials: UserRegistration, next?:string) => void,
  logout: VoidFunction,
};

const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider: React.FC = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<AuthContextType['loading']>(false);
  const [error, setError] = useState<AuthContextType['error']>(null);
  const [user, setUser] = useLocalStorage<AuthContextType['user']>('user', null);

  const clearError: AuthContextType['clearError'] = () => {
    setError(null);
  };

  const authenticate = async (credentials: Credentials, next: string, authMethod: AuthPromise): Promise<void> => {
    try {
      setLoading(true);
      await pause(500);
      const loggedInUser = await authMethod(credentials);
      setUser(loggedInUser);
      clearError();
      navigate(next);
    } catch (err) {
      const { message } = err as Error;
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const login: AuthContextType['login'] = async (credentials: Credentials, next: string) => {
    authenticate(credentials, next, AuthService.login);
  };

  const register: AuthContextType['register'] = async (credentials, next = '/actors') => {
    authenticate(credentials, next, AuthService.register);
  };

  const logout: AuthContextType['logout'] = () => {
    setUser(null);
    navigate('/auth/login');
  };

  const values = useMemo(() => ({
    user,
    loggedIn: Boolean(user),
    error,
    loading,
    clearError,
    login,
    register,
    logout,

  }), [user, error, loading]);

  return (
    <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
