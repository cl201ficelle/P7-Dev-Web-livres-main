const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const path = require('path');

app.use(express.json());
app.use(cors());


mongoose.connect('mongodb+srv://UserTest:fWTRlpNeRnv77wXH@cluster0.vznqtut.mongodb.net/?retryWrites=true&w=majority', {
})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch((err) => console.error('Connexion à MongoDB échouée !', err));

// routes
const userRoutes = require('./routes/user');
const bookRoutes = require('./routes/book');
app.use('/api/auth', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));


app.get('/', (req, res) => {
    res.send('Hello, this is the root path!');
});

module.exports = app;
