const express = require('express');
const router = express.Router();

const controller = require('../controllers/productController');

//Chamada dos controllers
router.get('/:tag', controller.getByTag);
router.get('/admin/:id', controller.getById);
router.get('/:slug', controller.getBySlug);
router.get('/', controller.get);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);

module.exports = router;