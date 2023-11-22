const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff');

router.get('/', stuffCtrl.getAllStuff);
router.post('/', stuffCtrl.createBook);
router.get('/:id', stuffCtrl.getOneBook);
router.put('/:id', stuffCtrl.modifyBook);
router.delete('/:id', stuffCtrl.deleteBook);

module.exports = router;


// const express = require('express');
// const router = express.Router();

// const Book = require('../models/books');

// // in routes/stuff.js

// const stuffCtrl = require('../controllers/stuff');

// router.get('/', stuffCtrl.getAllStuff);

// router.post('/', (req, res, next) => {
//   const book = new Book({
//     title: req.body.title,
//     author: req.body.author,
//     imageUrl: req.body.imageUrl,
//     year: req.body.year,
//     genre: req.body.genre,
//     rating: req.body.rating
//   });
//   book.save().then(
//     () => {
//       res.status(201).json({
//         message: 'Book saved successfully!'
//       });
//     }
//   ).catch(
//     (error) => {
//       res.status(400).json({
//         error: error
//       });
//     }
//   );
// });

// router.get('/:id', (req, res, next) => {
//   Book.findOne({
//     _id: req.params.id
//   }).then(
//     (book) => {
//       res.status(200).json(book);
//     }
//   ).catch(
//     (error) => {
//       res.status(404).json({
//         error: error
//       });
//     }
//   );
// });

// router.put('/:id', (req, res, next) => {
//   const book = new Book({
//     title: req.body.title,
//     author: req.body.author,
//     imageUrl: req.body.imageUrl,
//     year: req.body.year,
//     genre: req.body.genre,
//     rating: req.body.rating
//   });
//   Book.updateOne({_id: req.params.id}, book).then(
//     () => {
//       res.status(201).json({
//         message: 'Book updated successfully!'
//       });
//     }
//   ).catch(
//     (error) => {
//       res.status(400).json({
//         error: error
//       });
//     }
//   );
// });

// router.delete('/:id', (req, res, next) => {
//   Book.deleteOne({_id: req.params.id}).then(
//     () => {
//       res.status(200).json({
//         message: 'Deleted!'
//       });
//     }
//   ).catch(
//     (error) => {
//       res.status(400).json({
//         error: error
//       });
//     }
//   );
// });

// router.get('/' +
//   '', (req, res, next) => {
//   Book.find().then(
//     (books) => {
//       res.status(200).json(books);
//     }
//   ).catch(
//     (error) => {
//       res.status(400).json({
//         error: error
//       });
//     }
//   );
// });

// module.exports = router;