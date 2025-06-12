import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../auth/firebase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      setError(null);
    }, (error) => {
      console.error('Auth state error:', error);
      setUser(null);
      setLoading(false);
      setError(error.message);
    });
    
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await signInWithPopup(auth, provider);
      navigate('/dashboard');
      return result;
    } catch (error) {
      console.error('Sign in error:', error);
      setError(error.message);
      alert('Sign in failed. Please try again.');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const value = {
    user,
    loading,
    error,
    signInWithGoogle,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 