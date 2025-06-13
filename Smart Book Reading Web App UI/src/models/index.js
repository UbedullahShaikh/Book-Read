/**
 * 📚 Database Models Index
 * Exports all models and helper functions for the Smart Book Reading App
 */

// 🔐 Auth Model
export {
  authSchema,
  firebaseAuthUser,
  authHelpers
} from './auth.model.js';

// 👤 User Model
export {
  userSchema,
  userHelpers
} from './user.model.js';

// 📚 Book Model
export {
  bookSchema,
  bookHelpers,
  bookFilters
} from './book.model.js';

// 🖍 Highlight Model
export {
  highlightSchema,
  highlightHelpers,
  highlightColors,
  highlightStyles
} from './highlight.model.js';

// 💬 Chat Model
export {
  chatSchema,
  chatHelpers,
  chatCategories,
  aiModels,
  chatTemplates
} from './chat.model.js';

// 🏗️ Database Schema Relationships
export const databaseRelationships = {
  // One-to-One relationships
  authToUser: {
    type: '1:1',
    description: 'Auth model links to User model via userRef',
    authField: 'userRef',
    userField: '_id'
  },
  
  // One-to-Many relationships
  userToHighlights: {
    type: '1:N',
    description: 'User can have multiple highlights',
    userField: '_id',
    highlightField: 'userId'
  },
  
  userToChats: {
    type: '1:N',
    description: 'User can have multiple chats per book',
    userField: '_id',
    chatField: 'userId'
  },
  
  bookToHighlights: {
    type: '1:N',
    description: 'Book can have multiple highlights from different users',
    bookField: '_id',
    highlightField: 'bookId'
  },
  
  bookToChats: {
    type: '1:N',
    description: 'Book can have multiple chats from different users',
    bookField: '_id',
    chatField: 'bookId'
  }
};

// 🔧 Database Utilities
export const databaseUtils = {
  // Generate unique ID
  generateId: () => {
    return `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  },

  // Validate email format
  validateEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Format date for display
  formatDate: (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  },

  // Format date and time
  formatDateTime: (date) => {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  },

  // Calculate time difference
  timeAgo: (date) => {
    const now = new Date();
    const past = new Date(date);
    const diffInSeconds = Math.floor((now - past) / 1000);

    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)}mo ago`;
    return `${Math.floor(diffInSeconds / 31536000)}y ago`;
  },

  // Deep clone object
  deepClone: (obj) => {
    return JSON.parse(JSON.stringify(obj));
  },

  // Merge objects
  mergeObjects: (target, source) => {
    return { ...target, ...source };
  },

  // Validate required fields
  validateRequired: (obj, requiredFields) => {
    const missing = [];
    requiredFields.forEach(field => {
      if (!obj[field] || obj[field] === '') {
        missing.push(field);
      }
    });
    return {
      valid: missing.length === 0,
      missing
    };
  }
};

// 📊 Database Statistics
export const getDatabaseStats = (collections) => {
  return {
    totalUsers: collections.users?.length || 0,
    totalBooks: collections.books?.length || 0,
    totalHighlights: collections.highlights?.length || 0,
    totalChats: collections.chats?.length || 0,
    totalMessages: collections.chats?.reduce((sum, chat) => sum + (chat.messages?.length || 0), 0) || 0
  };
};

// 🎯 Default values for new documents
export const defaultValues = {
  auth: {
    provider: 'email',
    emailVerified: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  
  user: {
    bio: '',
    favorites: [],
    recentBooks: [],
    completedBooks: [],
    inProgressBooks: [],
    readingStreak: {
      count: 0,
      lastReadAt: null,
      longestStreak: 0
    },
    stats: {
      totalBooksCompleted: 0,
      totalMinutesRead: 0,
      totalHighlights: 0,
      totalChats: 0,
      averageReadingSpeed: 0,
      totalPagesRead: 0
    },
    preferences: {
      theme: 'auto',
      fontSize: 16,
      fontFamily: 'serif',
      readingMode: 'continuous',
      autoSaveHighlights: true,
      enableNotifications: true
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  
  book: {
    isPublic: true,
    description: '',
    genre: [],
    language: 'en',
    estimatedReadingTime: 0,
    wordCount: 0,
    contentIndexed: [],
    summary: '',
    keyTopics: [],
    difficulty: 'intermediate',
    rating: {
      average: 0,
      count: 0
    },
    readCount: 0,
    favoriteCount: 0,
    tags: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  
  highlight: {
    chapter: null,
    startIndex: 0,
    endIndex: 0,
    color: 'yellow',
    style: 'highlight',
    meaning: '',
    definition: '',
    synonyms: [],
    antonyms: [],
    partOfSpeech: null,
    notes: '',
    tags: [],
    sentiment: 'neutral',
    importance: 'medium',
    context: '',
    relatedHighlights: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  
  chat: {
    title: 'New Chat',
    isActive: true,
    messages: [],
    category: 'general',
    tags: [],
    stats: {
      totalMessages: 0,
      totalTokens: 0,
      averageResponseTime: 0,
      lastActivityAt: new Date()
    },
    settings: {
      aiModel: 'gpt-3.5-turbo',
      temperature: 0.7,
      maxTokens: 1000,
      includeBookContext: true,
      includeHighlights: true
    },
    createdAt: new Date(),
    updatedAt: new Date()
  }
}; 