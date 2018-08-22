const express = require('express');
const router = express.Router();

const controller = require('../controllers/customerController.js');
const authService = require('../services/authService');

//Chamada dos controllers
router.get('/', controller.get);
router.post('/', controller.post);
router.post('/authenticate', controller.authenticate);
router.post('/refreshtoken',authService.authorize, controller.refreshToken);

module.exports = router;