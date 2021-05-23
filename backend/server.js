const express = require('express');
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
      origin: '*'
    }
  })

const router= require('./resources/router');
const rooms = require('./common/rooms');
const db = require('./common/db_methods');

app.use(express.json());
app.use('/', router);

io.on('connection', (socket) => {
    socket.on('ROOM:JOIN', ({ roomId, userName }) => {
        socket.join(roomId); 
        //save joined user in the local BD
        rooms.get(roomId).get('users').set(socket.id, userName); 
        //get online users list
        const users = db.getUsersList(rooms, roomId); 
        socket.in(roomId).emit('ROOM:SET_ONLINE_USERS', users); 
    });

    socket.on('ROOM:SET_NEW_MESSAGE', ({ roomId, author, messageText, messageTime }) => {
        const message = {
            author,
            messageText,
            messageTime
        }
        rooms.get(roomId).get('messages').push(message); 
        socket.in(roomId).emit('ROOM:SET_NEW_MESSAGE', message); 
    });

    socket.on('disconnect', () => {
        rooms.forEach((value, roomId) => {
          const leavingUser = value.get('users').delete(socket.id);
          //  user who`s left the room
          if (leavingUser) {
            // update online users list
            const users = [...value.get('users').values()];
            socket.in(roomId).emit('ROOM:SET_ONLINE_USERS', users);
          }
        });
    })

})

const PORT = process.env.PORT || 5000;

server.listen(PORT, (err) => {
    console.log(`Server is running on *:${PORT} port`)
})

module.exports = app;