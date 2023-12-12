const express = require('express');
// interaction avec la BdD
const mongoose = require('mongoose');
// accès depuis différent domaines
const cors = require('cors');
const app = express();
const path = require('path');

// middleware analyse donnée au format JSON et les rend dispo dans prop req.body
app.use(express.json());
app.use(cors());

// connexion BdD
mongoose.connect('mongodb+srv://UserTest:fWTRlpNeRnv77wXH@cluster0.vznqtut.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,  
    useUnifiedTopology: true 
})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch((err) => console.error('Connexion à MongoDB échouée !', err));

// importation routes
const userRoutes = require('./routes/user');
const bookRoutes = require('./routes/book');
// utilisation routes définies pour endpoint auth et books : toutes routes définies dans userRoute préfixes api/auth
app.use('/api/auth', userRoutes);
app.use('/api/books', bookRoutes);
// utilisation express.static pour servir fichier statique (persistant)
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
