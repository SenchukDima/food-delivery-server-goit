const Products = require('./productSchema');


const likeProduct = (req, res) => {
    console.log('start process');


    Products.findOneAndUpdate({
        id: req.params.id
        },
        { $inc: { "likes": 1 }
       }, {upsert: true}, (err, updateLikes) => {
        if (err) {
         res.send('error updating ');
        } else {
         console.log(
        {"status": "success", 
         "product": updateLikes});
         res.send(updateLikes);
       }
      })

}


module.exports = likeProduct;