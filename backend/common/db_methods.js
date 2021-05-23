const getUsersList = (roomsDB, roomId) => {
    return [...roomsDB.get(roomId).get('users').values()]
}

const getMessagesList = (roomsDB, roomId) => {
    return [...roomsDB.get(roomId).get('messages').values()]
}

module.exports = { getUsersList, getMessagesList };