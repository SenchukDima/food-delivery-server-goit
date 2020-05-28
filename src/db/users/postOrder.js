'use strict'
const mongoose = require('mongoose');
const Order = require('./postOrderSchema');

const sendOrder = (req, res) => {
  if (!req.headers['x-auth']) { return res.sendStatus(401);
  } else {
    const order1 = {
        "creator": "5eb3334fdba71179113705d6",
        "product": "19112833",
        "type": "XL",
        "itemsCount": 666,
        "deliveryType": "office",
        "deliveryAdress": "Kyiv",
        "sumToPay": 600,
        "status": "finished",
       };
  
       res.body = order1;
  console.log(res.body);
  
       const order = new Order({
         _id: new mongoose.Types.ObjectId(),
      creator: res.body.creator,
      productsList: [
        { 
          product: res.body.product,
          type: res.body.type,                 
          itemsCount: res.body.itemsCount
        }
      ],
      deliveryType: res.body.deliveryType,          
      deliveryAdress: res.body.deliveryAdress,
      sumToPay: res.body.sumToPay,
      status: res.body.status
        });
        order.save()
        .then(result => {
          console.log(result);
        })
        .catch(err => console.log(err));
        res.status(201).json({
          message: "POST +",
          createdUser: order
        })
      }
}

module.exports = sendOrder;