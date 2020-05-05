
const fs = require('fs');
const path = require('path');
const util = require('util');


const usersFolder = path.join(__dirname , '../users');



const writeFile = util.promisify(fs.writeFile);

   const saveNewUser = (fileName, data) => {
    const src = path.join(usersFolder, fileName + '.json');
    const dataStr = JSON.stringify(data);
  
    return writeFile(src, dataStr);
  }; 

const saveUserFile = (request, response, next) => {
     const user = {
      "username": "Ivan",
      "telephone": "063 777 77 77",
      "password": "12345",
      "email": "ivan@gmail.com"
     };

     const user2 = {
      "username": "Maks",
      "telephone": "063 999 99 99",
      "password": "54321",
      "email": "makss007@gmail.com"
     };
     
const userData = [{...user, id: Math.random()},{...user2, id: Math.random()}];

  const fileName = 'all-users';

  const sendResponse = () => {
    response.json({
      status: 'success',
      user: userData
  })};

const sendError = () => {
  response.status(400);
  response.json({
    error: 'user was not saved'
  });
};

saveNewUser(fileName, userData) 
.then(sendResponse)
.catch(sendError);

}


module.exports = saveUserFile;