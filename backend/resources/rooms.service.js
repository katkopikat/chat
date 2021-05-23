const roomsRepo = require('./rooms.repository');

const getDatabyRoom = roomId => roomsRepo.getDatabyRoom(roomId);
const createRoom = roomId => roomsRepo.createRoom(roomId);

module.exports = { getDatabyRoom, createRoom }