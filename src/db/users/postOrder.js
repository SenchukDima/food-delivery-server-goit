const fs = require('fs');
const path = require('path');


const sandOrder = (req, res, next) => {

   const deliveryAdressText = 'Kyiv';
   const order = {
    "user": 558959483762604, 
    "products": [19112835, 19112831, 19112834],
    "deliveryType": "delivery",
    "deliveryAdress": deliveryAdressText
   }

   res.set("Content-Type", "application/json");
  
    res.status(200);

    res.body = order;

//    console.log(res.body);

   const orderProductsId = res.body.products;
    // console.log(productsId);

    const src = path.join(__dirname, '../products', 'all-products.json');
    
    
    const productsList =  JSON.parse(fs.readFileSync(src));
    
    let orderProducts = [];


        for (let i = 0; i < orderProductsId.length; i++) {
            
            let searchedProducts = productsList.filter(productsList=> productsList.id === +orderProductsId[i])[0];
            // console.log(searchedProducts);
            
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

            // console.log(order.user);
            
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