const express = require ('express');
const corsMiddleware = require ('cors');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');
const router = require('./routes/router');


const errorHandler = (err, req, res, next)  => {
  res
    .status(500)
    .send('Error found: ' + err.stack);
};

const startServer = port => {
  app
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use(corsMiddleware())
    .use(morgan('dev'))
    .use('/', router)
    .use(errorHandler);
    
  app.listen(port);

  console.log('Server was started at http://localhost:' + port);
 
  
};


module.exports = startServer;
 