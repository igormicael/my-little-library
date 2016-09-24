/**
 * Created by igor on 23/09/2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var authorsSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image:{
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Authors = mongoose.model('Authors', authorsSchema);

// make this available to our Node applications
module.exports = Authors;