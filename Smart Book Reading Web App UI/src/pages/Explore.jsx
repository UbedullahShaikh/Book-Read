import React, { useState, useEffect } from 'react';
import PageLayout from '../components/layout/PageLayout';
import SearchBar from '../components/explore/SearchBar';
import FilterBar from '../components/explore/FilterBar';
import BookGrid from '../components/explore/BookGrid';
import ErrorAlert from '../components/common/ErrorAlert';
import LoadingSpinner from '../components/common/LoadingSpinner';

// Backend API base URL
const API_BASE_URL = 'http://localhost:3000/api';

export default function Explore() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Fetch books from backend
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/books`);
      const data = await response.json();
      
      if (data.success) {
        setBooks(data.data.books);
      } else {
        setError(data.message || 'Failed to fetch books');
      }
    } catch (error) {
      console.error('Error fetching books:', error);
      setError('Failed to load books. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Search books
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchBooks();
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/books/search/${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      
      if (data.success) {
        setBooks(data.data.books);
      } else {
        setError(data.message || 'Search failed');
      }
    } catch (error) {
      console.error('Search error:', error);
      setError('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Filter by genre
  const handleGenreFilter = async (genre) => {
    setSelectedGenre(genre);
    setSelectedCategory('');
    
    if (!genre) {
      fetchBooks();
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/books/genre/${encodeURIComponent(genre)}`);
      const data = await response.json();
      
      if (data.success) {
        setBooks(data.data.books);
      } else {
        setError(data.message || 'Filter failed');
      }
    } catch (error) {
      console.error('Genre filter error:', error);
      setError('Filter failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Filter by category
  const handleCategoryFilter = async (category) => {
    setSelectedCategory(category);
    setSelectedGenre('');
    
    if (!category) {
      fetchBooks();
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/books/category/${encodeURIComponent(category)}`);
      const data = await response.json();
      
      if (data.success) {
        setBooks(data.data.books);
      } else {
        setError(data.message || 'Filter failed');
      }
    } catch (error) {
      console.error('Category filter error:', error);
      setError('Filter failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedGenre('');
    setSelectedCategory('');
    fetchBooks();
  };

  // Get unique genres and categories
  const genres = [...new Set(books.map(book => book.genre))];
  const categories = [...new Set(books.map(book => book.category))];

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
        <SearchBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
        />

        <FilterBar 
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          genres={genres}
          categories={categories}
          onGenreFilter={handleGenreFilter}
          onCategoryFilter={handleCategoryFilter}
          onClearFilters={handleClearFilters}
        />

        <ErrorAlert message={error} className="mb-8" />

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-16">
            <LoadingSpinner />
          </div>
        )}

        {/* Books Grid */}
        {!loading && !error && (
          <BookGrid 
            books={books} 
            onViewAllBooks={handleClearFilters}
          />
        )}
      </div>
    </PageLayout>
  );
} 