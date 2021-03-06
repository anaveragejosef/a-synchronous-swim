const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
    next();
  }

  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, headers);
    res.end(messageQueue.dequeue());
    next();
  } else if (req.method === 'GET' && req.url === '/background.jpg') {
    // Send image back
    fs.readFile(this.backgroundImageFile, (err, data) => {
      if (err) { // Bad request
        res.writeHead(404, headers);
        res.end();
        next();
      } else { // Good request
        res.writeHead(200, {'Content-Type': 'image/jpeg'})
        res.write(data);
        res.end();
        next();
      }
    })
  }

  if (req.method === 'POST' && req.url === '/background.jpg') {
    // Do something

  }
  // invoke next() at the end of a request to help with testing!
};