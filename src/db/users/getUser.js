const fs = require('fs');
const path = require('path');




const getUserByID = (request, response, next) => {


    const userId = request.params;
    console.log(userId);
    
  
        const usersSrc = path.join(__dirname, 'all-users.json');
        console.log(usersSrc);
        
    
        const userMass = JSON.parse(fs.readFileSync(usersSrc));
        console.log(userMass[0].id);
        
        
        const searchedUser = {...userMass.filter(userMass => userMass.id == userId.id)}[0];
        
        if(searchedUser === undefined) {
            response.status(400);
            response.json({
            'status': 'no products', 'products': []
    });
        } else {
        
        response.set("Content-Type", "application/json");
        response.status(200);
        response.json({ user: searchedUser});
    }
  };
  
  module.exports = getUserByID;