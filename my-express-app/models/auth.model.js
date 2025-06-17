/**
 * 🔐 Auth Model - Email Login Only
 * Handles authentication with email and password only
 * Links to User model via userRef
 */

export const authSchema = {
  _id: String,                    // Firebase Auth UID or MongoDB ObjectId
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,               // Required for email authentication
    minlength: 6
  },
  provider: {
    type: String,
    required: true,
    enum: ['email'],              // Only email authentication
    default: 'email'
  },
  userRef: {
    type: String,                 // Reference to User._id
    required: true
  },
  emailVerified: {
    type: Boolean,
    default: false                // Email verification required
  },
  lastLoginAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
};

// Helper functions for Auth model
export const authHelpers = {
  // Validate email format
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Validate password strength
  isValidPassword: (password) => {
    return password && password.length >= 6;
  },

  // Create auth document for email registration
  createFromEmail: (email, password, userRef) => {
    return {
      _id: `auth_${Date.now()}`, // Generate unique ID
      email: email.toLowerCase().trim(),
      password: password,         // Should be hashed in production
      provider: 'email',
      userRef: userRef,
      emailVerified: false,
      lastLoginAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
  },

  // Update last login
  updateLastLogin: (authDoc) => {
    return {
      ...authDoc,
      lastLoginAt: new Date(),
      updatedAt: new Date()
    };
  },

  // Mark email as verified
  markEmailVerified: (authDoc) => {
    return {
      ...authDoc,
      emailVerified: true,
      updatedAt: new Date()
    };
  },

  // Check if user is email authenticated
  isEmailUser: (authDoc) => {
    return authDoc.provider === 'email';
  },

  // Validate login credentials
  validateLogin: (email, password) => {
    return {
      isValidEmail: authHelpers.isValidEmail(email),
      isValidPassword: authHelpers.isValidPassword(password)
    };
  }
};