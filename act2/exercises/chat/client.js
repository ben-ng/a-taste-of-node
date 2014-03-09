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
