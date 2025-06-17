import React from 'react';
import { Link } from 'react-router-dom';
import { Library } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import UserAvatar from './UserAvatar';

export default function Navbar({ showAuthLinks = true }) {
  const { user } = useAuth();

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
                <Link to="/about" className="hover:text-blue-600 transition-colors">About</Link>
                {/* Login Button */}
                <Link 
                  to="/login"
                  className="px-4 py-2 bg-gray-100 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors border border-blue-600"
                >
                  Login
                </Link>
                {/* Sign Up Button */}
                <Link 
                  to="/signup"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                {/* Navigation Links for Logged in Users */}
                <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
                <Link to="/explore" className="hover:text-blue-600 transition-colors">Explore</Link>
                <Link to="/about" className="hover:text-blue-600 transition-colors">About</Link>
                <Link to="/dashboard" className="hover:text-blue-600 transition-colors">Dashboard</Link>
                {/* User Avatar only, no Logout button */}
                <div className="flex items-center gap-3">
                  <UserAvatar user={user} />
                </div>
              </>
            )}
          </>
        )}
      </div>
    </nav>
  );
} 