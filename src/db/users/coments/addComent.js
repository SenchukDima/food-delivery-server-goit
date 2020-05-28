const mongoose = require('mongoose');
const Coment = require('./comentsSchema');


const addComent = (req, res, next) => {
  if (!req.headers['x-auth']) { return res.sendStatus(401);
  } else {

const coments = new Coment({
    "_id": new mongoose.Types.ObjectId(),
    "product": req.body.product,
    "author": req.body.author,
    "text": req.body.text, 
    "mark": req.body.mark, 
       }
);
coments.save(function (err) {
    if (err) return console.log(err);

  });
}
}


module.exports = addComent;