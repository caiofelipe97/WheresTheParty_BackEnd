var mongoose = require('mongoose');


var partySchema = new mongoose.Schema({
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

    date:{
        type: Date,
        required: true
    },

    hour:{
        type: String,
        required: true
    }

});

module.exports = mongoose.model('Party', partySchema);
