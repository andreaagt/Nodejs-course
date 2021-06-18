// Modulo para crear un servidor:
const http = require('http');
// Hostname es el localhost
const { hostname } = require('os');
// Puerto definido
const port = 3000;
// Modulo para leer un archivo del programa
const fs = require('fs')
const moment = require('moment')

// Cambiar fecha
const christmas = '2022-12-25';
console.log(moment(christmas).format('LL'))

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');

  let route = './view/'

  switch (req.url) {
    case '/':
      route += 'index.html';
      res.statusCode = 200;
      break;
    case '/contact':
      route += 'contact.html'
      res.statusCode = 200;
      break;
    case '/contact-us':
      res.statusCode = 301;
      res.setHeader('Location', '/contact');
      res.end()
      break;
  
    default:
      route += '404.html'
      res.statusCode = 404;
      break;
  }

  fs.readFile(route, (err, data) => {
    if (err) {
      console.log(err)
      res.end()
    } else {
      res.end(data)
    }
  })
});

server.listen(port, () => {
  console.log(`listening on port ${port}`)
});