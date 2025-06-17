import express from 'express';
const router = express.Router();

// Dummy book data
let books = [
  {
    _id: 'book_1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    description: 'A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.',
    genre: 'Fiction',
    category: 'Classic',
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
    totalPages: 180,
    language: 'English',
    publishedYear: 1925,
    isbn: '978-0743273565',
    rating: 4.2,
    reviewCount: 1250,
    content: 'In my younger and more vulnerable years my father gave me some advice that I\'ve been turning over in my mind ever since...',
    tags: ['classic', 'romance', 'drama'],
    readingLevel: 'Intermediate',
    estimatedReadingTime: 240, // minutes
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-01-15')
  },
  {
    _id: 'book_2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    description: 'The story of young Scout Finch and her father Atticus in a racially divided Alabama town.',
    genre: 'Fiction',
    category: 'Classic',
    coverImage: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400',
    totalPages: 281,
    language: 'English',
    publishedYear: 1960,
    isbn: '978-0446310789',
    rating: 4.5,
    reviewCount: 2100,
    content: 'When he was nearly thirteen, my brother Jem got his arm badly broken at the elbow...',
    tags: ['classic', 'drama', 'social-issues'],
    readingLevel: 'Intermediate',
    estimatedReadingTime: 360,
    createdAt: new Date('2023-02-10'),
    updatedAt: new Date('2023-02-10')
  },
  {
    _id: 'book_3',
    title: '1984',
    author: 'George Orwell',
    description: 'A dystopian novel about totalitarianism and surveillance society.',
    genre: 'Fiction',
    category: 'Science Fiction',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400',
    totalPages: 328,
    language: 'English',
    publishedYear: 1949,
    isbn: '978-0451524935',
    rating: 4.3,
    reviewCount: 1800,
    content: 'It was a bright cold day in April, and the clocks were striking thirteen...',
    tags: ['dystopian', 'political', 'science-fiction'],
    readingLevel: 'Advanced',
    estimatedReadingTime: 420,
    createdAt: new Date('2023-03-05'),
    updatedAt: new Date('2023-03-05')
  },
  {
    _id: 'book_4',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    description: 'A romantic novel of manners that follows the emotional development of Elizabeth Bennet.',
    genre: 'Fiction',
    category: 'Romance',
    coverImage: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400',
    totalPages: 432,
    language: 'English',
    publishedYear: 1813,
    isbn: '978-0141439518',
    rating: 4.4,
    reviewCount: 1650,
    content: 'It is a truth universally acknowledged, that a single man in possession of a good fortune...',
    tags: ['romance', 'classic', 'historical'],
    readingLevel: 'Intermediate',
    estimatedReadingTime: 480,
    createdAt: new Date('2023-04-12'),
    updatedAt: new Date('2023-04-12')
  },
  {
    _id: 'book_5',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    description: 'A fantasy novel about Bilbo Baggins, a hobbit who embarks on an adventure.',
    genre: 'Fiction',
    category: 'Fantasy',
    coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    totalPages: 310,
    language: 'English',
    publishedYear: 1937,
    isbn: '978-0547928227',
    rating: 4.6,
    reviewCount: 2200,
    content: 'In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole...',
    tags: ['fantasy', 'adventure', 'middle-earth'],
    readingLevel: 'Beginner',
    estimatedReadingTime: 390,
    createdAt: new Date('2023-05-20'),
    updatedAt: new Date('2023-05-20')
  }
];

// Get all books
router.get('/', (req, res) => {
  try {
    const { genre, category, search, page = 1, limit = 10 } = req.query;
    
    let filteredBooks = [...books];
    
    // Filter by genre
    if (genre) {
      filteredBooks = filteredBooks.filter(book => 
        book.genre.toLowerCase() === genre.toLowerCase()
      );
    }
    
    // Filter by category
    if (category) {
      filteredBooks = filteredBooks.filter(book => 
        book.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Search by title or author
    if (search) {
      const searchTerm = search.toLowerCase();
      filteredBooks = filteredBooks.filter(book => 
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm)
      );
    }
    
    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedBooks = filteredBooks.slice(startIndex, endIndex);
    
    res.json({
      success: true,
      data: {
        books: paginatedBooks,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(filteredBooks.length / limit),
          totalBooks: filteredBooks.length,
          hasNext: endIndex < filteredBooks.length,
          hasPrev: page > 1
        }
      }
    });

  } catch (error) {
    console.error('Get books error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching books'
    });
  }
});

// Get book by ID
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const book = books.find(b => b._id === id);
    
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    res.json({
      success: true,
      data: {
        book: book
      }
    });

  } catch (error) {
    console.error('Get book error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching book'
    });
  }
});

// Get books by genre
router.get('/genre/:genre', (req, res) => {
  try {
    const { genre } = req.params;
    const genreBooks = books.filter(book => 
      book.genre.toLowerCase() === genre.toLowerCase()
    );
    
    res.json({
      success: true,
      data: {
        books: genreBooks,
        genre: genre,
        count: genreBooks.length
      }
    });

  } catch (error) {
    console.error('Get books by genre error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching books by genre'
    });
  }
});

// Get books by category
router.get('/category/:category', (req, res) => {
  try {
    const { category } = req.params;
    const categoryBooks = books.filter(book => 
      book.category.toLowerCase() === category.toLowerCase()
    );
    
    res.json({
      success: true,
      data: {
        books: categoryBooks,
        category: category,
        count: categoryBooks.length
      }
    });

  } catch (error) {
    console.error('Get books by category error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching books by category'
    });
  }
});

// Search books
router.get('/search/:query', (req, res) => {
  try {
    const { query } = req.params;
    const searchTerm = query.toLowerCase();
    
    const searchResults = books.filter(book => 
      book.title.toLowerCase().includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm) ||
      book.description.toLowerCase().includes(searchTerm) ||
      book.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
    
    res.json({
      success: true,
      data: {
        books: searchResults,
        query: query,
        count: searchResults.length
      }
    });

  } catch (error) {
    console.error('Search books error:', error);
    res.status(500).json({
      success: false,
      message: 'Error searching books'
    });
  }
});

// Get popular books (by rating)
router.get('/popular/top', (req, res) => {
  try {
    const { limit = 5 } = req.query;
    
    const popularBooks = books
      .sort((a, b) => b.rating - a.rating)
      .slice(0, parseInt(limit));
    
    res.json({
      success: true,
      data: {
        books: popularBooks,
        count: popularBooks.length
      }
    });

  } catch (error) {
    console.error('Get popular books error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching popular books'
    });
  }
});

// Get recently added books
router.get('/recent/added', (req, res) => {
  try {
    const { limit = 5 } = req.query;
    
    const recentBooks = books
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, parseInt(limit));
    
    res.json({
      success: true,
      data: {
        books: recentBooks,
        count: recentBooks.length
      }
    });

  } catch (error) {
    console.error('Get recent books error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching recent books'
    });
  }
});

// Get book content (for reading)
router.get('/:id/content', (req, res) => {
  try {
    const { id } = req.params;
    const book = books.find(b => b._id === id);
    
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    res.json({
      success: true,
      data: {
        bookId: book._id,
        title: book.title,
        author: book.author,
        content: book.content,
        totalPages: book.totalPages,
        estimatedReadingTime: book.estimatedReadingTime
      }
    });

  } catch (error) {
    console.error('Get book content error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching book content'
    });
  }
});

// Get book statistics
router.get('/:id/stats', (req, res) => {
  try {
    const { id } = req.params;
    const book = books.find(b => b._id === id);
    
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    res.json({
      success: true,
      data: {
        bookId: book._id,
        title: book.title,
        rating: book.rating,
        reviewCount: book.reviewCount,
        totalPages: book.totalPages,
        estimatedReadingTime: book.estimatedReadingTime,
        readingLevel: book.readingLevel,
        publishedYear: book.publishedYear
      }
    });

  } catch (error) {
    console.error('Get book stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching book statistics'
    });
  }
});

export default router; 