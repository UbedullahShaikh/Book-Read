import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

// Backend API base URL
const API_BASE_URL = 'http://localhost:3000/api';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Check if user is already logged in on app start
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('smartbook_token');
        const storedUser = localStorage.getItem('smartbook_current_user');
        const storedUserData = localStorage.getItem('smartbook_current_user_data');
        
        if (token && storedUser && storedUserData) {
          // Verify token with backend
          const response = await fetch(`${API_BASE_URL}/auth/me`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          
          if (response.ok) {
            const data = await response.json();
            setUser(JSON.parse(storedUser));
            setUserData(data.data.user);
          } else {
            // Token is invalid, clear storage
            localStorage.removeItem('smartbook_token');
            localStorage.removeItem('smartbook_current_user');
            localStorage.removeItem('smartbook_current_user_data');
          }
        }
      } catch (error) {
        console.error('Auth check error:', error);
        // Clear storage on error
        localStorage.removeItem('smartbook_token');
        localStorage.removeItem('smartbook_current_user');
        localStorage.removeItem('smartbook_current_user_data');
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Backend API login
  const signInWithEmail = useCallback(async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        const userObj = {
          uid: data.data.user._id,
          email: data.data.user.email,
          displayName: data.data.user.name
        };
        
        // Save token and user data
        localStorage.setItem('smartbook_token', data.data.token);
        localStorage.setItem('smartbook_current_user', JSON.stringify(userObj));
        localStorage.setItem('smartbook_current_user_data', JSON.stringify(data.data.user));
        
        setUser(userObj);
        setUserData(data.data.user);
        navigate('/dashboard');
        return userObj;
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Sign in error:', error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // Backend API signup
  const signUpWithEmail = useCallback(async (email, password, userProfile) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: userProfile.name,
          email: email,
          password: password
        })
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        const userObj = {
          uid: data.data.user._id,
          email: data.data.user.email,
          displayName: data.data.user.name
        };
        
        // Save token and user data
        localStorage.setItem('smartbook_token', data.data.token);
        localStorage.setItem('smartbook_current_user', JSON.stringify(userObj));
        localStorage.setItem('smartbook_current_user_data', JSON.stringify(data.data.user));
        
        setUser(userObj);
        setUserData(data.data.user);
        navigate('/dashboard');
        return userObj;
      } else {
        throw new Error(data.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Sign up error:', error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // Logout function
  const signOut = useCallback(async () => {
    try {
      const token = localStorage.getItem('smartbook_token');
      
      // Call logout endpoint
      if (token) {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear all data
      localStorage.removeItem('smartbook_token');
      localStorage.removeItem('smartbook_current_user');
      localStorage.removeItem('smartbook_current_user_data');
      
      setUser(null);
      setUserData(null);
      navigate('/login');
    }
  }, [navigate]);

  // Get user profile from backend
  const getUserProfile = useCallback(async () => {
    try {
      const token = localStorage.getItem('smartbook_token');
      
      if (!token) {
        throw new Error('No token found');
      }
      
      const response = await fetch(`${API_BASE_URL}/users/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        setUserData(data.data.user);
        localStorage.setItem('smartbook_current_user_data', JSON.stringify(data.data.user));
        return data.data.user;
      } else {
        throw new Error(data.message || 'Failed to fetch profile');
      }
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  }, []);

  // Update user profile
  const updateUserProfile = useCallback(async (profileData) => {
    try {
      const token = localStorage.getItem('smartbook_token');
      
      if (!token) {
        throw new Error('No token found');
      }
      
      const response = await fetch(`${API_BASE_URL}/users/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profileData)
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        setUserData(data.data.user);
        localStorage.setItem('smartbook_current_user_data', JSON.stringify(data.data.user));
        return data.data.user;
      } else {
        throw new Error(data.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }, []);

  // Get user reading statistics
  const getUserStats = useCallback(async () => {
    try {
      const token = localStorage.getItem('smartbook_token');
      
      if (!token) {
        throw new Error('No token found');
      }
      
      const response = await fetch(`${API_BASE_URL}/users/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        return data.data;
      } else {
        throw new Error(data.message || 'Failed to fetch stats');
      }
    } catch (error) {
      console.error('Get stats error:', error);
      throw error;
    }
  }, []);

  // Get user reading progress
  const getUserReadingProgress = useCallback(async () => {
    try {
      const token = localStorage.getItem('smartbook_token');
      
      if (!token) {
        throw new Error('No token found');
      }
      
      const response = await fetch(`${API_BASE_URL}/users/reading-progress`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        return data.data;
      } else {
        throw new Error(data.message || 'Failed to fetch reading progress');
      }
    } catch (error) {
      console.error('Get reading progress error:', error);
      throw error;
    }
  }, []);

  // Update reading progress
  const updateReadingProgress = useCallback(async (bookId, currentPage, totalPages) => {
    try {
      const token = localStorage.getItem('smartbook_token');
      
      if (!token) {
        throw new Error('No token found');
      }
      
      const response = await fetch(`${API_BASE_URL}/users/reading-progress/${bookId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ currentPage, totalPages })
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        // Refresh user data to get updated progress
        await getUserProfile();
        return data.data;
      } else {
        throw new Error(data.message || 'Failed to update reading progress');
      }
    } catch (error) {
      console.error('Update reading progress error:', error);
      throw error;
    }
  }, [getUserProfile]);

  // Mark book as completed
  const completeBook = useCallback(async (bookId) => {
    try {
      const token = localStorage.getItem('smartbook_token');
      
      if (!token) {
        throw new Error('No token found');
      }
      
      const response = await fetch(`${API_BASE_URL}/users/complete-book/${bookId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        // Refresh user data to get updated stats
        await getUserProfile();
        return data.data;
      } else {
        throw new Error(data.message || 'Failed to complete book');
      }
    } catch (error) {
      console.error('Complete book error:', error);
      throw error;
    }
  }, [getUserProfile]);

  const value = {
    user,
    userData,
    loading,
    error,
    signInWithEmail,
    signUpWithEmail,
    signOut,
    getUserProfile,
    updateUserProfile,
    getUserStats,
    getUserReadingProgress,
    updateReadingProgress,
    completeBook
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