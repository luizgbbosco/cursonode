const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();

//Conecta ao banco
mongoose.connect('mongodb://luizgbbosco:messiop010@ds018498.mlab.com:18498/projeto');

//Carregando modelos
const product = require('../models/product.js');
const customer = require('../models/customer.js');
const order = require('../models/order.js');

//Carregar rotas
const indexRoute = require('./routes/indexRoute');
const productRoute = require('./routes/productRoute');
const customerRoute = require('./routes/customerRoute');
const orderRoute = require('./routes/orderRoute');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customers', customerRoute);
app.use('/orders', orderRoute);

module.exports = app;