const express = require('express');
const mainRoute = require('../db/main/main');
const addProductsRoute = require('../db/products/products');
const saveUserFile = require('../db/signup/signup');
const getProductByID = require('../db/products/getProduct');
const getUserByID = require('../db/users/getUser');
const sandOrder = require('../db/users/postOrder');

const router = express.Router();

const middlewareExample = (request, response, next) => {
  if (request.body) {
    next();
    return;
  };

  response.status(400);
  response.json({
    error: 'user has no add'
  })
};

router
  .get('/', mainRoute)
  .get('/products', addProductsRoute)
  .get('/products/:id', getProductByID)
  .post('/signup', middlewareExample, saveUserFile)
  .get('/user/:id', getUserByID)
  .post('/orders', sandOrder)
  .get('*', (req, res, next) => {
    res.status(404).send('Route not exists');
})
;

module.exports = router;