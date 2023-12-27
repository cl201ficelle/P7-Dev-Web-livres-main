// bibliothèque pour mongodb, interface modélisation données
const mongoose = require('mongoose');
// pour avoir adresse mail unique : pas possible d'avoir deux comptes avec la même adresse mail
const uniqueValidator = require('mongoose-unique-validator');

// schéma user : email unique, requis, et mdp requis
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// application du plugin au schéma de l'utilisateur
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);