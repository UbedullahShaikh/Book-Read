import React from 'react';
import { BookOpen } from 'lucide-react';
import BookCard from './BookCard';

const BookGrid = ({ books, onViewAllBooks }) => {
  if (books.length === 0) {
    return (
      <div className="text-center py-16">
        <BookOpen className="w-24 h-24 text-gray-400 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          No books found
        </h2>
        <p className="text-gray-600 mb-8">
          Try adjusting your search or filters to find more books.
        </p>
        <button 
          onClick={onViewAllBooks}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          View All Books
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {books.map(book => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
};

export default BookGrid; 