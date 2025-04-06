const User = require('../models/user');

// THIS ROUTE ASSOCIATES ADMINS AND MEMBERS WITH THEIR RESPECTIVE CLUB
const passUserToView = async (req, res, next) => {
  console.log('[Middleware] passUserToView running...');
  if (req.session.user) {
    try {
      const currentUser = await User.findById(req.session.user._id).populate('club');
      console.log('User from DB:', currentUser);
      res.locals.user = {
        _id: currentUser._id,
        username: currentUser.username,
        role: currentUser.role,
        club: currentUser.club || null
      };
    } catch (err) {
      console.error('Error populating user in middleware:', err);
      res.locals.user = null;
    }
  } else {
    res.locals.user = null;
  }

  next();
};

module.exports = passUserToView;

