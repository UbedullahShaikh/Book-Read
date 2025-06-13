/**
 * 💬 Chat Model
 * Stores AI chat conversations for each book per user
 */

export const chatSchema = {
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
  
  // 💬 Chat Information
  title: {
    type: String,
    maxlength: 200,
    default: 'New Chat'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  
  // 📝 Messages Array
  messages: [{
    _id: String,                  // Unique message ID
    role: {
      type: String,
      enum: ['user', 'assistant', 'system'],
      required: true
    },
    content: {
      type: String,
      required: true,
      maxlength: 10000
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    
    // 🤖 AI-specific fields
    model: {
      type: String,
      default: 'gpt-3.5-turbo'    // AI model used
    },
    tokens: {
      type: Number,
      default: 0                  // Token count for billing
    },
    
    // 📄 Context from book
    context: {
      pageNumber: {
        type: Number,
        default: null
      },
      chapter: {
        type: String,
        default: null
      },
      relatedText: {
        type: String,
        maxlength: 1000,
        default: ''
      }
    },
    
    // 🎯 Message metadata
    metadata: {
      isEdited: {
        type: Boolean,
        default: false
      },
      editHistory: [{
        content: String,
        editedAt: Date
      }],
      reactions: [{
        type: String,
        enum: ['like', 'dislike', 'helpful', 'confusing']
      }],
      feedback: {
        type: String,
        maxlength: 500,
        default: ''
      }
    }
  }],
  
  // 🏷️ Chat Categories & Tags
  category: {
    type: String,
    enum: ['general', 'analysis', 'questions', 'summary', 'discussion'],
    default: 'general'
  },
  tags: [{
    type: String,
    maxlength: 30
  }],
  
  // 📊 Chat Statistics
  stats: {
    totalMessages: {
      type: Number,
      default: 0,
      min: 0
    },
    totalTokens: {
      type: Number,
      default: 0,
      min: 0
    },
    averageResponseTime: {
      type: Number,
      default: 0,                 // Milliseconds
      min: 0
    },
    lastActivityAt: {
      type: Date,
      default: Date.now
    }
  },
  
  // ⚙️ Chat Settings
  settings: {
    aiModel: {
      type: String,
      enum: ['gpt-3.5-turbo', 'gpt-4', 'claude-3', 'gemini'],
      default: 'gpt-3.5-turbo'
    },
    temperature: {
      type: Number,
      min: 0,
      max: 2,
      default: 0.7
    },
    maxTokens: {
      type: Number,
      min: 100,
      max: 4000,
      default: 1000
    },
    includeBookContext: {
      type: Boolean,
      default: true
    },
    includeHighlights: {
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

// Helper functions for Chat model
export const chatHelpers = {
  // Create a new message
  createMessage: (role, content, context = {}) => {
    return {
      _id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      role,
      content,
      timestamp: new Date(),
      model: 'gpt-3.5-turbo',
      tokens: 0,
      context,
      metadata: {
        isEdited: false,
        editHistory: [],
        reactions: [],
        feedback: ''
      }
    };
  },

  // Add message to chat
  addMessage: (chat, message) => {
    const updatedChat = {
      ...chat,
      messages: [...chat.messages, message],
      stats: {
        ...chat.stats,
        totalMessages: chat.stats.totalMessages + 1,
        totalTokens: chat.stats.totalTokens + (message.tokens || 0),
        lastActivityAt: new Date()
      },
      updatedAt: new Date()
    };
    
    return updatedChat;
  },

  // Update chat statistics
  updateChatStats: (chat) => {
    const totalMessages = chat.messages.length;
    const totalTokens = chat.messages.reduce((sum, msg) => sum + (msg.tokens || 0), 0);
    
    return {
      ...chat,
      stats: {
        ...chat.stats,
        totalMessages,
        totalTokens,
        lastActivityAt: new Date()
      }
    };
  },

  // Get chat summary
  getChatSummary: (chat) => {
    const userMessages = chat.messages.filter(msg => msg.role === 'user');
    const assistantMessages = chat.messages.filter(msg => msg.role === 'assistant');
    
    return {
      id: chat._id,
      title: chat.title,
      category: chat.category,
      totalMessages: chat.stats.totalMessages,
      userMessages: userMessages.length,
      assistantMessages: assistantMessages.length,
      lastActivity: chat.stats.lastActivityAt,
      createdAt: chat.createdAt
    };
  },

  // Search messages in chat
  searchMessages: (chat, searchTerm) => {
    const term = searchTerm.toLowerCase();
    return chat.messages.filter(message => 
      message.content.toLowerCase().includes(term)
    );
  },

  // Get recent messages
  getRecentMessages: (chat, limit = 10) => {
    return chat.messages
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, limit);
  },

  // Format chat for display
  formatChat: (chat) => {
    return {
      id: chat._id,
      title: chat.title,
      category: chat.category,
      lastMessage: chat.messages[chat.messages.length - 1]?.content || '',
      lastActivity: chat.stats.lastActivityAt,
      messageCount: chat.stats.totalMessages,
      isActive: chat.isActive
    };
  },

  // Validate message content
  validateMessage: (content) => {
    if (!content || content.trim().length === 0) {
      return { valid: false, error: 'Message cannot be empty' };
    }
    
    if (content.length > 10000) {
      return { valid: false, error: 'Message too long (max 10,000 characters)' };
    }
    
    return { valid: true };
  },

  // Estimate token count (rough approximation)
  estimateTokens: (text) => {
    // Rough approximation: 1 token ≈ 4 characters
    return Math.ceil(text.length / 4);
  }
};

// Chat categories
export const chatCategories = {
  general: { name: 'General Discussion', icon: '💬' },
  analysis: { name: 'Book Analysis', icon: '📊' },
  questions: { name: 'Questions & Answers', icon: '❓' },
  summary: { name: 'Summary & Notes', icon: '📝' },
  discussion: { name: 'Deep Discussion', icon: '🤔' }
};

// AI models configuration
export const aiModels = {
  'gpt-3.5-turbo': {
    name: 'GPT-3.5 Turbo',
    maxTokens: 4096,
    costPerToken: 0.000002,
    description: 'Fast and efficient for most tasks'
  },
  'gpt-4': {
    name: 'GPT-4',
    maxTokens: 8192,
    costPerToken: 0.00003,
    description: 'More capable but slower and more expensive'
  },
  'claude-3': {
    name: 'Claude 3',
    maxTokens: 100000,
    costPerToken: 0.000015,
    description: 'Excellent for long-form content'
  },
  'gemini': {
    name: 'Gemini',
    maxTokens: 32768,
    costPerToken: 0.00001,
    description: 'Good balance of speed and capability'
  }
};

// Chat templates for common scenarios
export const chatTemplates = {
  bookAnalysis: {
    title: 'Book Analysis',
    category: 'analysis',
    initialMessage: 'Can you help me analyze this book? I\'d like to understand its themes, characters, and key insights.',
    settings: {
      aiModel: 'gpt-4',
      temperature: 0.3,
      includeBookContext: true,
      includeHighlights: true
    }
  },
  
  chapterSummary: {
    title: 'Chapter Summary',
    category: 'summary',
    initialMessage: 'Please provide a detailed summary of this chapter with key points and important quotes.',
    settings: {
      aiModel: 'gpt-3.5-turbo',
      temperature: 0.2,
      includeBookContext: true,
      includeHighlights: false
    }
  },
  
  questionAnswer: {
    title: 'Q&A Session',
    category: 'questions',
    initialMessage: 'I have some questions about this book. Can you help me understand certain concepts better?',
    settings: {
      aiModel: 'gpt-3.5-turbo',
      temperature: 0.7,
      includeBookContext: true,
      includeHighlights: true
    }
  }
}; 