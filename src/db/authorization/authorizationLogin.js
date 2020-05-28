'use strict'

const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const config = require('../../config');
const User = require('../signup/signupSchema');

const authorizationLogin = (req, res, next) => {

    if (!req.body.username || !req.body.password) {

        return res.sendStatus(400) 
    } else {
        const username = req.body.username
        const password = req.body.password
        
        
        User.findOne({username: username})
        .select('password') 
        .exec(function(err, user){
            console.log(user);
            
            if (err) {
                return res.sendStatus(500)
            } 
            if (!user) {return res.sendStatus(401)}
            bcrypt.compare(password, user.password, function(err, valid){
                if (err) {
                    return res.sendStatus(500)
                }
                console.log(password);
                console.log(user.password);
                
                
                console.log(valid);
                
                if (!valid){ return res.sendStatus(401)}
                const token = jwt.encode({username: username}, config.secret)
                res.send(token)
                console.log(token);
                
            })
        })
    } 


}

module.exports = authorizationLogin;