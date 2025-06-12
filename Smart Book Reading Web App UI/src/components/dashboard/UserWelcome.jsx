import React from 'react';
import { UserCircle } from 'lucide-react';

export default function UserWelcome({ user }) {
  if (!user) {
    return (
      <div className="flex items-center gap-6 mb-8">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
          <UserCircle className="w-12 h-12 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome, User!
          </h2>
          <p className="text-gray-600 text-lg">Ready to start your reading journey?</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-6 mb-8">
      <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.displayName || 'User'}
            className="w-12 h-12 rounded-full"
          />
        ) : (
          <UserCircle className="w-12 h-12 text-white" />
        )}
      </div>
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome, {user.displayName || user.email || 'User'}!
        </h2>
        <p className="text-gray-600 text-lg">Ready to start your reading journey?</p>
      </div>
    </div>
  );
} 