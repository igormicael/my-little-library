/**
 * Created by igor on 24/09/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var seriesSchema = new Schema ({
    name : {
        type: String,
        required: true,
        unique: true
    },
    books: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Books'
    }]
},{
    timestamps : true
});

var Series = mongoose.model('Series', seriesSchema);

module.exports = Series;