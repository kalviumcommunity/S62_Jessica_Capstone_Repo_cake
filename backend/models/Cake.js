const mongoose = require('mongoose');

const cakeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        medium: {
            type: Number,
            required: true
        },
        large: {
            type: Number,
            required: true
        }
    },
    imageUrl: String,
    }, { timestamps: true });

module.exports = mongoose.model('Cake', cakeSchema);