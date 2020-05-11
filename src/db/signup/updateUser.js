const User = require('./signupSchema');


const updateUser = (req, res) => {
    console.log('start process');
    
console.log(req.body);


    const userId = req.params.id;
    console.log(userId);

    User.findOneAndUpdate({
        _id: req.params.id
        },
        { $set: { viewedProducts: req.body.viewedProducts }
       }, {upsert: true}, (err, newInform) => {
        if (err) {
         res.send('error updating ');
        } else {
         console.log(
        {"status": "success", 
         "product": newInform});
         res.send(newInform);
       }
      })

}


module.exports = updateUser;