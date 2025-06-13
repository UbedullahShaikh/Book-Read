/**
 * 🖍 Highlight Model
 * Stores highlighted text, page information, and dictionary meanings
 */

export const highlightSchema = {
  _id: String,                    // Firebase document ID or MongoDB ObjectId
  userId: {
    type: String,
    required: true,
    ref: 'User'
  },
  bookId: {
    type: String,
    required: true,
    ref: 'Book'
  },
  
  // 📄 Page Information
  pageNumber: {
    type: Number,
    required: true,
    min: 1
  },
  chapter: {
    type: String,
    default: null
  },
  
  // 📝 Highlighted Content
  text: {
    type: String,
    required: true,
    trim: true,
    maxlength: 2000
  },
  startIndex: {
    type: Number,
    default: 0
  },
  endIndex: {
    type: Number,
    default: 0
  },
  
  // 🎨 Highlight Styling
  color: {
    type: String,
    enum: ['yellow', 'green', 'blue', 'pink', 'purple', 'orange'],
    default: 'yellow'
  },
  style: {
    type: String,
    enum: ['highlight', 'underline', 'strikethrough'],
    default: 'highlight'
  },
  
  // 📚 Dictionary & AI Analysis
  meaning: {
    type: String,
    maxlength: 1000,
    default: ''
  },
  definition: {
    type: String,
    maxlength: 500,
    default: ''
  },
  synonyms: [{
    type: String,
    maxlength: 50
  }],
  antonyms: [{
    type: String,
    maxlength: 50
  }],
  partOfSpeech: {
    type: String,
    enum: ['noun', 'verb', 'adjective', 'adverb', 'pronoun', 'preposition', 'conjunction', 'interjection'],
    default: null
  },
  
  // 💭 User Notes
  notes: {
    type: String,
    maxlength: 1000,
    default: ''
  },
  tags: [{
    type: String,
    maxlength: 30
  }],
  
  // 📊 AI Analysis
  sentiment: {
    type: String,
    enum: ['positive', 'negative', 'neutral'],
    default: 'neutral'
  },
  importance: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  context: {
    type: String,
    maxlength: 500,
    default: ''
  },
  
  // 🔗 Related Content
  relatedHighlights: [{
    type: String,                 // Highlight._id references
    ref: 'Highlight'
  }],
  
  // 📅 Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
};

// Helper functions for Highlight model
export const highlightHelpers = {
  // Get dictionary meaning from API
  fetchDictionaryMeaning: async (word) => {
    try {
      // This would call a dictionary API like Free Dictionary API
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const data = await response.json();
      
      if (data && data.length > 0) {
        const entry = data[0];
        return {
          definition: entry.meanings?.[0]?.definitions?.[0]?.definition || '',
          partOfSpeech: entry.meanings?.[0]?.partOfSpeech || '',
          synonyms: entry.meanings?.[0]?.synonyms || [],
          antonyms: entry.meanings?.[0]?.antonyms || []
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching dictionary meaning:', error);
      return null;
    }
  },

  // Analyze text sentiment
  analyzeSentiment: (text) => {
    // This would use AI/NLP to analyze sentiment
    // For now, return neutral
    return 'neutral';
  },

  // Determine importance level
  determineImportance: (text, context) => {
    // This would use AI to determine importance
    // For now, return medium
    return 'medium';
  },

  // Extract tags from text
  extractTags: (text) => {
    // This would use NLP to extract relevant tags
    // For now, return empty array
    return [];
  },

  // Validate highlight color
  isValidColor: (color) => {
    const validColors = ['yellow', 'green', 'blue', 'pink', 'purple', 'orange'];
    return validColors.includes(color);
  },

  // Format highlight for display
  formatHighlight: (highlight) => {
    return {
      id: highlight._id,
      text: highlight.text,
      color: highlight.color,
      page: highlight.pageNumber,
      meaning: highlight.meaning,
      notes: highlight.notes,
      createdAt: highlight.createdAt
    };
  },

  // Group highlights by page
  groupByPage: (highlights) => {
    return highlights.reduce((groups, highlight) => {
      const page = highlight.pageNumber;
      if (!groups[page]) {
        groups[page] = [];
      }
      groups[page].push(highlight);
      return groups;
    }, {});
  },

  // Search highlights by text
  searchHighlights: (highlights, searchTerm) => {
    const term = searchTerm.toLowerCase();
    return highlights.filter(highlight => 
      highlight.text.toLowerCase().includes(term) ||
      highlight.notes.toLowerCase().includes(term) ||
      highlight.meaning.toLowerCase().includes(term)
    );
  }
};

// Highlight color options
export const highlightColors = {
  yellow: { name: 'Yellow', hex: '#FFEB3B', class: 'bg-yellow-200' },
  green: { name: 'Green', hex: '#4CAF50', class: 'bg-green-200' },
  blue: { name: 'Blue', hex: '#2196F3', class: 'bg-blue-200' },
  pink: { name: 'Pink', hex: '#E91E63', class: 'bg-pink-200' },
  purple: { name: 'Purple', hex: '#9C27B0', class: 'bg-purple-200' },
  orange: { name: 'Orange', hex: '#FF9800', class: 'bg-orange-200' }
};

// Highlight style options
export const highlightStyles = {
  highlight: { name: 'Highlight', class: 'bg-opacity-50' },
  underline: { name: 'Underline', class: 'underline decoration-2' },
  strikethrough: { name: 'Strikethrough', class: 'line-through' }
}; 