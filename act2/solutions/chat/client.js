var net = require('net')
  , port = 8080
  , host = 'chat.benng.me'
  , messageStream = require('duplex')()
  , username
  , client;

// Change this to your name!
username = 'Anonymous';

/*
* When a user types into the console and hits enter,
* that input goes into the process.stdin stream.
* If we listen for the 'data' event, we can act on
* their input.
*
* TODO: When user input comes in, send it to the server!
* HINT: The duplex stream has a _data method for sending data
*/
process.stdin.on('data', function (data) {
  var message = username + ' > ' + data.toString();

  // Your one-liner here:
  messageStream._data(message);
});

/**
* Duplex streams emit the _data event when data comes in
* from the other end of the pipe (i.e. the chat server)
*
* TODO: Print out the incoming message to the console
* HINT: data is a binary buffer. Call data.toString() to
*       turn it into a human-readable string
*/
messageStream.on('_data', function (data) {

  // Your one-liner here:
  console.log(data.toString());
});

/**
* The _end event occurs when the connection is closed
* (e.g. if the server crashes or you get disconnected from the internet)
*/
messageStream.on('_end', function () {
  console.log('Connection to server closed');
  this._end();
  process.exit(1);
});

// Create a TCP connection
client = net.connect(port, host);

// Plug in our duplex stream
client.pipe(messageStream).pipe(client);
