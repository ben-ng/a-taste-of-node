var EventEmitter = require('events').EventEmitter
  , party = new EventEmitter();

party.on('arrive', function (friend) {
  console.log(friend + ' is here!');
});

party.emit('arrive', 'Annie'); // => Annie is here!
party.emit('arrive', 'Becky'); // => Becky is here!
party.emit('arrive', 'Carl');  // => Carl is here!
