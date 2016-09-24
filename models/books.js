var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var custom = [
    function(value) {
        // 'this' is the document being validated
        return this.possibleValues && this.possibleValues.indexOf(value) !== -1;
    },
    'value must be contained in possbileValues'
];

var categorySchema = new Schema({
    possibleValues: ['ROMANCE', 'FICTION','MANUAL','ADVENTURE'], //
    value: {
        type: String,
        validate: custom
    }

});
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
    },
    authors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Authors'
    }],
    categories: [categorySchema]
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Books = mongoose.model('Book', bookSchema);

// make this available to our Node applications
module.exports = Books;