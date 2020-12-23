var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var players = {};
 
app.use(express.static(__dirname + '/dist'));
 
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});
 
io.on('connection', function (socket) {
  console.log('a user connected');
  // create a new player and add it to our players object
  players[socket.id] = {
    rotation: 0,
    x: Math.floor(Math.random() * 700) + 50,
    y: Math.floor(Math.random() * 500) + 50,
    playerId: socket.id,
    team: (Math.floor(Math.random() * 2) == 0) ? 'red' : 'blue'
  };
  // send the players object to the new client
  socket.emit('allplayers', players);
  // update all other clients of the new player
  socket.broadcast.emit('newplayer', players[socket.id]);
 
  // when a player disconnects, remove them from our players object
  socket.on('disconnect', function () {
    console.log('user disconnected');
    // remove this player from our players object
    delete players[socket.id];
    // emit a message to all players to remove this player
    io.emit('remove', socket.id);
  });
});
 
server.listen(8081, function () {
  console.log(`Listening on ${server.address().port}`);
});