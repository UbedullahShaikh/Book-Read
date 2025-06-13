import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

// Dummy users for development
const dummyUsers = [
  {
    uid: 'dummy-user-1',
    email: 'test@example.com',
    password: '123456',
    name: 'Test User',
    bio: 'Test user for development',
    preferences: {
      theme: 'auto',
      fontSize: 16,
      fontFamily: 'serif',
      readingMode: 'continuous'
    },
    favorites: [],
    recentBooks: [],
    completedBooks: [],
    inProgressBooks: [],
    readingStreak: {
      count: 0,
      lastReadAt: null,
      longestStreak: 0
    },
    stats: {
      totalBooksCompleted: 0,
      totalMinutesRead: 0,
      totalHighlights: 0,
      totalChats: 0,
      averageReadingSpeed: 0,
      totalPagesRead: 0
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    uid: 'dummy-user-2',
    email: 'admin@smartbook.com',
    password: 'admin123',
    name: 'Admin User',
    bio: 'Administrator of SmartBook platform',
    preferences: {
      theme: 'dark',
      fontSize: 18,
      fontFamily: 'sans-serif',
      readingMode: 'continuous'
    },
    favorites: [],
    recentBooks: [],
    completedBooks: [],
    inProgressBooks: [],
    readingStreak: {
      count: 15,
      lastReadAt: new Date(),
      longestStreak: 30
    },
    stats: {
      totalBooksCompleted: 25,
      totalMinutesRead: 1800,
      totalHighlights: 150,
      totalChats: 45,
      averageReadingSpeed: 200,
      totalPagesRead: 5000
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    uid: 'dummy-user-3',
    email: 'reader@example.com',
    password: 'reader123',
    name: 'Book Reader',
    bio: 'Passionate reader who loves fiction and non-fiction',
    preferences: {
      theme: 'light',
      fontSize: 16,
      fontFamily: 'serif',
      readingMode: 'continuous'
    },
    favorites: ['book-1', 'book-2', 'book-3'],
    recentBooks: ['book-1', 'book-4'],
    completedBooks: ['book-2', 'book-3'],
    inProgressBooks: ['book-1'],
    readingStreak: {
      count: 7,
      lastReadAt: new Date(),
      longestStreak: 21
    },
    stats: {
      totalBooksCompleted: 12,
      totalMinutesRead: 960,
      totalHighlights: 89,
      totalChats: 23,
      averageReadingSpeed: 180,
      totalPagesRead: 2400
    },
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Get users from localStorage or use default
  const getUsers = useCallback(() => {
    const storedUsers = localStorage.getItem('smartbook_users');
    if (storedUsers) {
      return JSON.parse(storedUsers);
    }
    // Initialize with dummy users
    localStorage.setItem('smartbook_users', JSON.stringify(dummyUsers));
    return dummyUsers;
  }, []);

  // Clear all data and reset to dummy data
  const resetToDummyData = useCallback(() => {
    localStorage.removeItem('smartbook_users');
    localStorage.removeItem('smartbook_current_user');
    localStorage.removeItem('smartbook_current_user_data');
    localStorage.setItem('smartbook_users', JSON.stringify(dummyUsers));
  }, []);

  // Save users to localStorage
  const saveUsers = useCallback((users) => {
    localStorage.setItem('smartbook_users', JSON.stringify(users));
  }, []);

  // Simple email/password authentication
  const signInWithEmail = useCallback(async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const users = getUsers();
      const foundUser = users.find(u => u.email === email && u.password === password);
      
      if (foundUser) {
        const userObj = {
          uid: foundUser.uid,
          email: foundUser.email,
          displayName: foundUser.name
        };
        setUser(userObj);
        setUserData(foundUser);
        localStorage.setItem('smartbook_current_user', JSON.stringify(userObj));
        localStorage.setItem('smartbook_current_user_data', JSON.stringify(foundUser));
        navigate('/dashboard');
        return userObj;
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      console.error('Sign in error:', error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [navigate, getUsers]);

  // Simple email/password signup
  const signUpWithEmail = useCallback(async (email, password, userProfile) => {
    try {
      setLoading(true);
      setError(null);
      
      const users = getUsers();
      
      // Check if user already exists
      const existingUser = users.find(u => u.email === email);
      if (existingUser) {
        throw new Error('An account with this email already exists.');
      }

      // Create new user
      const newUser = {
        uid: `user-${Date.now()}`,
        email: email,
        password: password, // In real app, this would be hashed
        name: userProfile.name,
        bio: userProfile.bio || '',
        preferences: userProfile.readingPreferences || {
          theme: 'auto',
          fontSize: 16,
          fontFamily: 'serif',
          readingMode: 'continuous'
        },
        favorites: [],
        recentBooks: [],
        completedBooks: [],
        inProgressBooks: [],
        readingStreak: {
          count: 0,
          lastReadAt: null,
          longestStreak: 0
        },
        stats: {
          totalBooksCompleted: 0,
          totalMinutesRead: 0,
          totalHighlights: 0,
          totalChats: 0,
          averageReadingSpeed: 0,
          totalPagesRead: 0
        },
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // Add to users array
      users.push(newUser);
      saveUsers(users);
      
      const userObj = {
        uid: newUser.uid,
        email: newUser.email,
        displayName: newUser.name
      };
      
      setUser(userObj);
      setUserData(newUser);
      localStorage.setItem('smartbook_current_user', JSON.stringify(userObj));
      localStorage.setItem('smartbook_current_user_data', JSON.stringify(newUser));
      navigate('/dashboard');
      return userObj;
    } catch (error) {
      console.error('Sign up error:', error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [navigate, getUsers, saveUsers]);

  // Update user data
  const updateUserData = useCallback(async (updates) => {
    if (!user) return;
    
    try {
      const users = getUsers();
      const userIndex = users.findIndex(u => u.uid === user.uid);
      
      if (userIndex !== -1) {
        users[userIndex] = {
          ...users[userIndex],
          ...updates,
          updatedAt: new Date()
        };
        saveUsers(users);
        
        const updatedData = { ...userData, ...updates, updatedAt: new Date() };
        setUserData(updatedData);
        localStorage.setItem('smartbook_current_user_data', JSON.stringify(updatedData));
      }
    } catch (error) {
      console.error('Error updating user data:', error);
      throw error;
    }
  }, [user, userData, getUsers, saveUsers]);

  // Logout
  const logout = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      setUser(null);
      setUserData(null);
      localStorage.removeItem('smartbook_current_user');
      localStorage.removeItem('smartbook_current_user_data');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // Check for existing user on app load
  useEffect(() => {
    const currentUser = localStorage.getItem('smartbook_current_user');
    const currentUserData = localStorage.getItem('smartbook_current_user_data');
    
    if (currentUser && currentUserData) {
      setUser(JSON.parse(currentUser));
      setUserData(JSON.parse(currentUserData));
    }
    
    setLoading(false);
  }, []);

  const value = {
    user,
    userData,
    loading,
    error,
    signInWithEmail,
    signUpWithEmail,
    updateUserData,
    logout,
    resetToDummyData
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