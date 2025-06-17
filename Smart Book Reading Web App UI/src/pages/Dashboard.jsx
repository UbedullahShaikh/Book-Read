import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import PageLayout from '../components/layout/PageLayout';
import UserWelcome from '../components/dashboard/UserWelcome';
import QuickActions from '../components/dashboard/QuickActions';
import ReadingProgressCard from '../components/dashboard/ReadingProgressCard';
import RecentActivityCard from '../components/dashboard/RecentActivityCard';
import StatsCard from '../components/common/StatsCard';
import ErrorAlert from '../components/common/ErrorAlert';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { BookOpen, Clock, TrendingUp, BookMarked } from 'lucide-react';

export default function Dashboard() {
  const { user, loading: authLoading, getUserStats, getUserReadingProgress } = useAuth();
  const [stats, setStats] = useState(null);
  const [readingProgress, setReadingProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch user stats and reading progress in parallel
      const [statsData, progressData] = await Promise.all([
        getUserStats(),
        getUserReadingProgress()
      ]);
      
      setStats(statsData);
      setReadingProgress(progressData);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Failed to load user data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return null; // ProtectedRoute will handle redirect
  }

  if (loading) {
    return (
      <PageLayout showFooter={false}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <LoadingSpinner />
        </div>
      </PageLayout>
    );
  }

  const statsCards = [
    {
      title: 'Books Completed',
      value: stats?.stats.totalBooksCompleted || 0,
      icon: BookOpen,
      iconBgColor: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      title: 'Minutes Read',
      value: stats?.stats.totalMinutesRead || 0,
      icon: Clock,
      iconBgColor: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Reading Streak',
      value: `${stats?.readingStreak.count || 0} days`,
      icon: TrendingUp,
      iconBgColor: 'bg-orange-100',
      iconColor: 'text-orange-600'
    },
    {
      title: 'Pages Read',
      value: stats?.stats.totalPagesRead || 0,
      icon: BookMarked,
      iconBgColor: 'bg-purple-100',
      iconColor: 'text-purple-600'
    }
  ];

  return (
    <PageLayout showFooter={false}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <UserWelcome user={user} />
        
        <ErrorAlert message={error} className="mb-8" />

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsCards.map((card, index) => (
              <StatsCard key={index} {...card} />
            ))}
          </div>
        )}

        {/* Reading Progress */}
        {readingProgress && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <ReadingProgressCard inProgressBooks={readingProgress.inProgressBooks} />
            <RecentActivityCard recentBooks={readingProgress.recentBooks} />
          </div>
        )}

        {/* Quick Actions */}
        <QuickActions />
      </div>
    </PageLayout>
  );
}
