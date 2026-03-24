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
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        default: "General"
    }
    }, { timestamps: true });

module.exports = mongoose.model("Cake", cakeSchema);