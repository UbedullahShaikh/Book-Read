import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Library, Chrome, Sparkles } from 'lucide-react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../auth/firebase';

export default function Home() {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('Signed in user:', result.user);
      navigate('/dashboard');
    } catch (error) {
      console.error('Sign in error:', error);
      alert('Sign in failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
            <Library className="text-2xl text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            SmartBook
          </h1>
        </div>
        <div className="space-x-6">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <Link to="/explore" className="hover:text-blue-600 transition-colors">Explore Books</Link>
          <Link to="/dashboard" className="hover:text-blue-600 transition-colors">Dashboard</Link>
        </div>
      </nav>

      {/* Hero Section */}
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

        {/* Google Sign in Button */}
        <button
          className="group flex items-center gap-3 bg-white hover:bg-gray-50 text-gray-700 px-8 py-4 rounded-2xl text-lg shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl hover:scale-105"
          onClick={handleGoogleSignIn}
        >
          <div className="p-1 bg-white rounded-full shadow-sm">
            <Chrome className="text-2xl text-blue-500" />
          </div>
          <span className="font-medium">Sign in with Google</span>
        </button>
      </main>

      {/* Footer */}
      <footer className="text-center text-sm py-8 text-gray-500 dark:text-gray-400 bg-white/50">
        © {new Date().getFullYear()} SmartBook | Made for Students & Book Lovers
      </footer>
    </div>
  );
};
