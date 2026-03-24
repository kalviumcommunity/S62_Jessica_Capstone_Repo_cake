const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({

    cakeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cake",
        required: true
    },

    name: {
        type: String,
        required: true
    },

    rating: {
        type: Number,
        required: true
    },

    comment: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Review", reviewSchema);