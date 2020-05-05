const fs = require('fs');
const path = require('path');
const underscore = require('underscore');

const src = path.join(__dirname, 'all-products.json');




const addProductsRoute = (req, res, next) => {
   
if(req.url == '/products') {
    
    fs.readFile(path.join(src), 'utf8', (err, data) => {
        if (err) {
            throw err
        }
        
        res.set('Content-Type', 'application/json');
        res.send(data);

      })
} else {

    const productsId = underscore.uniq(req.query.ids.split(','));
    console.log(productsId);

    
    const productsList =  JSON.parse(fs.readFileSync(src));
    let result = [];


        for (let i = 0; i < productsId.length; i++) {
            
            let searchedProducts = productsList.filter(productsList=> productsList.id === +productsId[i])[0];
            console.log(searchedProducts);
            
            if(searchedProducts === undefined) {
                result = null;
                break;
            } else {
            result.push(searchedProducts);
        }
        }

if(result === null){
    response.status(400);
    response.json({
    'status': 'no products', 'products': []
    });
} else {      
    res.set("Content-Type", "application/json");
    res.status(200);
    res.json({ products: result});
}
}
};

module.exports = addProductsRoute;
