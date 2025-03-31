const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Book = require('../models/book.js');
const Club = require('../models/club.js');

// ALL BOOK ROUTES --- I.N.D.U.C.E.S //
// INDEX OF BOOKS - WILL SHOW ALL OF THE CLUB'S BOOKS 
router.get('/', async (req, res) => {
    try {
     const allBooks = await Book.find()
     console.log(allBooks)
     res.render('books/index.ejs', {
         books: allBooks 
     });
    } catch (error) {
      console.log(error)
      res.redirect('/')
    }    
});

// NEW BOOK FORM - WILL SHOW FORM FOR ADDING A NEW BOOK TO THE 'LIBRARY'
router.get('/new', async (req, res) => {
    try {
      const books = await Book.find();
      res.render('books/new.ejs', { books });
    } catch (err) {
      console.error('Error adding book:', err);
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
        user: req.session.user._id, // not sure why I should need this if I include the club.
          // clubs: [req.session.user.club] want to include but must figure out rest of code
      });
  
      await newBook.save();
      res.redirect('/books');
    } catch (err) {
      console.error('Error adding book:', err);
      res.redirect('/');
    }
  });


// EDIT BOOK FORM - WILL SHOW BOOK EDITING FORM 
router.get('/:id/edit', async (req, res) => {
  try {
    const bookToEdit = await Book.findById(req.params.id);
    res.render('books/edit.ejs', { book: bookToEdit });
  } catch (err) {
    console.error('edit form error:', err);
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
      user: req.session.user._id, //decision outstanding on keeping this line. 
        // clubs: [req.session.user.club] want to include but must figure out rest of code
    });
    res.redirect('/books');
  } catch (err) {
    console.error('Error adding book:', err);
    res.redirect('/books');
  }
});


  module.exports = router 

