const mongoose = require('mongoose');
const Coment = require('./comentsSchema')


const getProductComents = (req, res, next) => {
  if (!req.headers['x-auth']) { return res.sendStatus(401);
  } else {
console.log(req.query.productId)

Coment.find({"product": req.query.productId})
.exec()
.then(docs => {
    console.log(docs);
  res.status(200).json({
    status: 'success',
    coments: docs.map(doc => {
      return {
        _id: doc._id,
        product: doc.product,
        author: doc.author,
        text: doc.text,
        mark: doc.mark,
        request: {
          type: "GET",
          url: "http://localhost:27015/products/" + doc._id
        }
      };
    })
  });
})
.catch(err => {
  res.status(500).json({
    error: err
  });
});
  }
}

module.exports = getProductComents;