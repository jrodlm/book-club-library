const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Book = require('../models/book.js');
const Club = require('../models/club.js');

// ALL BOOK ROUTES --- I.N.D.U.C.E.S //

// INDEX OF BOOKS - WILL SHOW ALL OF THE CLUB'S BOOKS 
router.get('/', async (req, res) => {
  try {
    const allBooks = await Book.find().populate('clubs');
    res.render('books/index.ejs', {
      books: allBooks
    });
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});


// SHOW BOOK SUMMARY ROUTE 
router.get('/:bookId/show', async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);

    if (!book) {
      return res.send('Book not found.');
    }

    res.render('books/show.ejs', {
      book: book,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// NEW BOOK FORM - WILL SHOW FORM FOR ADDING A NEW BOOK TO THE 'LIBRARY'
router.get('/new', async (req, res) => {
  try {
    const books = await Book.find();
    res.render('books/new.ejs', { books });
  } catch (err) {
    console.error('Error adding book:', error);
    res.redirect('/');
  }
});

// CREATE ROUTE FOR ADDING A NEW BOOK 
router.post('/', async (req, res) => {
  try {
    const newBook = new Book({
      title: req.body.title,
      author: req.body.author,
      summary: req.body.summary,
      discussionDate: [new Date(req.body.discussionDate)],
      user: req.session.user._id,
    });

    await newBook.save();
    res.redirect('/books');
  } catch (err) {
    console.error('Error adding book:', error);
    res.redirect('/');
  }
});


// EDIT BOOK FORM - WILL SHOW BOOK EDITING FORM 
router.get('/:id/edit', async (req, res) => {
  try {
    const bookToEdit = await Book.findById(req.params.id);
    res.render('books/edit.ejs', { book: bookToEdit });
  } catch (error) {
    console.error('edit form error:', error);
    res.redirect('/books');
  }
});

// UPDATE BOOK ROUTE 
router.put('/:id', async (req, res) => {
  try {
    await Book.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      author: req.body.author,
      summary: req.body.summary,
      discussionDate: [new Date(req.body.discussionDate)],
      user: req.session.user._id,
    });
    res.redirect('/books');
  } catch (error) {
    console.error('Error adding book:', error);
    res.redirect('/books');
  }
});


// DELETE BOOK ROUTE 
router.delete('/:bookId', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.bookId);
    res.redirect('/books');
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});


module.exports = router

