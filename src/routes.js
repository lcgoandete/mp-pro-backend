const rescue = require('express-rescue');
const routes = require('express').Router();

const mercadopago = require('./mercadopago/controller');

routes.post('/payment', rescue(mercadopago.payment));
routes.post('/ipn', rescue(mercadopago.notification));

module.exports = routes;