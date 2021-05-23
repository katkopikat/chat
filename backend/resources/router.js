const router = require('express').Router();
const roomsService = require('./rooms.service');

router.route('/rooms/:id').get((req, res) => {
    const { id: roomId } = req.params;
    const obj = roomsService.getDatabyRoom(roomId);
    res.json(obj);
});

router.route('/rooms').post((req, res) => {
   const { roomId } = req.body;
   roomsService.createRoom(roomId);
   res.send();
})

module.exports = router;