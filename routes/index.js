const express = require('express');

const productsRouter = require('./products.route');
const usersRouter = require('./users.route');
const categoriesRouter = require('./categories.route');
const ordersRouter = require('./orders.route');
const customersRouter = require('./customers.route');

const routerApi = (app) => {
  const router = express.Router();

  app.use('/api/v1', router);

  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);
  router.use('/orders', ordersRouter);
  router.use('/customers', customersRouter);
};

module.exports = routerApi;
