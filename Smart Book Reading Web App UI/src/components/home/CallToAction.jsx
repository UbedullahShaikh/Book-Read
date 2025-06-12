import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import GoogleSignInButton from '../auth/GoogleSignInButton';

export default function CallToAction() {
  const { user, signInWithGoogle } = useAuth();

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Sign in failed:', error);
    }
  };

  if (user) {
    return null; // Don't show CTA for logged in users
  }

  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
          Ready to unlock deeper understanding?
        </h2>
        <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
          Join thousands of readers who are already using SmartBook to enhance their reading experience and gain deeper insights from every book.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <GoogleSignInButton 
            onClick={handleSignIn}
            className="bg-white hover:bg-gray-50 text-gray-700 px-8 py-4 text-lg font-medium"
          />
        </div>
        
        <p className="text-blue-200 text-sm mt-6">
          Free to start • No credit card required • Cancel anytime
        </p>
      </div>
    </section>
  );
} 