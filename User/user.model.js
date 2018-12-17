var mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


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
        ref: 'House',
        required: true
    }
});

userSchema.pre('save', function (next) {
    let user = this;
    user.password = bcrypt.hashSync(user.password, 10);
    next();
});
userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        console.log("deu ruim " + isMatch);
        cb(null, isMatch);
    });
};

var User = mongoose.model('User', userSchema);
module.exports = User;