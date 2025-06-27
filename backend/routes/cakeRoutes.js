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

app.get('/', async (req, res) => {
    try {
        const cakes = await Cake.find();
        res.json(cakes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/:id', async (req, res) => {
    try {
        const cake = await Cake.findById(req.params.id);
        if (!cake) return res.status(404).json({ message: 'Cake not found' });
        res.json(cake);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const { name, description } = req.body;

        const mediumPrice = parseFloat(req.body['price.medium']);
        const largePrice = parseFloat(req.body['price.large']);

        if (isNaN(mediumPrice) || isNaN(largePrice)) {
            return res.status(400).json({ message: 'Invalid price values' });
        }

        const updateFields = {
            name,
            description,
            price: {
                medium: mediumPrice,
                large: largePrice
            }
        };

        if (req.file) {
            updateFields.imageUrl = req.file.path;
        }

        const updatedCake = await Cake.findByIdAndUpdate(
            req.params.id,
            updateFields,
            { new: true }
        );

        if (!updatedCake) {
            return res.status(404).json({ message: 'Cake not found' });
        }

        res.status(200).json(updatedCake);
    } catch (err) {
        console.error('PUT error:', err);

        res.status(500).json({ message: err.message });

        res.status(500).json({ message: err.message })

    }
});

module.exports = app;