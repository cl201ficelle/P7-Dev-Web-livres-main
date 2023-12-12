// Middleware pour gérer les données de type multipart/form-data, utilisé pour le téléchargement de fichiers
const multer = require('multer');
const path = require('path');

// types MIME acceptés et extensions associées
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp'
};

// configuration du stockage des fichiers avec multer
const storage = multer.diskStorage({
  // où les fichiers seront enregistés
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  // nom fichier unique : nom fichier original+date
  filename: (req, file, callback) => {
    // remplacement espace par underscore, ajout date pour éviter collision
    const filename = path.parse(file.originalname).name.split(' ').join('_')+ '_' + Date.now()
    const ext = '.' + MIME_TYPES[file.mimetype];
    const filenameExt = filename + ext
    // nom fichier final returné à la fonction de rappel
    callback(null, filenameExt);
  }
});

// exportation pour téléchargement une seule image
module.exports = multer({storage: storage}).single('image');