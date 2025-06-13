import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';

export default function CallToAction() {
  const { user } = useAuth();

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
          <Link 
            to="/signup"
            className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-8 py-4 text-lg font-medium rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link 
            to="/login"
            className="flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white hover:text-gray-700 px-8 py-4 text-lg font-medium rounded-lg transition-all duration-300 hover:scale-105"
          >
            Sign In
            <BookOpen className="w-5 h-5" />
          </Link>
        </div>
        
        <p className="text-blue-200 text-sm mt-6">
          Free to start • No credit card required • Cancel anytime
        </p>
      </div>
    </section>
  );
} 