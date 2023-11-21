const Book = require('./models/books');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb+srv://UserTest:fWTRlpNeRnv77wXH@cluster0.vznqtut.mongodb.net/?retryWrites=true&w=majority', {
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

//   app.post('api/auth/signup ', (req, res, next) => {
//     console.log(req.body);
//     res.status(201).json({
//       email: 'monvieuxgrimoires@gmail.com',
//       password: 'P7monvieuxgrimoires'
//     });
//   });

// app.post('/api/books', (req, res, next) => {
//     delete req.body._id;
//     const thing = new Book({
//       ...req.body
//     });
//     thing.save()
//       .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
//       .catch(error => res.status(400).json({ error }));
//   });

//   app.get('/api/books', (req, res, next) => {
//     Book.find()
//       .then(books => {
//         if (books.length === 0) {
//           return res.status(404).json({ message: 'No books found.' });
//         }
//         res.status(200).json(books);
//       })
//       .catch(error => res.status(500).json({ error: error.message }));
//   });

module.exports = app;