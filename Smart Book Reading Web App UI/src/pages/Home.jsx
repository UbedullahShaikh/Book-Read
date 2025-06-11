import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBookReader } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
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
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 shadow">
        <h1 className="text-2xl font-bold">📚 SmartBook</h1>
        <div className="space-x-6">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/explore" className="hover:text-blue-600">Explore Books</Link>
          <Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center text-center px-4 py-20 max-w-3xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
          Your Smart Reading Companion ✨
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Read, highlight, search, and chat with your books. Powered by AI, built for curious minds.
        </p>

        {/* Google Sign in Button */}
        <button
          className="flex items-center gap-3 bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-xl text-lg shadow border border-gray-300"
          onClick={handleGoogleSignIn}
        >
          <FcGoogle className="text-2xl" />
          Sign in with Google
        </button>
      </main>

      {/* Footer */}
      <footer className="text-center text-sm py-6 text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} SmartBook | Made for Students & Book Lovers
      </footer>
    </div>
  );
};
