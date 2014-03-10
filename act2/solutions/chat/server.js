var net = require('net')
  , duplex = require('duplex')
  , args = require('minimist')(process.argv.slice(2))
  , EventEmitter = new require('events').EventEmitter
  , createStream
  , chat
  , port = args.port || 8080;

// The duplex streams communicate using this EventEmitter
chat = new EventEmitter();

// Whenever there are new messages, print them out to the console
chat.on('message', function (data) {
  // Write it to the console
  console.log(data.toString());
});

// Creates a new duplex stream for each user
createStream = function () {
  var messageStream = duplex();

  // When data comes in from this user
  messageStream.on('_data', function (data) {
    // Emit an event on chat that contains the first 140 chars
    chat.emit('message', data.toString().trim().substring(0, 140), messageStream);
  });

  // This happens when the connection is killed
  messageStream.on('_end', function () {
    // Sends messages to everybody on the system
    this._end();
  });

  // When something happens in the chat, send it to the user
  chat.on('message', function (data, source) {
    // Don't send messages back to the client that sent them
    if(source != messageStream) {
      messageStream._data(data);
    }
  });

  return messageStream;
};

net.createServer(function (connection) {
  // Create a new duplex stream per user
  connection.pipe(createStream()).pipe(connection);

  // This will send a welcome message to this user and this user only
  connection.write('System > You are now connected\n');
})
.listen(port);

console.log('Chat server running on port ' + port);