/**
 * Created by igor on 24/09/2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userBookSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required : true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Books',
        required : true
    },
    readingStatus : {
        type: String,
        enum: ['READ','READING','RE-READING','ABANDONED']
    },
    comment : {
        type: String
    },
    recommend: {
        type: Boolean
    },
    mediaType: {
        type: String,
        enum: ['ANALOGICAL','DIGITAL','AUDIO']
    },
    evaluation: {
        type: String,
        enum: ['TERRIBLE','BAD','MEDIUM','GOOD','EXCELLENT']
    }
},{
    timestamps: true
});

var UserBook = mongoose.model('UserBook', userBookSchema);

module.exports = UserBook;