const http = require('http');
const url = require('url');

const morgan = require('morgan');
const router = require('./routes/router');
const querystring = require('querystring');

const logger = morgan('combined');
const fs = require('fs');
const path = require('path');

const startServer = port => {

  const server = http.createServer((request, response) => {

    const parsedUrl = url.parse(request.url);

    const func = router[parsedUrl.pathname] || router.default;

    logger(request, response, () => func(request, response));
  
    server.on('request', function (req, res) {
      if (req.method == 'POST') {
      body = '';
      } else {
        throw err
      }
  
      req.on('data', function (data) {
        body += data;
      });
  
      req.on('end', function () {
          let post = querystring.parse(body);
          // console.log(JSON.stringify(post, null, 2));
          fs.writeFileSync(path.join(__dirname, '/db/users/', `${post.username}.json`), JSON.stringify( post, null, 2), (err) => {
            if (err) throw err;
            console.log('Data written to file');
        });
          
        res.end(
          console.log(JSON.stringify({
                "status": "success", 
                "user": post
              }, null, 2))
           );
      });
      
  });
  });

  server.listen(port);
  
    
    console.log('Listening on port 3007');
  };



module.exports = startServer;
