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
        type: String
    },

    house:{
        type: mongoose.Schema.Types.ObjectId,
        ref: '../House/house.model',
        required: true
    }
});

module.exports = mongoose.model('Party', partySchema);
