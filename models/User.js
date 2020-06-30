const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    highScore:{
        type: Number
    },
    currentScore:{
        type: Number
    }
});

const User = mongoose.model('User', UserSchema);

module.export = User;