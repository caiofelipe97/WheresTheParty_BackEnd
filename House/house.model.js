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

    imageUrl: {
        type:String,
        required: true
    },

    shows: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: '../Party/party.model'
    }]
});

module.exports = mongoose.model('House', houseSchema);
