// dépendance mongoose : bibliothèque pour mongodb et node.js
const mongoose = require('mongoose');

// schéma type d'un livre
const bookSchema = mongoose.Schema ({
  // identifiant user associé au livre (objectId si id généré par mongodb)
  userId : { type: String, required: true},
  title : { type: String, required: true },
  author : { type: String, required: true },
  imageUrl : { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: String, required: true },
  // tableau contenant évaluation attribué par user (userId : user qui a noté; grade : note entre 0 et 5)
  ratings: [{
    userId: { type: String, required: true },
    grade: { type: Number, required: true, min:0,max:5, },
  }],
  // note moyenne du livre : 0 par défaut
  averageRating : { type: Number, default: 0 },
  });

  // exportation modèle du livre créé à partir du schéma. Modèle nommé Book
  module.exports = mongoose.model('Book', bookSchema);