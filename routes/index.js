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
  res.render('new-book.pug');
}));

// post /books/new - Posts a new book to the database
router.post('/books/new', asyncHandler(async (req, res) => {
  res.redirect('/books');
}));

// get /books/:id - Shows book detail form
router.get('/books/:id', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  res.render('update-book.pug', { title: book.title, book });
}));

// post /books/:id - Updates book info in the database
router.post('/books/:id', asyncHandler(async (req, res) => {
  res.redirect('/books');
}));

// post /books/:id/delete - Deletes a book
router.post('/books/:id/delete', asyncHandler(async (req, res) => {
  res.redirect('/books');
}));

module.exports = router;
