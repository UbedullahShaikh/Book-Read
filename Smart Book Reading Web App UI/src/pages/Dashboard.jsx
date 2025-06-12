import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import PageLayout from '../components/layout/PageLayout';
import UserWelcome from '../components/dashboard/UserWelcome';
import QuickActions from '../components/dashboard/QuickActions';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function Dashboard() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return null; // ProtectedRoute will handle redirect
  }

  return (
    <PageLayout showFooter={false}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <UserWelcome user={user} />
        <QuickActions />
      </div>
    </PageLayout>
  );
}
