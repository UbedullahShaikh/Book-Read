/**
 * 📚 Book Model
 * Stores book metadata, file URLs, and content for AI processing
 */

export const bookSchema = {
  _id: String,                    // Firebase document ID or MongoDB ObjectId
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  author: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  
  // 📄 File Information
  fileUrl: {
    type: String,
    required: true                // Cloudinary or Firebase Storage URL
  },
  fileType: {
    type: String,
    enum: ['pdf', 'epub', 'txt', 'docx'],
    required: true
  },
  fileSize: {
    type: Number,                 // Size in bytes
    required: true
  },
  
  // 🖼️ Cover Image
  coverImageUrl: {
    type: String,
    default: null                 // Cloudinary URL for book cover
  },
  
  // 👤 Upload Information
  uploadedBy: {
    type: String,                 // User._id reference
    ref: 'User',
    required: true
  },
  isPublic: {
    type: Boolean,
    default: true                 // Whether book is available to all users
  },
  
  // 📝 Book Details
  description: {
    type: String,
    maxlength: 1000,
    default: ''
  },
  genre: [{
    type: String,
    enum: [
      'fiction', 'non-fiction', 'mystery', 'romance', 'sci-fi', 
      'fantasy', 'biography', 'history', 'science', 'technology',
      'philosophy', 'religion', 'self-help', 'business', 'cooking',
      'travel', 'poetry', 'drama', 'children', 'young-adult'
    ]
  }],
  language: {
    type: String,
    default: 'en',
    enum: ['en', 'hi', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'ja', 'ko', 'zh']
  },
  
  // 📊 Reading Statistics
  totalPages: {
    type: Number,
    required: true,
    min: 1
  },
  estimatedReadingTime: {
    type: Number,                 // Minutes
    default: 0
  },
  wordCount: {
    type: Number,
    default: 0
  },
  
  // 🤖 AI Content Processing
  contentIndexed: [{
    type: String                  // Extracted text chunks for LangChain/OpenAI
  }],
  summary: {
    type: String,
    maxlength: 2000,
    default: ''
  },
  keyTopics: [{
    type: String,
    maxlength: 50
  }],
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'intermediate'
  },
  
  // 📈 Popularity & Ratings
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  readCount: {
    type: Number,
    default: 0,
    min: 0
  },
  favoriteCount: {
    type: Number,
    default: 0,
    min: 0
  },
  
  // 🏷️ Tags & Categories
  tags: [{
    type: String,
    maxlength: 30
  }],
  
  // 📅 Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  publishedAt: {
    type: Date,
    default: null                 // Original publication date
  }
};

// Helper functions for Book model
export const bookHelpers = {
  // Calculate estimated reading time (average 200 words per minute)
  calculateReadingTime: (wordCount) => {
    return Math.ceil(wordCount / 200);
  },

  // Extract key topics from content
  extractKeyTopics: (content) => {
    // This would use NLP/AI to extract key topics
    // For now, return placeholder
    return ['topic1', 'topic2', 'topic3'];
  },

  // Generate book summary
  generateSummary: (content) => {
    // This would use AI to generate a summary
    // For now, return first 200 characters
    return content.substring(0, 200) + '...';
  },

  // Validate file type
  isValidFileType: (fileType) => {
    const validTypes = ['pdf', 'epub', 'txt', 'docx'];
    return validTypes.includes(fileType.toLowerCase());
  },

  // Get file extension from URL
  getFileExtension: (fileUrl) => {
    const url = fileUrl.toLowerCase();
    if (url.includes('.pdf')) return 'pdf';
    if (url.includes('.epub')) return 'epub';
    if (url.includes('.txt')) return 'txt';
    if (url.includes('.docx')) return 'docx';
    return 'unknown';
  },

  // Format file size for display
  formatFileSize: (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
};

// Book search and filter options
export const bookFilters = {
  sortOptions: {
    title: 'Title A-Z',
    author: 'Author A-Z',
    createdAt: 'Recently Added',
    rating: 'Highest Rated',
    readCount: 'Most Read',
    publishedAt: 'Publication Date'
  },
  
  genreOptions: [
    'fiction', 'non-fiction', 'mystery', 'romance', 'sci-fi', 
    'fantasy', 'biography', 'history', 'science', 'technology',
    'philosophy', 'religion', 'self-help', 'business', 'cooking',
    'travel', 'poetry', 'drama', 'children', 'young-adult'
  ],
  
  languageOptions: [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'zh', name: 'Chinese' }
  ]
}; 