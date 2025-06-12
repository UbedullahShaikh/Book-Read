import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import PageLayout from '../layout/PageLayout';
import { User, Mail, Calendar, Edit, Save, X } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [bio, setBio] = useState('Book lover and avid reader. Always exploring new worlds through literature.');

  const handleSave = () => {
    // Here you would typically save to Firebase or your backend
    console.log('Saving profile:', { displayName, bio });
    alert('Profile updated successfully!');
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDisplayName(user?.displayName || '');
    setIsEditing(false);
  };

  return (
    <PageLayout showFooter={false}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Profile
            </h1>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Edit className="w-4 h-4" />
                Edit Profile
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile Picture */}
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'User'}
                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <User className="w-16 h-16 text-white" />
                  </div>
                )}
              </div>
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  {user?.displayName || 'User'}
                </h2>
                <p className="text-gray-600">Member since 2023</p>
              </div>
            </div>

            {/* Profile Information */}
            <div className="flex-1 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Display Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                    <User className="w-4 h-4 text-gray-500" />
                    <span>{displayName}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span>{user?.email}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                {isEditing ? (
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <div className="px-4 py-2 bg-gray-50 rounded-lg">
                    <p>{bio}</p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Created
                </label>
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>January 2023</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
} 