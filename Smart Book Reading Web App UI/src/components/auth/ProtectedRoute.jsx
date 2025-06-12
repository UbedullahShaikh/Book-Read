import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../common/LoadingSpinner';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // Show loading only on initial app load
  if (loading) {
    return <LoadingSpinner />;
  }

  // Redirect to home if not authenticated
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
} 