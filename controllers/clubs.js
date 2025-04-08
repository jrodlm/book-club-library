const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Book = require('../models/book.js');
const Club = require('../models/club.js');

router.get('/', async (req, res) => {
  const currentUser = await User.findById(req.session.user._id)
  console.log(currentUser)
  res.render('clubs/index.ejs');
})

// FORM FOR CREATING A NEW CLUB
router.get('/new', (req, res) => {
  if (req.session.user.role === 'admin') {
    res.render('clubs/new.ejs');
  } else {
    res.redirect('/');
  }
});


// THE ROUTE FOR CREATING A NEW CLUB AND ASSOCIATING IT WITH AN ADMIN (OR USER)
router.post('/', async (req, res) => {
  try {
    const newClub = await Club.create({
      clubName: req.body.clubName,
      members: [req.session.user._id]
    });

    await User.findByIdAndUpdate(req.session.user._id, {
      club: newClub._id
    });

    req.session.user.club = newClub._id;

    res.redirect('/');
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

module.exports = router;
