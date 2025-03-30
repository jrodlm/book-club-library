const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true, 
        clubs: [clubSchema] // <--- is this correct? 
    },
    author: { 
        type: String, 
        required: true, 
    },
    summary: { 
        type: String, 
        required: false,
    },
    discussionDate: [{ 
        type: Date,
        required: true, 
        // is the above accurate? 
    }],
    clubs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club'
    }]
});


const Book = mongoose.model('Book', bookSchema)
module.exports = Book