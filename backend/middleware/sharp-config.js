// bibliothèque modif image
const sharp = require('sharp');

const optimiseImage = (inputPath, outputPath, width, height, format, callback) => {
  // instance sharp à partir chemin entrée image
  sharp(inputPath)
  // redimension
    .resize(width, height)
    // conversion 
    .toFormat(format)
    // enregistrement au chemin de sortie. callback : gère erreur fct asynchrone
    .toFile(outputPath, callback);
};

module.exports = optimiseImage;