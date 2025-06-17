const sharedData = {
  users: [],
  authRecords: [],
  books: [],
  highlights: [],
  chats: []
};

const generateId = () => `id_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
const isValidPassword = (password) => {
  return password && password.length >= 6;
};
const findUserById = (userId) => {
  return sharedData.users.find(u => u._id === userId);
};

const findUserByEmail = (email) => {
  return sharedData.users.find(u => u.email === email.toLowerCase());
};

const findAuthByEmail = (email) => {
  return sharedData.authRecords.find(auth => auth.email === email.toLowerCase());
};

const createUser = (userData) => {
  const newUser = {
    _id: generateId(),
    name: userData.name.trim(),
    email: userData.email.toLowerCase().trim(),
    avatar: null,
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
  };
  
  sharedData.users.push(newUser);
  return newUser;
};

const createAuthRecord = (authData) => {
  const newAuth = {
    _id: generateId(),
    email: authData.email.toLowerCase().trim(),
    password: authData.password,
    provider: 'email',
    userRef: authData.userRef,
    emailVerified: false,
    lastLoginAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  sharedData.authRecords.push(newAuth);
  return newAuth;
};

const updateUser = (userId, updates) => {
  const userIndex = sharedData.users.findIndex(u => u._id === userId);
  if (userIndex !== -1) {
    sharedData.users[userIndex] = { ...sharedData.users[userIndex], ...updates, updatedAt: new Date() };
    return sharedData.users[userIndex];
  }
  return null;
};

const updateAuthRecord = (email, updates) => {
  const authIndex = sharedData.authRecords.findIndex(auth => auth.email === email.toLowerCase());
  if (authIndex !== -1) {
    sharedData.authRecords[authIndex] = { ...sharedData.authRecords[authIndex], ...updates, updatedAt: new Date() };
    return sharedData.authRecords[authIndex];
  }
  return null;
};

// Export the shared data and functions
export {
  sharedData,
  generateId,
  isValidEmail,
  isValidPassword,
  findUserById,
  findUserByEmail,
  findAuthByEmail,
  createUser,
  createAuthRecord,
  updateUser,
  updateAuthRecord
}; 