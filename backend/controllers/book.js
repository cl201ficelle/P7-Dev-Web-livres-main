const Book = require('../models/book');

exports.createBook = (req, res, next) => {
   console.log('Requête reçue. Données du body :', req.body);
  const bookObject = JSON.parse(req.body.book);
  delete bookObject._id;
  delete bookObject._userId;
  const book = new Book({
      ...bookObject,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      
  });
  book.save()
      .then(() => { res.status(201).json({message: 'Livre enregistré!'})})
      .catch(error => { res.status(400).json( { error })});
};




exports.getOneBook = (req, res, next) => {
  Book.findOne({
    _id: req.params.id
  }).then(
    (book) => {
      res.status(200).json(book);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

// exports.modifyBook = (req, res, next) => {
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
// };

// exports.deleteBook = (req, res, next) => {
//   Book.deleteOne({_id: req.params.id}).then(
//     () => {
//       res.status(200).json({
//         message: 'Book Deleted!'
//       });
//     }
//   ).catch(
//     (error) => {
//       res.status(400).json({
//         error: error
//       });
//     }
//   );
// };

exports.getAllBooks = (req, res, next) => {
  Book.find().then(
    (books) => {
      res.status(200).json(books);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};