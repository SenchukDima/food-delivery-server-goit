const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Ingredient = require("./ingredSchema");

router.get("/", (req, res, next) => {
  if (!req.headers['x-auth']) { return res.sendStatus(401);
  } else {
  Ingredient.find()
    .select("name description _id")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        ingredients: docs.map(doc => {
          return {
            name: doc.name,
            description: doc.description,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/products/" + doc._id
            }
          };
        })
      };
      //   if (docs.length >= 0) {
      res.status(200).json(response);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
  }
});

router.post("/", (req, res, next) => {
  if (!req.headers['x-auth']) { return res.sendStatus(401);
  } else {
      
  const ingredients = new Ingredient({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    description: req.body.description
  });
  ingredients
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created ingredient successfully",
        createdProduct: {
            name: result.name,
            description: result.description,
            _id: result._id
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
});

module.exports = router;

