const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb+srv://<UserTest>:<FyqSCbpVX2I1UyVp>@cluster0.vznqtut.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true, 
})
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((err) => console.error('Connexion à MongoDB échouée !', err));

// express prend toutes les requêtes qui ont comme Content-Type  application/json  et met à disposition leur  body  directement sur l'objet req :
app.use(express.json()); 

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.get('/', (req, res) => {
    res.send('Hello, this is the root path!');
  });

  app.post('api/auth/signup ', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
      email: 'monvieuxgrimoires@gmail.com',
      password: 'P7monvieuxgrimoires'
    });
  });

  app.post('/api/books', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
      message: 'Objet créé !'
    });
  });

app.get('/api/books', (req, res, next) => {
    const books = [
      {
        _id: 'oeihfzeoi',
        title: 'Le seigneur des anneaux',
        author: 'tolkein',
        imageUrl: 'https://www.albumcomics.com/114999-large_default/le-seigneur-des-anneaux.jpg',
        year: 4900,
        genre:'fantastique',
        averageRating: 1,
      },
      {
        _id: 'dsfdsfs',
        title: 'Le seigneur des anneaux',
        author: 'tolkein',
        imageUrl: 'https://www.albumcomics.com/114999-large_default/le-seigneur-des-anneaux.jpg',
        year: 4900,
        genre:'fantastique',
        averageRating: 1,
      },
      {
        _id: 'dsffs',
        title: 'Le seigneur des anneaux',
        author: 'tolkein',
        imageUrl: 'https://www.albumcomics.com/114999-large_default/le-seigneur-des-anneaux.jpg',
        year: 4900,
        genre:'fantastique',
        averageRating: 1,
      },
      {
        _id: 'fdfsgs',
        title: 'Le seigneur des anneaux',
        author: 'tolkein',
        imageUrl: 'https://www.albumcomics.com/114999-large_default/le-seigneur-des-anneaux.jpg',
        year: 4900,
        genre:'fantastique',
        averageRating: 1,
      }
    ];

   res.status(200).json(books);
  });
 

module.exports = app;