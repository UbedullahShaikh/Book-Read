import React from 'react';
import { Award } from 'lucide-react';

const RecentActivityCard = ({ recentBooks }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Award className="w-5 h-5" />
        Recent Activity
      </h3>
      
      <div className="space-y-4">
        {recentBooks && recentBooks.length > 0 ? (
          recentBooks.slice(0, 5).map(book => (
            <div key={book.bookId} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
              <div>
                <p className="font-medium text-gray-900">Book ID: {book.bookId}</p>
                <p className="text-sm text-gray-500">
                  Last read: {new Date(book.lastOpenedAt).toLocaleDateString()}
                </p>
              </div>
              <span className="text-sm text-gray-500">Page {book.lastPage}</span>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No recent activity</p>
            <p className="text-sm text-gray-500">Your reading activity will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivityCard; 