const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();
const router = express.Router();

//Conecta ao banco
mongoose.connect(config.connectionString);

//Carregando modelos
const product = require('../models/product.js');
const customer = require('../models/customer.js');
const order = require('../models/order.js');

//Carregar rotas
const indexRoute = require('./routes/indexRoute');
const productRoute = require('./routes/productRoute');
const customerRoute = require('./routes/customerRoute');
const orderRoute = require('./routes/orderRoute');

app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(bodyParser.urlencoded({ extended: false }));

//Habulita o CORS
app.use(function(req, res, next){
    res.header('Acess-Control-Allow-Origin', '*');
    res.header('Acess-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Acept, x-acess-token');
    res.header('Acess-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customers', customerRoute);
app.use('/orders', orderRoute);

module.exports = app;