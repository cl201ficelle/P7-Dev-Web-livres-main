// bibliothèque vérification/création jeton JWT
const jwt = require('jsonwebtoken');
// sécuriser clé secrète 
require('dotenv').config();

const secretKey = process.env.JWT_SECRET; 

module.exports = (req, res, next) => {
   try {
    // extraction jeton depuis en-tête authorization, supposé format "Bearer <token>" : utilise split pour obtenir 2e élément après espace
       const token = req.headers.authorization.split(' ')[1];
    //    vérification et decryptage jeton à l'aide clé secret
       const decodedToken = jwt.verify(token, secretKey);
    //    extraction ID utilisateur à partir jeton decrypté
       const userId = decodedToken.userId;
    //    ajout info authentification à l'objet pour utilisation ultérieure
       req.auth = {
           userId: userId
       };
	next();
   } catch(error) {
      // non autorisé
       res.status(401).json({ error });
   }
};