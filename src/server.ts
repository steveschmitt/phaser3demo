import * as http from "http";
import * as express from "express";
import { PlayerData } from "./playerdata";
import { Server, Socket } from "socket.io";

// create the Express  instance
const app: express.Application = express();

// create a web server with Express handling the requests
const server = http.createServer(app);

// create a socket.io server on the web server
const io = new Server(server);

// create object to hold player data
const players: { [id: string]: PlayerData } = {};

// serve files from the dist directory
app.use(express.static(__dirname));

// request for directory returns index.html file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// define what happens when a client connects to a socket
io.on('connection', (socket: Socket) => {
  console.log('a user connected', socket.id);
  // create a new player and add it to our players object
  players[socket.id] = {
    rotation: 90,
    x: Math.floor(Math.random() * 700) + 50,
    y: Math.floor(Math.random() * 500) + 50,
    playerId: socket.id,
    team: (Math.floor(Math.random() * 2) === 0) ? 'red' : 'blue'
  };
  // send the players object to the new client
  socket.emit('allplayers', players);
  // update all other clients of the new player
  socket.broadcast.emit('newplayer', players[socket.id]);

  // when a player disconnects, remove them from our players object
  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
    // remove this player from our players object
    delete players[socket.id];
    // emit a message to all players to remove this player
    io.emit('remove', socket.id);
  });
});

server.listen(8081, function () {
  console.log('Listening on', (server.address() as any).port);
});
