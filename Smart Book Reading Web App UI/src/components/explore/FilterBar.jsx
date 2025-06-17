import React from 'react';

const FilterBar = ({ 
  selectedGenre, 
  setSelectedGenre, 
  selectedCategory, 
  setSelectedCategory, 
  genres, 
  categories, 
  onGenreFilter, 
  onCategoryFilter, 
  onClearFilters 
}) => {
  return (
    <div className="flex flex-wrap gap-4 mb-8">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">Genre:</span>
        <select
          value={selectedGenre}
          onChange={(e) => {
            setSelectedGenre(e.target.value);
            onGenreFilter(e.target.value);
          }}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Genres</option>
          {genres.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">Category:</span>
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            onCategoryFilter(e.target.value);
          }}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      
      <button 
        onClick={onClearFilters}
        className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 underline"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default FilterBar; 