var mongoose = require('mongoose');
const bcrypt = require('bcrypt');


var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type:String,
        required: true
    },

    house:{
        type: mongoose.Schema.Types.ObjectId,
        ref: '../House/house.model',
        required: true
    }
});

userSchema.pre('save', function (next) {
    let user = this;
    user.password = bcrypt.hashSync(user.password, 10);
    next();
});
var User = mongoose.model('User', userSchema);
module.exports = User;