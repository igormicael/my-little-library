var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*var categorySchema = new Schema({
    type: String,
    enum: ['ROMANCE', 'FICTION', 'MANUAL', 'ADVENTURE']

});*/

// create a schema
var bookSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    picture: {
        type: String,
        default: ""
    },
    synopsis: {
        type: String,
        default: ""
    },
    authors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Authors'
    }], categories: [{
        type: String,
        enum: ['ROMANCE', 'FICTION', 'MANUAL', 'ADVENTURE']
    }]
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Books = mongoose.model('Books', bookSchema);

// make this available to our Node applications
module.exports = Books;