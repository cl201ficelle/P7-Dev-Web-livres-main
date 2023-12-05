const express = require('express');
// instance router express
const router = express.Router();
// importation module controleur utilisateur (logique métier)
const userCtrl = require('../controllers/user');

// gère route inscription nouvel utilisateur
router.post('/signup', userCtrl.signup);
// gère route connexion utilisateur
router.post('/login', userCtrl.login);

module.exports = router;