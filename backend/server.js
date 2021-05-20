const express = require('express');
const { map } = require('methods');
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
      origin: '*'
    }
  })

app.use(express.json());

const rooms = new Map();

app.get('/rooms', (req, res) => {
    rooms.set('hello', '')
    const { userName, roomId } = req.params;
    console.log(userName, roomId)

    res.json(rooms)
    
})

app.post('/rooms', (req, res) => {
    const { roomId } = req.body;
   if(!rooms.has(roomId)) {
       rooms. set(
        roomId, 
        new Map([
            ['users', new Map()],
            ['messages', []]
        ]) 
    )
   }
    res.sendStatus(200);
})

io.on('connection', (socket) => {
    socket.on('ROOM:JOIN', ({ roomId, userName }) => {
        socket.join(roomId); // подключение к определённой комнате
        rooms.get(roomId).get('users').set(socket.id, userName); //сохраняетм пользователя в "БД"
        const users = [...rooms.get(roomId).get('users').values()]; 
        console.log('roomId', roomId);//получить всех пользователей
        socket.broadcast.in(roomId).emit('ROOM:JOINED', users); 

        //все пользователи получат массив всех пользоватеьей в этом диалоге
    })
  
    console.log('user connected', socket.id)
})

const PORT = process.env.PORT || 5000;
server.listen(PORT, (err) => {
    if(err) {
        throw Error(err);
    }
    console.log(`Server is running on *:${PORT} port`)
})