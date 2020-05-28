'use strict'
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jwt-simple');
const User = require('./signupSchema');


const userRegistration = async (req, res) => {

  const password = "12345";

  const hashedPassword = bcrypt.hashSync(password, 10);

     const user1 = {
      "username": "Dima",
      "telephone": "063 777 77 77",
      "password": hashedPassword,
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


module.exports = userRegistration;