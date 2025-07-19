const express = require('express');
const router = express.Router();
const quiController = require('../controllers/quiController');

router.get('/', quiController.getAllQui);
router.get('/:id', quiController.getQuiById);
router.get('/imgQui/:id', quiController.getImgQuiById);
router.post('/', quiController.createQui);
router.put('/:id', quiController.updateQui);
router.delete('/:id', quiController.deleteQui);

module.exports = router;
