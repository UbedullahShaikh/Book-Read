import React from 'react';
import { Chrome } from 'lucide-react';

export default function GoogleSignInButton({ onClick, className = "" }) {
  return (
    <button
      className={`group flex items-center gap-3 bg-white hover:bg-gray-50 text-gray-700 px-8 py-4 rounded-2xl text-lg shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl hover:scale-105 ${className}`}
      onClick={onClick}
    >
      <div className="p-1 bg-white rounded-full shadow-sm">
        <Chrome className="text-2xl text-blue-500" />
      </div>
      <span className="font-medium">Sign in with Google</span>
    </button>
  );
} 