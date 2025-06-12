import React from 'react';

export default function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex items-center gap-3">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="text-gray-600 text-lg">{message}</p>
      </div>
    </div>
  );
} 