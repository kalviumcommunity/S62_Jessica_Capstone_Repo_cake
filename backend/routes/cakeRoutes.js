const express = require('express');
const app = express.Router();
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const Cake = require('../models/Cake');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    }, 
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

app.post('/', upload.single('image'), async (req, res) => {
    try {
        const {name, description } = req.body;

        const mediumPrice = parseFloat(req.body['price.medium']);
        const largePrice = parseFloat(req.body['price.large']);

        if (isNaN(mediumPrice) || isNaN(largePrice)) {
            return res.status(400).json({ message: 'Invalid price values' });
        }

        const newCake = new Cake({
            name,
            description,
            price: {
                medium: mediumPrice,
                large: largePrice
            },
            imageUrl: req.file ? req.file.path : null,
        });

        await newCake.save();
        res.status(201).json(newCake);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = app;