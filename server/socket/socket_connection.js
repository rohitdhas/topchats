module.exports = (server) => {
    const io = require('socket.io')(server, {
        cors: {
            origin: "http://localhost:3000"
        }
    })

    io.on('connection', (socket) => {
        // Messages

        socket.on('message', (messageData) => {
            socket.to(messageData.room).emit('recieve_message', messageData)
        })

        // Join Room
        socket.on('join-room', (room) => {
            socket.join(room);
        })

        socket.on('leave-all', () => {
            let connectedRooms = Array.from(socket.rooms).slice(1)
            connectedRooms.forEach(room => {
                socket.leave(room);
            })
        })
    })
}