var express = require('express');
var router = express.Router();

const Book = require('../models').Book;

/* Handler function to wrap each route. */
function asyncHandler(callbackFn) {
  return async(req, res, next) => {
    try {
      await callbackFn(req, res, next)
    } catch(error) {
      // Forward error to the global error handler
      next(error);
    }
  }
}

// get / - Home route should redirect to the /books route
router.get('/', asyncHandler(async (req, res) => {
  res.redirect('/books');
}));

// get /books - Shows the full list of books
router.get('/books', asyncHandler(async (req, res) => {
  const books = await Book.findAll({
    order: [
      ["author", "ASC"]
    ]
  });
  res.render('index.pug', { title: 'Books', books });
}));

// get /books/new - Shows the create new book form
router.get('/books/new', asyncHandler(async (req, res) => {
  res.render('new-book.pug', { title: 'New Book' });
}));

// post /books/new - Posts a new book to the database
router.post('/books/new', asyncHandler(async (req, res) => {
  let book;
  try {
    book = await Book.create(req.body);
    res.redirect('/books');
  } catch(error) {
    if (error.name === "SequelizeValidationError") { // checking the error
      book = await Book.build(req.body);
      res.render('new-book.pug', { title: "New Book", errors: error.errors });
    } else {
      throw error; // error caught in the asyncHandler's catch block
    }
  }
}));

// get /books/:id - Shows book detail form
router.get('/books/:id', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if(book) {
    res.render('update-book.pug', { title: book.title, book });
  } else {
    const error = new Error('The book you are looking for does not exist.🤷‍♂️');
    error.status = 404; // http 404 == not found
    throw error;        // let the error handler below handle it further    
  }
}));

// post /books/:id - Updates book info in the database
router.post('/books/:id', asyncHandler(async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if(book) {
      await book.update(req.body);
      res.redirect('/books');
    } else {
      const error = new Error('The book you are trying to update does not exist anymore.🤷‍♂️');
      error.status = 404; // http 404 == not found
      throw error;        // let the error handler below handle it further    
    }  
  } catch(error) {
    if (error.name === "SequelizeValidationError") { // checking the error
      book = await Book.build(req.body);
      book.id = req.params.id; // make sure correct book gets updated
      res.render('update-book.pug', { 
        title: book.title, book, errors: error.errors })
    } else {
      throw error; // error caught in the asyncHandler's catch block
    }
  }
}));

// post /books/:id/delete - Deletes a book
router.post('/books/:id/delete', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if(book) {
    await book.destroy();
    res.redirect('/books');
  } else {
    const error = new Error('The book you are trying to delete was already deleted.🤷‍♂️');
    error.status = 404; // http 404 == not found
    throw error;        // let the error handler below handle it further    
  }  
}));

module.exports = router;