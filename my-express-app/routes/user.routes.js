import express from 'express';
import jwt from 'jsonwebtoken';
const router = express.Router();

// Import shared data store
import {
  sharedData,
  findUserById,
  updateUser
} from '../data/sharedData.js';

// JWT Secret (same as auth routes)
const JWT_SECRET = 'your-secret-key-change-in-production';

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token required'
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};

// Get user profile
router.get('/profile', authenticateToken, (req, res) => {
  try {
    const user = findUserById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const userResponse = { ...user };
    delete userResponse.password;

    res.json({
      success: true,
      data: {
        user: userResponse
      }
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user profile'
    });
  }
});

// Update user profile
router.put('/profile', authenticateToken, (req, res) => {
  try {
    const { name, bio, avatar } = req.body;
    const user = findUserById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update allowed fields
    const updates = {};
    if (name !== undefined) updates.name = name.trim();
    if (bio !== undefined) updates.bio = bio;
    if (avatar !== undefined) updates.avatar = avatar;
    
    const updatedUser = updateUser(req.user.userId, updates);
    
    if (!updatedUser) {
      return res.status(500).json({
        success: false,
        message: 'Error updating user profile'
      });
    }

    const userResponse = { ...updatedUser };
    delete userResponse.password;

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        user: userResponse
      }
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating user profile'
    });
  }
});

// Update user preferences
router.put('/preferences', authenticateToken, (req, res) => {
  try {
    const { theme, fontSize, fontFamily, readingMode, autoSaveHighlights, enableNotifications } = req.body;
    const user = findUserById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update preferences
    const updates = {
      preferences: { ...user.preferences }
    };
    
    if (theme !== undefined) updates.preferences.theme = theme;
    if (fontSize !== undefined) updates.preferences.fontSize = fontSize;
    if (fontFamily !== undefined) updates.preferences.fontFamily = fontFamily;
    if (readingMode !== undefined) updates.preferences.readingMode = readingMode;
    if (autoSaveHighlights !== undefined) updates.preferences.autoSaveHighlights = autoSaveHighlights;
    if (enableNotifications !== undefined) updates.preferences.enableNotifications = enableNotifications;
    
    const updatedUser = updateUser(req.user.userId, updates);
    
    if (!updatedUser) {
      return res.status(500).json({
        success: false,
        message: 'Error updating user preferences'
      });
    }

    res.json({
      success: true,
      message: 'Preferences updated successfully',
      data: {
        preferences: updatedUser.preferences
      }
    });

  } catch (error) {
    console.error('Update preferences error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating user preferences'
    });
  }
});

// Get user reading statistics
router.get('/stats', authenticateToken, (req, res) => {
  try {
    const user = findUserById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: {
        stats: user.stats,
        readingStreak: user.readingStreak
      }
    });

  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user statistics'
    });
  }
});

// Get user's reading progress
router.get('/reading-progress', authenticateToken, (req, res) => {
  try {
    const user = findUserById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: {
        inProgressBooks: user.inProgressBooks,
        recentBooks: user.recentBooks,
        completedBooks: user.completedBooks
      }
    });

  } catch (error) {
    console.error('Get reading progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching reading progress'
    });
  }
});

// Update reading progress for a book
router.put('/reading-progress/:bookId', authenticateToken, (req, res) => {
  try {
    const { bookId } = req.params;
    const { currentPage, totalPages } = req.body;
    
    const user = findUserById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Create a copy of user data to modify
    const updatedUserData = { ...user };

    // Find existing progress or create new
    let progressIndex = updatedUserData.inProgressBooks.findIndex(book => book.bookId === bookId);
    
    if (progressIndex === -1) {
      // Add new book to in-progress
      updatedUserData.inProgressBooks.push({
        bookId: bookId,
        currentPage: currentPage || 1,
        totalPages: totalPages,
        progressPercent: Math.round(((currentPage || 1) / totalPages) * 100),
        startedAt: new Date(),
        lastReadAt: new Date()
      });
    } else {
      // Update existing progress
      updatedUserData.inProgressBooks[progressIndex].currentPage = currentPage;
      updatedUserData.inProgressBooks[progressIndex].progressPercent = Math.round((currentPage / totalPages) * 100);
      updatedUserData.inProgressBooks[progressIndex].lastReadAt = new Date();
    }

    // Update reading streak
    const today = new Date();
    const lastRead = updatedUserData.readingStreak.lastReadAt;
    
    if (!lastRead || new Date(lastRead).toDateString() !== today.toDateString()) {
      updatedUserData.readingStreak.count += 1;
      updatedUserData.readingStreak.lastReadAt = today;
      
      if (updatedUserData.readingStreak.count > updatedUserData.readingStreak.longestStreak) {
        updatedUserData.readingStreak.longestStreak = updatedUserData.readingStreak.count;
      }
    }

    // Update user with all changes
    const updatedUser = updateUser(req.user.userId, {
      inProgressBooks: updatedUserData.inProgressBooks,
      readingStreak: updatedUserData.readingStreak
    });

    if (!updatedUser) {
      return res.status(500).json({
        success: false,
        message: 'Error updating reading progress'
      });
    }

    res.json({
      success: true,
      message: 'Reading progress updated successfully',
      data: {
        inProgressBooks: updatedUser.inProgressBooks
      }
    });

  } catch (error) {
    console.error('Update reading progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating reading progress'
    });
  }
});

// Mark book as completed
router.post('/complete-book/:bookId', authenticateToken, (req, res) => {
  try {
    const { bookId } = req.params;
    const user = findUserById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Create a copy of user data to modify
    const updatedUserData = { ...user };

    // Remove from in-progress
    updatedUserData.inProgressBooks = updatedUserData.inProgressBooks.filter(book => book.bookId !== bookId);
    
    // Add to completed books
    if (!updatedUserData.completedBooks.includes(bookId)) {
      updatedUserData.completedBooks.push(bookId);
    }
    
    // Update stats
    updatedUserData.stats.totalBooksCompleted += 1;
    
    // Update user with all changes
    const updatedUser = updateUser(req.user.userId, {
      inProgressBooks: updatedUserData.inProgressBooks,
      completedBooks: updatedUserData.completedBooks,
      stats: updatedUserData.stats
    });

    if (!updatedUser) {
      return res.status(500).json({
        success: false,
        message: 'Error marking book as completed'
      });
    }

    res.json({
      success: true,
      message: 'Book marked as completed',
      data: {
        completedBooks: updatedUser.completedBooks,
        stats: updatedUser.stats
      }
    });

  } catch (error) {
    console.error('Complete book error:', error);
    res.status(500).json({
      success: false,
      message: 'Error marking book as completed'
    });
  }
});

export default router; 