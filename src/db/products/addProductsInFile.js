const express = require("express");
const fs = require('fs');
const path = require('path');
const underscore = require('underscore');
const mongoose = require('mongoose');


const Product = require('./productSchema');

const src = path.join(__dirname, 'all-products.json');




const addProductInFile = async (req, res, next) => {
 
    const prodMass = JSON.parse(fs.readFileSync(src));
    
    for (let i = 0; i < prodMass.length; i++) {  // Проверяем файл с продуктами, при нахождении нового id добавляется проукт с ним
    Products.findOne({id: prodMass[i].id}).then(productId => { 
      if (productId === null) {
        
        const products = new Product({
          "_id": new mongoose.Types.ObjectId(),
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
         
         products.save(
            function (err) {
             if (err) return console.error(err);
           }
           )

      }


    })

  }
};

module.exports = addProductInFile;
