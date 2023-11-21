const express = require('express');

const app = express();
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.get('/', (req, res) => {
    res.send('Hello, this is the root path!');
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
      }
    ];

   res.status(200).json(books);
  });
 

module.exports = app;