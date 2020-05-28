
const express = require("express");
const productRouter = express.Router();
const mongoose = require("mongoose");
const Product = require("./productSchema");
const Ingredient = require("./ingredSchema");

// Handle incoming GET requests to /orders
productRouter.get("/", (req, res, next) => {
  if (!req.headers['x-auth']) { return res.sendStatus(401);
  } else {
  Product.find()
    .select("product name _id")
    .populate('ingredient')
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        products: docs.map(doc => {
          return {
            _id: doc._id,
            ingredient: doc.ingredient,
            name: doc.name,
            request: {
              type: "GET",
              url: "http://localhost:27015/products/" + doc._id
            }
          };
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
  }
});

productRouter.post("/", (req, res, next) => {
  if (!req.headers['x-auth']) { return res.sendStatus(401);
  } else {
  Ingredient.find({ "_id": {"$in": req.body.ingredientId}})
    .then(ingredient => {
      if (!ingredient) {
        return res.status(404).json({
          message: "ingredient not found"
        });
      }
      
      const products = new Product({
          "_id": new mongoose.Types.ObjectId(),
          "id": req.body.id,
          "sku": req.body.sku,
          "name": req.body.name,
          "description": req.body.description,
          "price": req.body.price,
          "currency": req.body.currency,
          "creatorId": req.body.creatorId,
          "created": req.body.created,
          "modified": req.body.modified,
          "categories": req.body.categories,
          "ingredient": ingredient,
          "likes": 0
      });
      return products.save();
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Product stored",
        createdProduct: {
          _id: result._id,
          ingredient: result.ingredient,
          quantity: result.quantity
        },
        request: {
          type: "GET",
          url: "http://localhost:3000/products/" + result._id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
  }
})

productRouter.get("/:productId", (req, res, next) => {
  if (!req.headers['x-auth']) { return res.sendStatus(401);
  } else {
  Order.findById(req.params.productId)
    .populate('ingredients')
    .exec()
    .then(product => {
      if (!product) {
        return res.status(404).json({
          message: "Product not found"
        });
      }
      res.status(200).json({
        product: product,
        request: {
          type: "GET",
          url: "http://localhost:3000/orders"
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
  }
});

productRouter.put("/:_id", (req, res, next) => {
  if (!req.headers['x-auth']) { return res.sendStatus(401);
  } else {
  Product.findOneAndUpdate({_id: req.params._id},
    { 
      $inc: { "likes": 1 }
   })
   .exec()
  .then(product => {
    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }
    res.status(200).json({
      product: product,
      request: {
        type: "GET",
        url: "http://localhost:3000/orders"
      }
    });
  })
  .catch(err => {
    res.status(500).json({
      error: err
    });
  });
  }
});

module.exports = productRouter;