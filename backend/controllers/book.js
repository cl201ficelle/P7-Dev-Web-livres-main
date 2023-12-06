const Book = require('../models/book');
// importation module FileSystem : permettra de supprimer fichier
const fs = require('fs');
const optimise = require('../middleware/sharp-config');
const path = require('path');

exports.createBook = (req, res, next) => {
  //  console.log('Requête reçue. Données du body :', req.body);
  // convertie string info livre en objet JS 
  const bookObject = JSON.parse(req.body.book);
  // suppression id pour s'assurer que user ne triche pas 
  delete bookObject._id;
  delete bookObject._userId;
  // récupération nom image originale
  const originalFileName = req.file.filename;
  // obtenir nom fichier sans extension
  const fileNameWithoutExt = path.parse(originalFileName).name;
  // modification nom image optimisée
  const optimizedImageName = `optimized-${fileNameWithoutExt}.webp`;
  const optimizedImagePath = `./images/${optimizedImageName}`;
  // utilisation sharp config
  optimise(req.file.path, optimizedImagePath, 404, 568, 'webp', (err) => {
        if (err) {
            return res.status(401).json({ error: err.message });
        }
  // nouvelle instance modèle Book avec données extraites + ajout ID user objet req
  const book = new Book({
    // synthaxe spread pour inclure toutes propriétés du book
      ...bookObject,
      userId: req.auth.userId,
      // génère URL image menant à l'image stockée
      imageUrl: `${req.protocol}://${req.get('host')}/images/${resizedImageName}`,     
  });
  // enregistrement livre dans BdD
  book.save()
      .then(() => { res.status(201).json({message: 'Livre enregistré!'})})
      .catch(error => { res.status(400).json( { error })
    });
  })
};


exports.getOneBook = (req, res, next) => {
  // recherche livre dans BdD on fonction ID 
  Book.findOne({
    // extrait identifiant route API
    _id: req.params.id
  }).then(
    (book) => {
      res.status(200).json(book);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifyBook = (req, res, next) => {
  // vérification si une nouvelle image est téléchargée : si présente, inclue dans construction bookObject
  const bookObject = req.file ? {
      ...JSON.parse(req.body.book),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };
// suppression userid 
  delete bookObject._userId;
  // recherche du livre à modifier en fonction ID
  Book.findOne({_id: req.params.id})
      .then((book) => {
        // vérification si user est celui qui a créé le livre
          if (book.userId != req.auth.userId) {
              res.status(401).json({ message : 'Not authorized'});
          } else {
            // mise à jour du livre dans BdD
              Book.updateOne({ _id: req.params.id}, { ...bookObject, _id: req.params.id})
              .then(() => res.status(200).json({message : 'Livre modifié!'}))
              .catch(error => res.status(401).json({ error }));
          }
      })
      .catch((error) => {
          res.status(400).json({ error });
      });
};

exports.deleteBook = (req, res, next) => {
  // recherche livre à supprimer en fonction ID
  Book.findOne({ _id: req.params.id})
      .then(book => {
        // vérification user autorisé 
          if (book.userId != req.auth.userId) {
              res.status(401).json({message: 'Not authorized'});
          } else {
            // extraction nom fichier de URL de l'image
              const filename = book.imageUrl.split('/images/')[1];
              // suppression  image du livre de la BdD
              fs.unlink(`images/${filename}`, () => {
                // suppression livre de la BdD
                  Book.deleteOne({_id: req.params.id})
                      .then(() => { res.status(200).json({message: 'Livre supprimé !'})})
                      .catch(error => res.status(401).json({ error }));
              });
          }
      })
      .catch( error => {
          res.status(500).json({ error });
      });
};

exports.getAllBooks = (req, res, next) => {
  // utilisation méthode find sur modèle Book pour récupérer tous les livres
  Book.find().then(
    // si réussi; liste livre est renvoyée en tant que réponse
    (books) => {
      res.status(200).json(books);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};