import * as http from "http";
import * as os from "os";
import * as express from "express";
import { PlayerData, PositionMessage } from "./playerdata";
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

interface ColorPair {
    num: number,
    name: string
}

const colors: ColorPair[] = [
    { num: 0xffffff, name: "White" },
    { num: 0xff9933, name: "Orange" },
    { num: 0xffff33, name: "Yellow" },
    { num: 0x33ff33, name: "Lime" },
    { num: 0x33ffcc, name: "Turquoise" },
    { num: 0x33ccff, name: "Cyan" }, // Sky Blue
    { num: 0x3366ff, name: "Indigo" }, // Royal Blue
    { num: 0x6633ff, name: "Purple" }, //Han Purple
    { num: 0xcc33ff, name: "Magenta" },
    { num: 0xff3399, name: "Pink" },
    { num: 0x006600, name: "Green" },
    { num: 0x666699, name: "Gray" }, // blue-gray
    { num: 0xff3333, name: "Red" },
    { num: 0x000066, name: "Navy" },
];

let playerCount = 0;

// define what happens when a client connects to a socket
io.on('connection', (socket: Socket) => {
    console.log('a user connected', socket.id);
    // create a new player and add it to our players object
    const colorPair = colors[playerCount % colors.length];
    players[socket.id] = {
        rotation: 90,
        x: Math.floor(Math.random() * 700) + 50,
        y: Math.floor(Math.random() * 500) + 50,
        playerId: socket.id,
        color: colorPair.num,
        name: colorPair.name
    };

    console.log(playerCount, players[socket.id]);
    playerCount++;

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

    // when we get a position message, add the playerId and broadcast to other clients
    socket.on('position', (msg: PositionMessage) => {
        msg.pid = socket.id;
        socket.broadcast.emit('position', msg);
    });
});

// Host 0.0.0.0 allows external connections, but you may need to open your firewall.
const host = '0.0.0.0';
const port = (process.env.PORT || 8081) as number;
server.listen(port, host, () => {
    const ip = getIP();
    console.log(`Listening on ${ip}:${port}`);
});

// Get the IPv4 address of this computer, just so we can print it
function getIP() {
    const nets: os.NetworkInterfaceInfo[] = [];
    Object.values(os.networkInterfaces()).map(ar => nets.push(...ar));
    const net = nets.find((item) => !item.internal && item.family === "IPv4");
    const ip = net && net.address;
    return ip;
}
