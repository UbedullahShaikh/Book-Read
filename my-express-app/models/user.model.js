/**
 * 👤 User Model - Profile + Reading Data (NO password)
 * Contains user profile, favorites, reading progress, and statistics
 */

export const userSchema = {
  _id: String,                    // Firebase Auth UID or MongoDB ObjectId
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  avatar: {
    type: String,
    default: null                  // URL to profile picture
  },
  bio: {
    type: String,
    maxlength: 500,
    default: ''
  },

  // 📚 Reading Preferences & Favorites
  favorites: [{
    type: String,                 // Book._id references
    ref: 'Book'
  }],
  
  recentBooks: [{
    bookId: {
      type: String,
      ref: 'Book'
    },
    lastPage: {
      type: Number,
      default: 1
    },
    lastOpenedAt: {
      type: Date,
      default: Date.now
    }
  }],

  completedBooks: [{
    type: String,                 // Book._id references
    ref: 'Book'
  }],

  // 📖 Currently Reading Books
  inProgressBooks: [{
    bookId: {
      type: String,
      ref: 'Book'
    },
    currentPage: {
      type: Number,
      default: 1
    },
    totalPages: {
      type: Number,
      required: true
    },
    progressPercent: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },
    startedAt: {
      type: Date,
      default: Date.now
    },
    lastReadAt: {
      type: Date,
      default: Date.now
    }
  }],

  // 🔥 Reading Streak
  readingStreak: {
    count: {
      type: Number,
      default: 0,
      min: 0
    },
    lastReadAt: {
      type: Date,
      default: null
    },
    longestStreak: {
      type: Number,
      default: 0
    }
  },

  // 📊 Reading Statistics
  stats: {
    totalBooksCompleted: {
      type: Number,
      default: 0,
      min: 0
    },
    totalMinutesRead: {
      type: Number,
      default: 0,
      min: 0
    },
    totalHighlights: {
      type: Number,
      default: 0,
      min: 0
    },
    totalChats: {
      type: Number,
      default: 0,
      min: 0
    },
    averageReadingSpeed: {
      type: Number,
      default: 0,                 // pages per minute
      min: 0
    },
    totalPagesRead: {
      type: Number,
      default: 0,
      min: 0
    }
  },

  // ⚙️ User Preferences
  preferences: {
    theme: {
      type: String,
      enum: ['light', 'dark', 'auto'],
      default: 'auto'
    },
    fontSize: {
      type: Number,
      min: 12,
      max: 24,
      default: 16
    },
    fontFamily: {
      type: String,
      enum: ['serif', 'sans-serif', 'monospace'],
      default: 'serif'
    },
    readingMode: {
      type: String,
      enum: ['continuous', 'page-by-page'],
      default: 'continuous'
    },
    autoSaveHighlights: {
      type: Boolean,
      default: true
    },
    enableNotifications: {
      type: Boolean,
      default: true
    }
  },

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

// Helper functions for User model
export const userHelpers = {
  // Calculate reading progress percentage
  calculateProgress: (currentPage, totalPages) => {
    if (totalPages <= 0) return 0;
    return Math.round((currentPage / totalPages) * 100);
  },

  // Update reading streak
  updateStreak: (user, hasReadToday) => {
    const today = new Date();
    const lastRead = user.readingStreak.lastReadAt;
    
    if (!lastRead) {
      return {
        count: hasReadToday ? 1 : 0,
        lastReadAt: hasReadToday ? today : null
      };
    }

    const daysSinceLastRead = Math.floor((today - lastRead) / (1000 * 60 * 60 * 24));
    
    if (daysSinceLastRead === 0 && hasReadToday) {
      return user.readingStreak; // Already read today
    } else if (daysSinceLastRead === 1 && hasReadToday) {
      return {
        count: user.readingStreak.count + 1,
        lastReadAt: today,
        longestStreak: Math.max(user.readingStreak.count + 1, user.readingStreak.longestStreak)
      };
    } else if (daysSinceLastRead > 1 && hasReadToday) {
      return {
        count: 1,
        lastReadAt: today,
        longestStreak: user.readingStreak.longestStreak
      };
    } else {
      return {
        count: 0,
        lastReadAt: null,
        longestStreak: user.readingStreak.longestStreak
      };
    }
  },

  // Add book to recent books
  addToRecentBooks: (user, bookId, lastPage = 1) => {
    const recentBooks = user.recentBooks.filter(book => book.bookId !== bookId);
    recentBooks.unshift({
      bookId,
      lastPage,
      lastOpenedAt: new Date()
    });
    
    // Keep only last 10 recent books
    return recentBooks.slice(0, 10);
  }
}; 