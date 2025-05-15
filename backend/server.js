const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('./multer.js');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/custom-cake', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('DB connection error: ', err));

const cakeRoutes = require('./routes/cakeRoutes');
app.use('/api/cakes', cakeRoutes);

const PORT =5001;
app.listen(PORT ,()=> console.log('Server running on port',`${PORT}`));