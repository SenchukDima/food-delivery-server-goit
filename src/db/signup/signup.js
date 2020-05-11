'use strict'
const mongoose = require('mongoose');
const User = require('./signupSchema');


const saveUserFile = async (req, res) => {

     const user1 = {
      "username": "Ivan",
      "telephone": "063 777 77 77",
      "password": "12345",
      "email": "ivan@gmail.com"
     };

     res.body = user1;

     const user = new User({
       _id: new mongoose.Types.ObjectId(),
       username: res.body.username,
       telephone: res.body.telephone,
       password: res.body.password,
       email: res.body.email
      });
      user.save()
      .then(result => {
        console.log(result);
      })
      .catch(err => console.log(err));
      res.status(201).json({
        message: "POST +",
        createdUser: user
      })

}


module.exports = saveUserFile;