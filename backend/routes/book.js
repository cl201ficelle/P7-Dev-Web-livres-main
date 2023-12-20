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

// création nouveau livre
router.post('/', auth, multer, bookCtrl.createBook);
// notation
router.post('/:id/rating', auth, bookCtrl.rate);
// mieux notés
router.get("/bestrating", bookCtrl.bestRating);
// récupère info un seul livre selon ID
router.get("/:id", bookCtrl.getOneBook);
// récupère tous les livres
router.get('/', bookCtrl.getAllBooks);
// gère modification 
router.put('/:id', auth, multer, bookCtrl.modifyBook);
// gère suppression livre
router.delete('/:id', auth, bookCtrl.deleteBook);


module.exports = router;






