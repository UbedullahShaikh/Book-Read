import React from 'react';
import { Library, Sparkles } from 'lucide-react';
import GoogleSignInButton from '../auth/GoogleSignInButton';

export default function HeroSection({ onSignIn }) {
  return (
    <main className="flex flex-col items-center justify-center text-center px-4 py-20 max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="relative">
          <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 inline-block">
            <Library className="text-6xl text-white" />
          </div>
          <div className="absolute -top-2 -right-2">
            <Sparkles className="text-2xl text-yellow-400" />
          </div>
        </div>
      </div>
      
      <h2 className="text-4xl sm:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Your Smart Reading Companion
      </h2>
      <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl">
        Read, highlight, search, and chat with your books. Powered by AI, built for curious minds.
      </p>

      <GoogleSignInButton onClick={onSignIn} />
    </main>
  );
} 