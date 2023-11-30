const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const stuffCtrl = require('../controllers/stuff');

router.post('/', auth, stuffCtrl.createBook);
// router.post("/:id/rating", auth, stuffCtrl.postRating);
router.put('/:id', auth, stuffCtrl.modifyBook);
router.delete('/:id', auth, stuffCtrl.deleteBook);
router.get("/:id", stuffCtrl.getOneBook);
router.get('/', stuffCtrl.getAllStuff);

module.exports = router;




