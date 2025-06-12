import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import PageLayout from '../components/layout/PageLayout';
import HeroSection from '../components/home/HeroSection';
import GoogleSignInButton from '../components/auth/GoogleSignInButton';

export default function Home() {
  const { signInWithGoogle } = useAuth();

  return (
    <PageLayout>
      <HeroSection onSignIn={signInWithGoogle} />
    </PageLayout>
  );
}
