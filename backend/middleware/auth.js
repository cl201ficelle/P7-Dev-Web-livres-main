// bibliothèque vérification/création jeton JWT
const jwt = require('jsonwebtoken');
 
module.exports = (req, res, next) => {
   try {
    // extraction jeton depuis en-tête authorization
       const token = req.headers.authorization.split(' ')[1];
    //    vérification et decryptage jeton à l'aide clé secret
       const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    //    extraction ID utilisateur à partir jeton decrypté
       const userId = decodedToken.userId;
    //    ajout info authentification à l'objet pour utilisation ultérieure
       req.auth = {
           userId: userId
       };
	next();
   } catch(error) {
       res.status(401).json({ error });
   }
};