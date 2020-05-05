
const fs = require('fs');
const path = require('path');




const getProductByID = (request, response, next) => {


    const productId = request.params;
    console.log(productId);
    
  
        const src = path.join(__dirname, 'all-products.json');
        
        const prodMass = JSON.parse(fs.readFileSync(src));

        
        const result = {...prodMass.filter(prodMass => prodMass.id == productId.id)[0]};
        
                                                                     
    response.set("Content-Type", "application/json");
  
    response.status(200);
    response.json({ product: result});

  };
  
  module.exports = getProductByID;

  