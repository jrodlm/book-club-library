const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
    
  role: {
    type: String,
    enum: ['admin', 'member'],
    default: 'member',
  },
  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club',
    required: false,
  }

});

const User = mongoose.model('User', userSchema);

module.exports = User;