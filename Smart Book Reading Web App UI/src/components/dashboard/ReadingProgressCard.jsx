import React from 'react';
import { BookOpen } from 'lucide-react';

const ReadingProgressCard = ({ inProgressBooks }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <BookOpen className="w-5 h-5" />
        Currently Reading
      </h3>
      
      {inProgressBooks && inProgressBooks.length > 0 ? (
        <div className="space-y-4">
          {inProgressBooks.slice(0, 3).map(book => (
            <div key={book.bookId} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">Book ID: {book.bookId}</h4>
                <span className="text-sm text-blue-600 font-medium">
                  {book.progressPercent}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${book.progressPercent}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>Page {book.currentPage} of {book.totalPages}</span>
                <span>Started {new Date(book.startedAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No books in progress</p>
          <p className="text-sm text-gray-500">Start reading a book to see your progress here</p>
        </div>
      )}
    </div>
  );
};

export default ReadingProgressCard; 