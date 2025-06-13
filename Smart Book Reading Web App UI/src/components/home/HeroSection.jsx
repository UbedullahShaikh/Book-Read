import React from 'react';
import { Library, Sparkles, BookOpen, ArrowRight, Brain } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  const { user } = useAuth();

  if (user) {
    // Content for logged in users
    return (
      <main className="flex flex-col items-center justify-center text-center px-4 py-20 max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="relative">
            <div className="p-6 bg-gradient-to-r from-green-500 to-blue-600 rounded-full mb-4 inline-block">
              <BookOpen className="text-6xl text-white" />
            </div>
            <div className="absolute -top-2 -right-2">
              <Sparkles className="text-2xl text-yellow-400" />
            </div>
          </div>
        </div>
        
        <h2 className="text-4xl sm:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Welcome back, {user.displayName || 'Reader'}!
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl">
          Ready to continue your reading journey? Explore your dashboard or discover new books.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => window.location.href = '/dashboard'}
            className="flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Go to Dashboard
            <ArrowRight className="w-5 h-5" />
          </button>
          <button 
            onClick={() => window.location.href = '/explore'}
            className="flex items-center gap-2 px-8 py-4 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-2xl text-lg font-medium transition-all duration-300 hover:scale-105"
          >
            Explore Books
            <BookOpen className="w-5 h-5" />
          </button>
        </div>
      </main>
    );
  }

  // Content for non-logged in users - Modern Landing Page Hero
  return (
    <main className="flex flex-col items-center justify-center text-center px-4 py-20 max-w-6xl mx-auto">
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
      
      <h1 className="text-5xl sm:text-7xl font-bold mb-6 leading-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Read Smarter.<br />
        Learn Deeper.
      </h1>
      <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl">
        An AI-powered book reader that understands your reading needs and helps you unlock deeper insights from every page.
      </p>

      <div className="mb-16 flex flex-col sm:flex-row gap-4">
        <Link 
          to="/signup"
          className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg"
        >
          Get Started
          <ArrowRight className="w-5 h-5" />
        </Link>
        <Link 
          to="/login"
          className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-2xl text-lg font-medium transition-all duration-300 hover:scale-105"
        >
          Sign In
          <BookOpen className="w-5 h-5" />
        </Link>
      </div>

      {/* Visual Preview */}
      <div className="relative w-full max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 border border-blue-100 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="text-left">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                <div className="h-4 bg-blue-200 rounded w-1/2"></div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
            <div className="text-left">
              <div className="bg-blue-600 text-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="w-5 h-5" />
                  <span className="font-medium">AI Assistant</span>
                </div>
                <p className="text-sm">"This passage discusses the main character's internal conflict..."</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 