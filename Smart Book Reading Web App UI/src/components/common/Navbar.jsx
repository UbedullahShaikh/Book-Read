import React from 'react';
import { Link } from 'react-router-dom';
import { Library } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import UserAvatar from './UserAvatar';

export default function Navbar({ showAuthLinks = true }) {
  const { user, signInWithGoogle } = useAuth();

  const handleSignUp = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Sign up failed:', error);
    }
  };

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-sm shadow-sm relative z-50">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
          <Library className="text-2xl text-white" />
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          SmartBook
        </h1>
      </div>
      
      <div className="flex items-center gap-6">
        {showAuthLinks && (
          <>
            {!user ? (
              <>
                {/* Navigation Links for Non-logged in Users */}
                <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
                <Link to="/explore" className="hover:text-blue-600 transition-colors">Explore</Link>
                <Link to="/services" className="hover:text-blue-600 transition-colors">Services</Link>
                <Link to="/about" className="hover:text-blue-600 transition-colors">About Us</Link>
                
                {/* Sign Up Button */}
                <button 
                  onClick={handleSignUp}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                {/* Navigation Links for Logged in Users */}
                <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
                <Link to="/explore" className="hover:text-blue-600 transition-colors">Explore</Link>
                <Link to="/services" className="hover:text-blue-600 transition-colors">Services</Link>
                <Link to="/about" className="hover:text-blue-600 transition-colors">About Us</Link>
                <Link to="/dashboard" className="hover:text-blue-600 transition-colors">Dashboard</Link>
                
                {/* User Avatar */}
                <UserAvatar user={user} />
              </>
            )}
          </>
        )}
      </div>
    </nav>
  );
} 