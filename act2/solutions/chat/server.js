var net = require('net')
  , duplex = require('duplex')
  , EventEmitter = require('events').EventEmitter
  , createStream
  , chat
  , onlineCount = 0
  , port = 8080
  , maxConnections = 150

    // tug of war fun!
  , tugOWar = {
      length: 9 // so we always have a winner
    , left: 4
    }
  , pullLeft
  , pullRight
  , showRope
  , drawRope
  , changeChallenge
  , currentChallenge
  , challengeCursor
  , challengeMessage
  , getRandom;

chat = new EventEmitter();

// Whenever there are new messages, print them out to the console
chat.on('message', function (data, src, silent) {
  var msg = data.toString();

  // Write it to the console
  console.log(msg);

  // Check if it solved the challenge
  if(!silent && currentChallenge != null && msg.indexOf(currentChallenge) >= 0) {
    var team = msg.replace(/^.*\>/, '').replace(new RegExp(currentChallenge), '').trim()
      , delay;

    if(team.length) {
      team = team.charAt(0).toUpperCase();

      if(team == 'L' || team == 'R') {

        delay = getRandom(8, 16);

        setTimeout(changeChallenge, delay * 1000);

        currentChallenge = null;

        chat.emit('message', 'CHALLENGE SOLVED BY ' + team + '!');

        if(team == 'L')
          pullLeft(1);
        else
          pullRight(1);

        chat.emit('message', 'NEXT CHALLENGE IN ' + delay + ' seconds!');
        return;
      }
    }

    chat.emit('message', 'SYSTEM > You didn\'t specify a team to pull for!\n');
    chat.emit('message', 'SYSTEM > Syntax is: <word> <number> <team>\n');
    chat.emit('message', 'SYSTEM > i.e. evented 918 r\n');
  }
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

// Picks a random-ish new challenge broadcasts it
changeChallenge = function () {
  var words = [
        'javascript'
      , 'backpressure'
      , 'asyncronous'
      , 'node.js'
      , 'evented'
      , 'event loop'
      , 'domains'
      , 'streams'
      , 'duplex'
      , 'tiny modules'
      , 'npm'
      , 'callback'
      ];

  challengeCursor = (getRandom(1, 4) + 1) % words.length;

  currentChallenge = words[challengeCursor] + ' ' + getRandom(10, 1000);

  chat.emit('message', 'NEW CHALLENGE: ' + challengeMessage(), null, true);
};

challengeMessage = function () {
  return 'Type "' + currentChallenge + '" followed by L or R to PULL!\n';
};

getRandom = function (min, max) {
  return Math.floor(Math.random()*(max-min+1)+min);
};

pullLeft = function (amt) {
  tugOWar.left -= amt;
  if(tugOWar.left < 0)
    tugOWar.left = 0;

  showRope();
};

pullRight = function (amt) {
  tugOWar.left += amt;
  if(tugOWar.left > tugOWar.length - 1)
    tugOWar.left = tugOWar.length - 1;

  showRope();
};

showRope = function () {
  chat.emit('message', 'Tug Of War:\n');
  chat.emit('message', drawRope());
};

drawRope = function () {
  var rope = ['Team Lefty |'];

  for(var i=0, ii=tugOWar.length; i<ii; ++i) {
    if(i === tugOWar.left)
      rope.push('*');
    else
      rope.push('-');
  }

  rope.push('| Team Righty\n');

  return rope.join('');
};

// Load an initial challenge
changeChallenge();

// Create the TCP server
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
    connection.write('Welcome to Twich Plays Tug-O-War!\n');
    connection.write('Solve challenges for extra power! \n');
    connection.write('Current Game Status:\n');
    connection.write(drawRope());
    connection.write('Current Challenge: ' + challengeMessage());
    connection.write('*******************************************\n');
  }
})
.listen(port);

console.log('Chat server running on port ' + port);
