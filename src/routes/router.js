'use strict'
const express = require('express');
const mainRoute = require('../db/main/main');
const addProductsRoute = require('../db/products/products');
const saveUserFile = require('../db/signup/signup');
const getProductByID = require('../db/products/getProduct');
const getUserByID = require('../db/users/getUser');
const sendOrder = require('../db/users/postOrder');
const getOrders = require('../db/users/getOrders');
const updateUser = require('../db/signup/updateUser');
const likeProduct = require('../db/products/likeProduct')

const router = express.Router();


router
  .get('/', mainRoute)
  .get('/products', addProductsRoute)
  .get('/products/:id', getProductByID)
  .put('/products/:id', likeProduct)
  .post('/signup', saveUserFile)
  .get('/user/:id', getUserByID)
  .put('/user/:id', updateUser)
  .post('/orders', sendOrder)
  .get('/orders/:id', getOrders)
  .get('*', (req, res, next) => {
    res.status(404).send('Route not exists');
})
;

module.exports = router;