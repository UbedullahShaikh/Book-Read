import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import { Search, BookOpen, Filter } from 'lucide-react';

export default function Explore() {
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Explore Books
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover amazing books from around the world. Find your next favorite read.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search books, authors, or categories..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
            <Filter className="w-5 h-5" />
            Filters
          </button>
        </div>

        {/* Coming Soon Section */}
        <div className="text-center py-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-12 border border-gray-200">
            <BookOpen className="w-24 h-24 text-blue-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Book Library Coming Soon!
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              We're working hard to bring you an amazing collection of books. 
              Soon you'll be able to explore, search, and discover your next favorite read.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => alert('Upload feature coming soon!')}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Upload Your Books
              </button>
              <button 
                onClick={() => window.location.href = '/services'}
                className="px-6 py-3 border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
} 