const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
    },
    orders: {
        type: Number,
        default: 0,
    },
    memberSince: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;