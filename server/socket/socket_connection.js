module.exports = (server) => {
    const io = require('socket.io')(server, {
        cors: {
            origin: "http://localhost:3000"
        }
    })

    io.on('connection', (socket) => {
        // Messages

        socket.on('message', (message, username, room) => {
            socket.to(room).emit('recieve_message', `${username} - ${message}`)
        })

        // Rooms
        socket.on('join-room', (room, cb) => {
            socket.join(room);
            cb(`${room} Joined!`)
        })
    })
}