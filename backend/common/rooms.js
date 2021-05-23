const rooms = new Map();

/*
model rooms (localBD Map)
const rooms = {
    roomId1: [
        ['users',
            { 'socket.id': 'userName' },
            { 'socket.id': 'userName' },
        ],
        ['messages', [
                {
                "author": "Марк",
                "messageText": "Привет, идём в баскет сегодня?",
                "messageTime": "13:17"
                },
                {
                "author": "Кир",
                "messageText": "Да, го на площадку к 19",
                "messageTime": "13:19"
                },  
            ]
        ]
    ],
    roomId2: ['users'],  ['messages'],
}
*/

module.exports = rooms;