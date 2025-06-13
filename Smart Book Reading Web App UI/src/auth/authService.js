/**
 * 🔐 Authentication Service
 * Handles user authentication, registration, and data management
 */

import { userSchema, userHelpers } from '../models/user.model.js';
import { bookSchema } from '../models/book.model.js';
import { highlightSchema } from '../models/highlight.model.js';
import { chatSchema } from '../models/chat.model.js';

// 📊 Dummy Data
const dummyUsers = [
  {
    _id: 'user-1',
    name: 'Test User',
    email: 'test@example.com',
    password: '123456',
    avatar: null,
    bio: 'Test user for development and testing purposes',
    favorites: ['book-1', 'book-4'],
    recentBooks: [
      {
        bookId: 'book-1',
        lastPage: 45,
        lastOpenedAt: new Date('2024-01-20')
      }
    ],
    completedBooks: ['book-2'],
    inProgressBooks: [
      {
        bookId: 'book-1',
        currentPage: 45,
        totalPages: 180,
        progressPercent: 25,
        startedAt: new Date('2024-01-15'),
        lastReadAt: new Date('2024-01-20')
      }
    ],
    readingStreak: {
      count: 5,
      lastReadAt: new Date('2024-01-20'),
      longestStreak: 12
    },
    stats: {
      totalBooksCompleted: 1,
      totalMinutesRead: 240,
      totalHighlights: 15,
      totalChats: 8,
      averageReadingSpeed: 180,
      totalPagesRead: 281
    },
    preferences: {
      theme: 'auto',
      fontSize: 16,
      fontFamily: 'serif',
      readingMode: 'continuous',
      autoSaveHighlights: true,
      enableNotifications: true
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-20')
  },
  {
    _id: 'user-2',
    name: 'Admin User',
    email: 'admin@smartbook.com',
    password: 'admin123',
    avatar: null,
    bio: 'Administrator of SmartBook platform',
    favorites: ['book-2', 'book-3', 'book-5'],
    recentBooks: [
      {
        bookId: 'book-5',
        lastPage: 200,
        lastOpenedAt: new Date('2024-01-22')
      }
    ],
    completedBooks: ['book-1', 'book-2', 'book-4'],
    inProgressBooks: [
      {
        bookId: 'book-5',
        currentPage: 200,
        totalPages: 310,
        progressPercent: 65,
        startedAt: new Date('2024-01-10'),
        lastReadAt: new Date('2024-01-22')
      }
    ],
    readingStreak: {
      count: 15,
      lastReadAt: new Date('2024-01-22'),
      longestStreak: 30
    },
    stats: {
      totalBooksCompleted: 3,
      totalMinutesRead: 1800,
      totalHighlights: 150,
      totalChats: 45,
      averageReadingSpeed: 200,
      totalPagesRead: 5000
    },
    preferences: {
      theme: 'dark',
      fontSize: 18,
      fontFamily: 'sans-serif',
      readingMode: 'continuous',
      autoSaveHighlights: true,
      enableNotifications: true
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-22')
  },
  {
    _id: 'user-3',
    name: 'Book Reader',
    email: 'reader@example.com',
    password: 'reader123',
    avatar: null,
    bio: 'Passionate reader who loves fiction and non-fiction books',
    favorites: ['book-1', 'book-2', 'book-3'],
    recentBooks: [
      {
        bookId: 'book-1',
        lastPage: 90,
        lastOpenedAt: new Date('2024-01-21')
      }
    ],
    completedBooks: ['book-2', 'book-3'],
    inProgressBooks: [
      {
        bookId: 'book-1',
        currentPage: 90,
        totalPages: 180,
        progressPercent: 50,
        startedAt: new Date('2024-01-12'),
        lastReadAt: new Date('2024-01-21')
      }
    ],
    readingStreak: {
      count: 7,
      lastReadAt: new Date('2024-01-21'),
      longestStreak: 21
    },
    stats: {
      totalBooksCompleted: 2,
      totalMinutesRead: 960,
      totalHighlights: 89,
      totalChats: 23,
      averageReadingSpeed: 180,
      totalPagesRead: 2400
    },
    preferences: {
      theme: 'light',
      fontSize: 16,
      fontFamily: 'serif',
      readingMode: 'continuous',
      autoSaveHighlights: true,
      enableNotifications: true
    },
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-21')
  }
];

const dummyBooks = [
  {
    _id: 'book-1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    fileUrl: 'https://example.com/books/gatsby.pdf',
    fileType: 'pdf',
    fileSize: 2048576,
    coverImageUrl: 'https://example.com/covers/gatsby.jpg',
    uploadedBy: 'user-1',
    isPublic: true,
    description: 'A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.',
    genre: ['fiction', 'romance', 'drama'],
    language: 'en',
    totalPages: 180,
    estimatedReadingTime: 240,
    wordCount: 48000,
    contentIndexed: ['Chapter 1 content...', 'Chapter 2 content...'],
    summary: 'Set in the Jazz Age on Long Island, the novel depicts first-person narrator Nick Carraway\'s interactions with mysterious millionaire Jay Gatsby.',
    keyTopics: ['wealth', 'love', 'American Dream', 'social class'],
    difficulty: 'intermediate',
    rating: {
      average: 4.2,
      count: 1250
    },
    readCount: 5000,
    favoriteCount: 890,
    tags: ['classic', 'American literature', '1920s'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    publishedAt: new Date('1925-04-10')
  },
  {
    _id: 'book-2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    fileUrl: 'https://example.com/books/mockingbird.pdf',
    fileType: 'pdf',
    fileSize: 1572864,
    coverImageUrl: 'https://example.com/covers/mockingbird.jpg',
    uploadedBy: 'user-2',
    isPublic: true,
    description: 'The story of young Scout Finch and her father Atticus in a racially divided Alabama town.',
    genre: ['fiction', 'drama', 'young-adult'],
    language: 'en',
    totalPages: 281,
    estimatedReadingTime: 360,
    wordCount: 72000,
    contentIndexed: ['Chapter 1 content...', 'Chapter 2 content...'],
    summary: 'Set in the American South during the 1930s, the novel explores themes of racial injustice and the loss of innocence.',
    keyTopics: ['racism', 'justice', 'innocence', 'prejudice'],
    difficulty: 'intermediate',
    rating: {
      average: 4.5,
      count: 2100
    },
    readCount: 8500,
    favoriteCount: 1200,
    tags: ['classic', 'social justice', 'coming-of-age'],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
    publishedAt: new Date('1960-07-11')
  },
  {
    _id: 'book-3',
    title: '1984',
    author: 'George Orwell',
    fileUrl: 'https://example.com/books/1984.pdf',
    fileType: 'pdf',
    fileSize: 1048576,
    coverImageUrl: 'https://example.com/covers/1984.jpg',
    uploadedBy: 'user-3',
    isPublic: true,
    description: 'A dystopian novel about totalitarianism and surveillance society.',
    genre: ['fiction', 'sci-fi', 'dystopian'],
    language: 'en',
    totalPages: 328,
    estimatedReadingTime: 420,
    wordCount: 84000,
    contentIndexed: ['Chapter 1 content...', 'Chapter 2 content...'],
    summary: 'Set in a totalitarian society, the novel follows Winston Smith as he rebels against the Party and Big Brother.',
    keyTopics: ['totalitarianism', 'surveillance', 'truth', 'rebellion'],
    difficulty: 'advanced',
    rating: {
      average: 4.3,
      count: 1800
    },
    readCount: 6500,
    favoriteCount: 950,
    tags: ['dystopian', 'political', 'classic'],
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01'),
    publishedAt: new Date('1949-06-08')
  }
];

const dummyHighlights = [
  {
    _id: 'highlight-1',
    userId: 'user-1',
    bookId: 'book-1',
    pageNumber: 25,
    text: 'So we beat on, boats against the current, borne back ceaselessly into the past.',
    color: '#FFD700',
    note: 'Beautiful ending quote about the past',
    tags: ['ending', 'quote', 'past'],
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-18')
  },
  {
    _id: 'highlight-2',
    userId: 'user-2',
    bookId: 'book-2',
    pageNumber: 150,
    text: 'You never really understand a person until you consider things from his point of view.',
    color: '#FF6B6B',
    note: 'Important lesson about empathy',
    tags: ['empathy', 'understanding', 'life-lesson'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  }
];

const dummyChats = [
  {
    _id: 'chat-1',
    userId: 'user-1',
    bookId: 'book-1',
    title: 'Discussion about Gatsby\'s character',
    messages: [
      {
        role: 'user',
        content: 'What do you think about Gatsby\'s obsession with Daisy?',
        timestamp: new Date('2024-01-18T10:30:00')
      },
      {
        role: 'assistant',
        content: 'Gatsby\'s obsession with Daisy represents the American Dream and how it can become destructive when taken to extremes.',
        timestamp: new Date('2024-01-18T10:31:00')
      }
    ],
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-18')
  }
];

class AuthService {
  constructor() {
    this.currentUser = null;
    this.currentUserData = null;
    this.isAuthenticated = false;
  }

  // 🔍 Initialize service and load data
  initialize() {
    try {
      // Load current user from localStorage
      const storedUser = localStorage.getItem('smartbook_current_user');
      const storedUserData = localStorage.getItem('smartbook_current_user_data');
      
      if (storedUser && storedUserData) {
        this.currentUser = JSON.parse(storedUser);
        this.currentUserData = JSON.parse(storedUserData);
        this.isAuthenticated = true;
      }

      // Initialize dummy data if not exists
      this.initializeDummyData();
      
      return {
        user: this.currentUser,
        userData: this.currentUserData,
        isAuthenticated: this.isAuthenticated
      };
    } catch (error) {
      console.error('AuthService initialization error:', error);
      this.clearAuth();
      return { user: null, userData: null, isAuthenticated: false };
    }
  }

  // 📊 Initialize dummy data
  initializeDummyData() {
    const users = localStorage.getItem('smartbook_users');
    const books = localStorage.getItem('smartbook_books');
    const highlights = localStorage.getItem('smartbook_highlights');
    const chats = localStorage.getItem('smartbook_chats');

    if (!users) {
      localStorage.setItem('smartbook_users', JSON.stringify(dummyUsers));
    }
    if (!books) {
      localStorage.setItem('smartbook_books', JSON.stringify(dummyBooks));
    }
    if (!highlights) {
      localStorage.setItem('smartbook_highlights', JSON.stringify(dummyHighlights));
    }
    if (!chats) {
      localStorage.setItem('smartbook_chats', JSON.stringify(dummyChats));
    }
  }

  // 🔑 Sign in with email and password
  async signIn(email, password) {
    try {
      // Validate input
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      if (!this.isValidEmail(email)) {
        throw new Error('Please enter a valid email address');
      }

      // Get users from localStorage
      const users = this.getUsers();
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

      if (!user) {
        throw new Error('Invalid email or password');
      }

      // Create auth user object
      const authUser = {
        uid: user._id,
        email: user.email,
        displayName: user.name
      };

      // Set current user
      this.currentUser = authUser;
      this.currentUserData = user;
      this.isAuthenticated = true;

      // Save to localStorage
      localStorage.setItem('smartbook_current_user', JSON.stringify(authUser));
      localStorage.setItem('smartbook_current_user_data', JSON.stringify(user));

      return {
        user: authUser,
        userData: user,
        success: true
      };

    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  }

  // 📝 Sign up with email, password, and profile
  async signUp(email, password, userProfile) {
    try {
      // Validate input
      if (!email || !password || !userProfile.name) {
        throw new Error('Email, password, and name are required');
      }

      if (!this.isValidEmail(email)) {
        throw new Error('Please enter a valid email address');
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      // Get users from localStorage
      const users = this.getUsers();
      
      // Check if user already exists
      const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (existingUser) {
        throw new Error('An account with this email already exists');
      }

      // Create new user based on userSchema
      const newUser = {
        _id: `user-${Date.now()}`,
        name: userProfile.name,
        email: email.toLowerCase(),
        password: password, // In production, this would be hashed
        avatar: null,
        bio: userProfile.bio || '',
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
      };

      // Add user to storage
      users.push(newUser);
      localStorage.setItem('smartbook_users', JSON.stringify(users));

      // Create auth user object
      const authUser = {
        uid: newUser._id,
        email: newUser.email,
        displayName: newUser.name
      };

      // Set current user
      this.currentUser = authUser;
      this.currentUserData = newUser;
      this.isAuthenticated = true;

      // Save to localStorage
      localStorage.setItem('smartbook_current_user', JSON.stringify(authUser));
      localStorage.setItem('smartbook_current_user_data', JSON.stringify(newUser));

      return {
        user: authUser,
        userData: newUser,
        success: true
      };

    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  }

  // 🚪 Sign out
  signOut() {
    try {
      this.currentUser = null;
      this.currentUserData = null;
      this.isAuthenticated = false;

      localStorage.removeItem('smartbook_current_user');
      localStorage.removeItem('smartbook_current_user_data');

      return { success: true };
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  }

  // 🔄 Reset to dummy data
  resetToDummyData() {
    try {
      // Clear current user
      this.signOut();

      // Reset all data
      localStorage.setItem('smartbook_users', JSON.stringify(dummyUsers));
      localStorage.setItem('smartbook_books', JSON.stringify(dummyBooks));
      localStorage.setItem('smartbook_highlights', JSON.stringify(dummyHighlights));
      localStorage.setItem('smartbook_chats', JSON.stringify(dummyChats));

      return { success: true, message: 'Data reset to dummy data successfully' };
    } catch (error) {
      console.error('Reset data error:', error);
      throw error;
    }
  }

  // 📊 Get current user data
  getCurrentUser() {
    return {
      user: this.currentUser,
      userData: this.currentUserData,
      isAuthenticated: this.isAuthenticated
    };
  }

  // 👥 Get all users
  getUsers() {
    try {
      const users = localStorage.getItem('smartbook_users');
      return users ? JSON.parse(users) : [];
    } catch (error) {
      console.error('Get users error:', error);
      return [];
    }
  }

  // 📚 Get all books
  getBooks() {
    try {
      const books = localStorage.getItem('smartbook_books');
      return books ? JSON.parse(books) : [];
    } catch (error) {
      console.error('Get books error:', error);
      return [];
    }
  }

  // 🔖 Get all highlights
  getHighlights() {
    try {
      const highlights = localStorage.getItem('smartbook_highlights');
      return highlights ? JSON.parse(highlights) : [];
    } catch (error) {
      console.error('Get highlights error:', error);
      return [];
    }
  }

  // 💬 Get all chats
  getChats() {
    try {
      const chats = localStorage.getItem('smartbook_chats');
      return chats ? JSON.parse(chats) : [];
    } catch (error) {
      console.error('Get chats error:', error);
      return [];
    }
  }

  // 🔧 Update user data
  updateUserData(updatedData) {
    try {
      if (!this.currentUser) {
        throw new Error('No user is currently signed in');
      }

      // Update current user data
      this.currentUserData = { ...this.currentUserData, ...updatedData, updatedAt: new Date() };

      // Update in localStorage
      localStorage.setItem('smartbook_current_user_data', JSON.stringify(this.currentUserData));

      // Update in users array
      const users = this.getUsers();
      const userIndex = users.findIndex(u => u._id === this.currentUser.uid);
      if (userIndex !== -1) {
        users[userIndex] = this.currentUserData;
        localStorage.setItem('smartbook_users', JSON.stringify(users));
      }

      return { success: true, userData: this.currentUserData };
    } catch (error) {
      console.error('Update user data error:', error);
      throw error;
    }
  }

  // ✅ Validate email format
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // 🧹 Clear all authentication data
  clearAuth() {
    this.currentUser = null;
    this.currentUserData = null;
    this.isAuthenticated = false;
  }

  // 📋 Get dummy accounts for testing
  getDummyAccounts() {
    return [
      {
        email: 'test@example.com',
        password: '123456',
        name: 'Test User'
      },
      {
        email: 'admin@smartbook.com',
        password: 'admin123',
        name: 'Admin User'
      },
      {
        email: 'reader@example.com',
        password: 'reader123',
        name: 'Book Reader'
      }
    ];
  }
}

// Create singleton instance
const authService = new AuthService();

export default authService; 