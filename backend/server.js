const express = require('express');
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
      origin: '*'
    }
  })

app.use(express.json());

const rooms = new Map();

// app.get('/rooms/:id', (req, res) => {
//     // const { roomId } = req.params;

//     // // const users = [...rooms.get(roomId).get('users').values()];
//     // // const messages = [...rooms.get(roomId).get('messages').values()];

//     // const chatData = rooms.has(roomId)
//     //         ? { users: [...rooms.get(roomId).get('users').values()],
//     //             messages : [...rooms.get(roomId).get('messages').values()]
//     //           }
//     //         : { users: [], messages: [] }

//     // res.json(chatData);
// });

app.get('/rooms/:id', (req, res) => {
    const { id: roomId } = req.params;
    const obj = rooms.has(roomId)
      ? {
          users: [...rooms.get(roomId).get('users').values()],
          messages: [...rooms.get(roomId).get('messages').values()],
        }
      : { users: [], messages: [] };
    res.json(obj);
  });

app.post('/rooms', (req, res) => {
   const { roomId } = req.body;
   if (!rooms.has(roomId)) {
       rooms. set(
        roomId, 
        new Map([
            ['users', new Map()],
            ['messages', []]
        ]) 
      )
   }
    res.send();
})

io.on('connection', (socket) => {
    socket.on('ROOM:JOIN', ({ roomId, userName }) => {
        socket.join(roomId); 
        //save joined user in the local BD
        rooms.get(roomId).get('users').set(socket.id, userName); 
        //get online users list and 
        const users = [...rooms.get(roomId).get('users').values()]; 
        console.log('users in room', users)
        socket.in(roomId).emit('ROOM:SET_ONLINE_USERS', users); 
    });

    socket.on('disconnect', () => {
        rooms.forEach((value, roomId) => {
          const exitUser = value.get('users').delete(socket.id);
          //  user whos left the room
          if (exitUser) {
            // update online users list
            const users = [...value.get('users').values()];
            console.log ('users online ', users)
            socket.in(roomId).emit('ROOM:SET_ONLINE_USERS', users);
          }
        });
    })

})

const PORT = process.env.PORT || 5000;
server.listen(PORT, (err) => {
    if(err) {
        throw Error(err);
    }
    console.log(`Server is running on *:${PORT} port`)
})