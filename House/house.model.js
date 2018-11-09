var mongoose = require('mongoose');


var houseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    contact:{
        type: String
    },
    imageUrl: {
        type:String,
        required: true
    }
});

module.exports = mongoose.model('House', houseSchema);
