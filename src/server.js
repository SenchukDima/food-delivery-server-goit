'use strict'
const express = require ('express');
const mongoose = require('mongoose');
const app = express();
const corsMiddleware = require ('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./routes/router');
const fs = require('fs');
const path = require('path');

const Products = require('./db/products/productSchema');

const errorHandler = (err, req, res, next)  => {
  res
    .status(500)
    .send('Error found: ' + err.stack);
};



const startServer = port => {

const uri = 'mongodb+srv://Hope:sds120597@cluster0-jhcb3.mongodb.net/test?retryWrites=true&w=majority';

  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true,  useFindAndModify: true }).then(() => {

    const src = path.join(__dirname, './db/products/', 'all-products.json');
        
    const prodMass = JSON.parse(fs.readFileSync(src));
    
    for (let i = 0; i < prodMass.length; i++) {  // Проверяем файл с продуктами, при нахождении нового id добавляется проукт с ним
    Products.findOne({id: prodMass[i].id}).then(productId => { 
      if (productId === null) {
        
        const products = new Products({
          "id": prodMass[i].id,
          "sku":prodMass[i].sku,
          "name": prodMass[i].name,
          "description": prodMass[i].description,
          "price": prodMass[i].price,
          "currency": prodMass[i].currency,
          "creatorId":prodMass[i].creatorId,
          "created": prodMass[i].created,
          "modified": prodMass[i].modified,
          "categories": prodMass[i].categories,
          "likes": 0
         });
         products.save()
        .then(result => {
          console.log(result);
        })
      }
    })
    }
  console.log('conected');
  }).catch((err) => {
    console.error(err);
  });  
  
  app
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use(corsMiddleware())
    .use(morgan('dev'))
    .use('/', router)
    .use(errorHandler);

  app.listen(port);
  
};


module.exports = startServer;
 