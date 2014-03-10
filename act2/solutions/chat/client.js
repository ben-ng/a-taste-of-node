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
* When a user types into the console and hits enter,
* that input goes into the process.stdin stream.
* If we listen for the 'data' event, we can act on
* their input.
*/
process.stdin.on('data', function (data) {
  var message = username + ' > ' + data.toString();

  messageStream._data(message);
});

/**
* messageStream emits the _data event when data comes in
* from the other end of the pipe (i.e. the chat server)
*/
messageStream.on('_data', function (data) {
  console.log(data.toString());
});

/**
* messageStream emits the _end event occurs when the connection is closed
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
