const express = require('express');
const router = express.Router();

const controller = require('../controllers/productController');

const authService = require ('../services/authService');

//Chamada dos controllers
router.get('/:tag', controller.getByTag);
router.get('/admin/:id', controller.getById);
router.get('/slug/:slug', controller.getBySlug);
router.get('/', controller.get);
router.post('/', authService.isAdmin, controller.post);
router.put('/:id', authService.isAdmin, controller.put);
router.delete('/delete/:id', authService.isAdmin, controller.delete);

module.exports = router;