// Middleware pour gérer les données de type multipart/form-data, utilisé pour le téléchargement de fichiers
const multer = require('multer');

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
  // nom fichier unique
  filename: (req, file, callback) => {
    // remplacement espace par underscore
    const name = file.originalname.split(' ').join('_');
    // obtention de extention du fichier à partir type MIME
    const extension = MIME_TYPES[file.mimetype];
    // nom fichier final
    callback(null, name);
  }
});

// exportation pour téléchargement une seule image
module.exports = multer({storage: storage}).single('image');