const rooms = require('../common/rooms');
const db = require('../common/db_methods');

const getDatabyRoom = (roomId) => {
    const obj = rooms.has(roomId)
    ? {
        users: db.getUsersList(rooms, roomId),
        messages: db.getMessagesList(rooms, roomId),
      }
    : { users: [],
      messages: []
    };

    return obj;
}

const createRoom = (roomId) => {
    if (!rooms.has(roomId)) {
        rooms. set(
         roomId, 
         new Map([
             ['users', new Map()],
             ['messages', []]
         ]) 
       )
    }
}

module.exports = { getDatabyRoom, createRoom };

