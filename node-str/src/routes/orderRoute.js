const express = require('express');
const router = express.Router();

const controller = require('../controllers/orderController.js');
const authService = require('../services/authService');

//Chamada dos controllers

router.get('/',authService.authorize, controller.get);
router.post('/',authService.authorize, controller.post);

module.exports = router;