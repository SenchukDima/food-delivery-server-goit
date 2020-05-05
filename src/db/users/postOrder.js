const fs = require('fs');
const path = require('path');


const sandOrder = (req, res, next) => {

const userID = req.query.user;

const productsId = req.query.products.split(',');

const deliveryAdress = req.query.deliveryAdress;

   const order = {
    "user": userID, 
    "products": [+productsId[0], +productsId[1], +productsId[2]],
    "deliveryType": "delivery",
    "deliveryAdress": deliveryAdress
   }

console.log(order);


   res.set("Content-Type", "application/json");
  
    res.status(200);

    res.body = order;

   const orderProductsId = res.body.products;
   

    const src = path.join(__dirname, '../products', 'all-products.json');
    
    
    const productsList =  JSON.parse(fs.readFileSync(src));
    
    let orderProducts = [];


        for (let i = 0; i < orderProductsId.length; i++) {
            
            let searchedProducts = productsList.filter(productsList=> productsList.id === +orderProductsId[i])[0];
            
            if(searchedProducts === undefined) {
                orderProducts = null;
                break;
            } else {
                orderProducts.push(searchedProducts);
        }
        }
        console.log(orderProducts);

        if(orderProducts === null){
            response.status(400);
            response.json({
                'status': 'failed', 'order': null
            });
        } else {

            const orderFolder = path.join(__dirname , '../users', 'orders' );
            console.log(orderFolder);

            if (!fs.existsSync(orderFolder)) {
                fs.mkdirSync(orderFolder);
            }

            const orderData = {...order, id: Math.ceil(Math.random()* 10000000)};
console.log(orderData);

            fs.writeFile(path.join(__dirname, './orders', `${order.user}.json`), JSON.stringify( orderData, null, 2), (err) => {
                if (err) throw err;
                console.log('Data written to file');
            });  
            res.set("Content-Type", "application/json");
            res.status(200);
            res.json({ "status": "success", 
            "order":  orderData});
        }
        


        
   
}

module.exports = sandOrder;