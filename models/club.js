const mongoose = require('mongoose')

const clubSchema = new mongoose.Schema({
    clubName: { 
        type: String, 
        required: true, 
        unique: true
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    books: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    }]
})

const Club = mongoose.model('Club', clubSchema)
module.exports = Club