const jwt = require('jwt-simple');
const config = require('../../config');
const User = require('../signup/signupSchema');

const currentUser = (req, res, next) => {
    console.log(req.headers);
let username = null;
    if (!req.headers['x-auth']) { return res.sendStatus(401);
    }
    try {
    username = jwt.decode(req.headers['x-auth'], config.secret).username;
    } catch(err) {
        return res.sendStatus(401)
    }
    User.findOne({username: username}, function(err, user){
        if (err) { 
            return res.sendStatus(500)
        }
        if (!user) { 
            return res.sendStatus(401)
           
        } 
        res.json(user)
    })

}

module.exports = currentUser;