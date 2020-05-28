'use strict'
const express = require('express');
const mainRoute = require('../db/main/main');
const addProductInFile = require('../db/products/addProductsInFile');
const userRegistration = require('../db/signup/userRegistration');
const getUserByID = require('../db/users/getUser');
const sendOrder = require('../db/users/postOrder');
const getOrders = require('../db/users/getOrders');
const updateUser = require('../db/signup/updateUser');
const authorizationLogin = require('../db/authorization/authorizationLogin');
const userLogout = require('../db/authorization/userLogout');
const currentUser = require('../db/authorization/currentUser');
const addComent = require('../db/users/coments/addComent');
const getProductComents = require('../db/users/coments/getProductComents')
const router = express.Router();


router
  .get('/', mainRoute)
  .post('./fileproducts', addProductInFile)
  .get('/user/:id', getUserByID)
  .put('/user/:id', updateUser)
  .post('/orders', sendOrder)
  .get('/orders/:id', getOrders)
  .post('/auth/register', userRegistration)
  .post('/auth/login', authorizationLogin)
  .get('/auth/logout', userLogout)
  .get('/auth/current', currentUser)
  .post('/coments', addComent)
  .get('/coments', getProductComents)
  .get('*', (req, res, next) => {
    res.status(404).send('Route not exists');
})
;

module.exports = router;