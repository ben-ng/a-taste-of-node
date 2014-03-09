var http = require('http')
  , i = 1;

http.createServer(function (req, res) {

  res.writeHead(200, {'Content-Type': 'text/plain'});

  res.end('Hello visitor #' + i + '\n');

  ++i;

}).listen(4000, '127.0.0.1');

console.log('Server running on port 4000!');
