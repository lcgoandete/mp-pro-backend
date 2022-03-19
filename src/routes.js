const rescue = require('express-rescue');
const routes = require('express').Router();

const mercadopago = require('./mercadopago/controller');

routes.post('/payment', rescue(mercadopago.payment));

module.exports = routes;