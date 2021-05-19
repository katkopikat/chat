const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const PORT = 3000;
const rooms = new Map();

app.get('/rooms', (req, res) => {
    rooms.set('hello', '')
    res.json(rooms)
})

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);
})

server.listen(PORT, (err) => {
    if(err) {
        throw Error(err);
    }
    console.log(`Server is running on *:${PORT} port`)
})