'use strict'
const User = require('../signup/signupSchema');



const getUserByID = (req, res) => {


    User.findOne({ 
        _id: req.params.id
        },)
    .then(user => {
        console.log('From database', user);
        if (user) {
            req.body = user;
            res.status(200).json({
                "status": "success", 
                "product": user
               })
            console.log(req.body);
        } else {
            res
            .status(404)
            .json({'status': 'no user', 'user': []})
        }
        
    })
        
  };
  
  module.exports = getUserByID;