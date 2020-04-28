
const http = require('http');
const querystring = require('querystring');

const userData = querystring.stringify({
  "username": "Ivan",
  "telephone": "063 777 77 77",
  "password": "12345",
  "email": "ivan@gmail.com"
 });
 

const options = {
  hostname: 'localhost',
  port: 3005,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(userData)
  }
};

const signUpRoute = (req, res) => {

  
  req = http.request(options, function (res) {
    res.setEncoding('utf8');
  
  });
  
  req.on('error', function (e) {
    console.log('Problem with request:', e.message);
  });
  
  req.write(userData);
  req.end();
    

}

module.exports = signUpRoute;