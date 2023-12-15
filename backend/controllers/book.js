const Book = require('../models/book');
// importation module FileSystem : permettra de supprimer fichier
const fs = require('fs');
// bibliothèque modif image
const sharp = require('sharp');
const path = require('path');

exports.createBook = (req, res, next) => {
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
  // utilisation sharp 
  sharp(req.file.path)
  .toFormat('webp')
  .resize(410, 600)
  .toFile(optimizedImagePath , (err)=> {
        if (err) {
            return res.status(401).json({ error: err.message });
        }
        fs.unlink(req.file.path, (unlinkErr) => {
          if (unlinkErr) {
            console.error("Erreur lors de la suppression de l'image originale :", unlinkErr);
            console.error("test",req.file.path)
          }
        });      
  // nouvelle instance modèle Book avec données extraites + ajout ID user objet req
  const book = new Book({
    // synthaxe spread pour inclure toutes propriétés du book
      ...bookObject,
      userId: req.auth.userId,
      // génère URL image menant à l'image stockée
      imageUrl: `${req.protocol}://${req.get('host')}/images/${optimizedImageName}`,     
  });
  // enregistrement livre dans BdD
  book.save()
      .then(() => { res.status(201).json({message: 'Livre enregistré!'})})
      .catch(error => { res.status(400).json( { error })
    });
  })
};

exports.modifyBook = (req, res, next) => {
  // vérification si une nouvelle image est téléchargée (req.file)
  const bookObject = req.file
    ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      }
    : { ...req.body };

  // suppression userid
  delete bookObject._userId;
  // recherche du livre à modifier en fonction de ID
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      // vérification si user est celui qui a créé livre
      if (book.userId != req.auth.userId) {
        res.status(401).json({ message: "Modification non autorisée" });
      } else {
        // sauvegarde URL image précédente pour la supprimer ensuite
        const previousImgUrl = book.imageUrl;

        // Mmse à jour livre
        Book.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id })
          .then(() => {
            // si présence nouvelle et précédente image : suppression image précédente
            if (req.file && previousImgUrl) {
              // récupération nom image originale
              const originalFileName = req.file.filename;
              // obtenir nom fichier sans extension
              const fileNameWithoutExt = path.parse(originalFileName).name;
              // modification nom image optimisée
              const optimizedImageName = `optimized-${fileNameWithoutExt}.webp`;
              const optimizedImagePath = `./images/${optimizedImageName}`;
              // utilisation sharp
              sharp(req.file.path)
  .toFormat('webp')
  .resize(410, 600)
  .toFile(optimizedImagePath , (err)=> {
        if (err) {
            return res.status(401).json({ error: err.message });
        }
                // extraction nom fichier pour le supprimer. split coupe URL, 1 signifie prendre deuxième partie
                const filename = previousImgUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, (error) => {
                  if (error) {
                    console.error("Erreur lors de la suppression de l'image précédente :", error);
                  }
                });
              });
            }
            res.status(200).json({ message: "Le livre a été modifié!" });
          })
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
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
      res.status(404).json({ error});
    }
  );
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
      res.status(400).json({ error});
    }
  );
};

exports.bestRating = (req, res, next) => {
  // utilisation méthode find sur modèle Book pour récupérer tous les livres
  Book.find()
  // trier résultat de la propriété averageRating en décroissant
  .sort({averageRating : -1})
  // obtenir les 3 premiers résultats
  .limit(3)
  .then(
    // si réussi; liste livre est renvoyée en tant que réponse
    (books) => {
      res.status(200).json(books);
    }
  ).catch(
    (error) => {
      res.status(400).json({ error});
    }
  );
};

exports.rate = (req, res) => {
  // trouver livre selob son id
  Book.findOne({ _id: req.params.id })
      .then(book => {
          // si l'user a déjà noté le livre, que la note est inférieure à 0 ou supérieur à 5 alors erreur
          if (book.ratings.some(rating => rating.userId === req.userId) || (req.body.grade < 0 || req.body.grade > 5)) {
              res.status(500).json({ error: 'Note comprise entre 0 et 5. Notez une seule fois par livre' });
          } else {
              // ajouter une nouvelle évaluation 
              book.ratings.push({
                  userId: req.body.userId,
                  grade: req.body.rating
              });
              // calcule note
              // nombre note total
              const totalRate = book.ratings.length;
              // méthode reduce : calcule somme grades. total conserve somme, ajoute rating en itérant. 0 : nomme de départ. reduce : liste d'élément devient une seule valeur 
              const sommeRate = book.ratings.reduce((total, rating) => total + rating.grade, 0);
              // moyenne : somme des rates divisée par nombre total de rate
              book.averageRating = sommeRate / totalRate;
              // remplace valeur précédente par nouvelle valeur. toFixed(1) : arrondie nb avec une seule décimale. parseFloat : pour avoir résultat type number. 
              book.averageRating = parseFloat(book.averageRating.toFixed(1));
              // sauvergarde livre avec note moyenne
              book.save()
                  .then(book => {
                      res.status(200).json(book);
                  })
                  .catch(error => res.status(500).json({ error }));
          }
      })
      .catch(error => res.status(404).json({ error }));
};