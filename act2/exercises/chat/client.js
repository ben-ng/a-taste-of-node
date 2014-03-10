var net = require('net')
  , args = require('minimist')(process.argv.slice(2))
  , port = args.port || 8080
  , host = args.host || 'chat.benng.me'
  , messageStream = require('duplex')()
  , username
  , client;

console.log('Connecting to ' + host + ':' + port);

// Change this to your name!
username = 'Anonymous';

/*
* When user input comes in, send it to the server!
* HINT: The duplex stream has a _data method for sending data
*/
process.stdin.on('data', function (data) {
  var message = username + ' > ' + data.toString();

  // Your solution here
});

/**
* messageStream emits the _data event when data comes in
* from the other end of the pipe (i.e. the chat server)
*
* TODO: Print out the incoming message to the console
* HINT: data is a binary buffer. Call data.toString() to
*       turn it into a human-readable string
*/

/**
* messageStream emits the _end event occurs when the connection is closed
* (e.g. if the server crashes or you get disconnected from the internet)
*
* TODO: Print an error message and kill the process
* HINT: process.exit(code) will terminate the current process
*/

// Create a TCP connection
client = net.connect(port, host);

// What do we .pipe()?
