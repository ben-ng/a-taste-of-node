var net = require('net')
  , duplex = require('duplex')
  , EventEmitter = new require("events").EventEmitter
  , createStream
  , chat
  , onlineCount = 0
  , port = 8080
  , maxConnections = 150;

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
    onlineCount--;

    // Sends messages to everybody on the system
    chat.emit('message', 'System > A user has disconnected\n');
    chat.emit('message', 'System > There are now ' + onlineCount + ' users online\n');
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

  // However, emitting on the chat object will cause all listeners
  // to get these messages:
  onlineCount++;
  chat.emit('message', 'System > A user has connected\n');
  chat.emit('message', 'System > There are now ' + onlineCount + ' users online\n');

  // Kick if too many people!
  if(onlineCount > maxConnections) {
    connection.write('You\'re connected, but there are too many people online right now.\n');
    connection.end('Please try again later.\n');
  }
  else {
    // This will send a welcome message to this user and this user only
    connection.write('*******************************************\n');
    connection.write('Hello there weary traveller!\n');
    connection.write('You just built your own chat client, how cool is that??\n');
    connection.write('*******************************************\n');
  }
})
.listen(port);

console.log('Chat server running on port ' + port);
