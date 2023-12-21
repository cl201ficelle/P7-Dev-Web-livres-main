// bibliothèque hash mdp. transforme mdp en string illisible et difficile à décrypter
const bcrypt = require ("bcrypt")
// importation modèle user
const User = require ('../models/user')
// bibliothèque création/vérification JSON web token. JWT : génère jeton auth, pour vérifier identité utilisateur
const jwt = require('jsonwebtoken');
// sécuriser clé secrète 
require('dotenv').config();

const keySecret = process.env.JWT_SECRET;

// inscription  
exports.signup = (req, res, next) => {
    //  hash mdp
    bcrypt.hash(req.body.password, 10)
    // créé nouvelle instance avec email et mdp hashé
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash
        });
        // sauvegarde dans BdD, envoie rép si succès ou erreur
        user.save()
          // création user 
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

// connexion utilisateur  
  exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
    // vérifie si user existe grâce à email
        .then(user => {
            if (!user) {
              // Unauthorized
                return res.status(401).json({ message: 'Utilisateur non trouvé !' });
            }
            // compare mdp hashé avec mdp entré grâce a bcrypt.
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    // Si mdp valide, génère JWT contenant id user et le renvoie en tant que rép avec id user
                    if (!valid) {
                      // Unauthorized
                        return res.status(401).json({ message: 'Mot de passe incorrect !' });
                    }
                    // succès
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            keySecret,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
 };