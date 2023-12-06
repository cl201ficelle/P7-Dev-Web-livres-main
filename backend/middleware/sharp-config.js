const sharp = require('sharp');

const optimizeImage = (inputPath, outputPath, width, height, format, callback) => {
  sharp(inputPath)
    .resize(width, height)
    .toFormat(format)
    .toFile(outputPath, callback);
};

module.exports = optimizeImage;