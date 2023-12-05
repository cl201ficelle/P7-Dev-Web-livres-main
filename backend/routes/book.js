// framework d'application web pour Node.js
const express = require('express');
// Middleware pour gérer les données de type multipart/form-data, utilisé pour le téléchargement de fichiers
const multer = require ('multer')
// Crée une instance du routeur Express
const router = express.Router();
// Configure Multer pour stocker les fichiers téléchargés dans le répertoire 'images'
const upload = multer({dest: 'images'})
// Middleware pour authentification
const auth = require('../middleware/auth');
// récupération module de contrôleur pour gérer différentes opérations (get, delete...)
const bookCtrl = require('../controllers/book');

// gère création nouveau livre. nécessite d'être authentifié, + téléchargement d'un fichier image
router.post('/', auth, upload.single('image'), bookCtrl.createBook);
// gère modification livre, nécessite d'être authentifié
router.put('/:id', auth, bookCtrl.modifyBook);
// gère suppression livre, nécessite d'être authentifié
router.delete('/:id', auth, bookCtrl.deleteBook);
// récupère info d'un seul livre selon son ID
router.get("/:id", bookCtrl.getOneBook);
// récupère tous les livres pour les afficher sur page accueil
router.get('/', bookCtrl.getAllBooks);

module.exports = router;






