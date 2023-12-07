// framework d'application web pour Node.js
const express = require('express');
// Crée une instance du routeur Express
const router = express.Router();
// Middleware pour authentification
const auth = require('../middleware/auth');
// récupération module de contrôleur pour gérer différentes opérations (get, delete...)
const bookCtrl = require('../controllers/book');
// gère fichier
const multer = require('../middleware/multer-config');


// gère création nouveau livre. nécessite d'être authentifié, + multer
router.post('/', auth, multer, bookCtrl.createBook);
// gère modification livre, nécessite d'être authentifié + multer
router.put('/:id', auth, multer, bookCtrl.modifyBook);
// gère suppression livre, nécessite d'être authentifié
router.delete('/:id', auth, bookCtrl.deleteBook);
// récupère info d'un seul livre selon son ID
router.get("/:id", bookCtrl.getOneBook);
// récupère tous les livres pour les afficher sur page accueil
router.get('/', bookCtrl.getAllBooks);

module.exports = router;






