const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Use middleware before defining routes
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://UserTest:fWTRlpNeRnv77wXH@cluster0.vznqtut.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch((err) => console.error('Connexion à MongoDB échouée !', err));

// Define routes
const userRoutes = require('./routes/user');
const bookRoutes = require('./routes/stuff');
app.use('/api/auth', userRoutes);
app.use('/api/books', bookRoutes);

// Root path
app.get('/', (req, res) => {
    res.send('Hello, this is the root path!');
});

module.exports = app;
