const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user.js');

router.get('/sign-up', (req, res) => {
    res.render('auth/sign-up.ejs');
});

router.get('/sign-in', (req, res) => {
    res.render('auth/sign-in.ejs');
});

router.get('/sign-out', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

router.post('/sign-up', async (req, res) => {
    try {
        const userInDatabase = await User.findOne({ username: req.body.username });
        if (userInDatabase) {
            return res.send('Username already taken.');
        }

        if (req.body.password !== req.body.confirmPassword) {
            return res.send('Password and Confirm Password must match');
        }

        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        req.body.password = hashedPassword;

        // need to add an if statement for whether a not a user is an admin or just a member

        const newUser = {
            username: req.body.username,
            password: hashedPassword,
            role: req.body.role
            // You can add club if you're collecting it later
          };
    
          const createdUser = await User.create(newUser);
          console.log(createdUser)

        res.redirect('/auth/sign-in');
    } catch (error) {
        console.error('SIGN-UP ERROR:', error.message);
        res.send('Sign-up failed: ' + error.message);
    }
});

router.post('/sign-in', async (req, res) => {
    try {
        const userInDatabase = await User.findOne({ username: req.body.username });
        if (!userInDatabase) {
            return res.send('Login failed. Please try again.');
        }
        const validPassword = bcrypt.compareSync(
            req.body.password,
            userInDatabase.password
        );
        if (!validPassword) {
            return res.send('Login failed. Please try again.');
        }
        req.session.user = {
            username: userInDatabase.username,
            _id: userInDatabase._id,
            role: userInDatabase.role 

        };

        res.redirect('/clubs');
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

module.exports = router;
