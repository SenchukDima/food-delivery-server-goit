'use strict'
const Order = require('./postOrderSchema');



const getOrders = (req, res) => {


    Order.findOne({ 
        _id: req.params.id
        },)
    .then(order => {
        console.log('From database', order);
        if (order) {
            req.body = order;
            res.status(200).json({
                "status": "success", 
                "product": order
               })
            console.log(req.body);
        } else {
            res
            .status(404)
            .json({'status': 'no orders', 'order': []})
        }
        
    })
  };
  
  module.exports = getOrders;