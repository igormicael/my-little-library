var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var bookSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    picture: {
        type: String
    },
    synopsis: {
        type: String
    }
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Books = mongoose.model('Book', bookSchema);

// make this available to our Node applications
module.exports = Books;