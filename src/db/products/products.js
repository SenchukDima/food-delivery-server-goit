const fs = require('fs');
const path = require('path');


const productsRoute = (req, res) => {
    
    fs.readFile(path.join(__dirname, 'all-products.json'), 'utf8', (err, data) => {
        if (err) {
            throw err
        }

        console.log(data);
        
        // res.writeHead(200, {'Content-Type': 'application/json'});
        
        // res.write(data);
        res.end();
      })
      
};

module.exports = productsRoute;