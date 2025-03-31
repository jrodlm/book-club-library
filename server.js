const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const path = require("path");
const session = require('express-session');

// APP SCHEMA REFERENCES 
const Book = require('./models/book')

// MIDDLEWARE VARIABLES
const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');

// CONTROLLER VARIABLES 
const authController = require('./controllers/auth.js');
const booksController = require('./controllers/books');

// PORT
const port = process.env.PORT ? process.env.PORT : '3000';

// DATABASE LINK 
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// EXPRESS MOUNTING OF CONTROLLERS AND MIDDLEWARE 
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passUserToView);

app.get('/', (req, res) => {
    res.render('home.ejs', {
      user: req.session.user,
    });
  });


app.use('/auth', authController);
app.use(isSignedIn);
app.use('./books', booksController);


app.listen(port, () => {
    console.log(`The express app is ready on port ${port}!`);
  });
