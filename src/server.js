'use strict'
const express = require ('express');
const mongoose = require('mongoose');
const app = express();
const corsMiddleware = require ('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./routes/router');

const ingredientRoutes = require("./db/products/ingredients");
const productRoutes = require("./db/products/products");

const errorHandler = (err, req, res, next)  => {
  res
    .status(500)
    .send('Error found: ' + err.stack);
};



const startServer = port => {

const uri = 'mongodb+srv://Hope:sds120597@cluster0-jhcb3.mongodb.net/test?retryWrites=true&w=majority';

  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true,  useFindAndModify: false}).then(() => {

   
  console.log('conected');
  }).catch((err) => {
    console.error(err);
  });  
  
  

  app
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use(corsMiddleware())
    .use(morgan('dev'))
    .use("/ingredients", ingredientRoutes)
    .use("/products", productRoutes)
    .use('/', router)
    .use(errorHandler);

  app.listen(port);
  
};


module.exports = startServer;
 