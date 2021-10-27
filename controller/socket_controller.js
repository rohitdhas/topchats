const Message = require('../database/schema/messageSchema')
const Room = require('../database/schema/roomSchema')
const { server } = require('../server');

const io = require('socket.io')(server, {
    cors: {
        origin: "*"
    }
})


io.on('connection', (socket) => {
    // Messages

    socket.on('message', async (messageData) => {
        const { roomId, sender, time, message, refID } = messageData;
        socket.to(roomId).emit('recieve_message', messageData)

        let newMsg = new Message({ sender, message, time, refID });
        let msgData = await newMsg.save()
        try {
            await Room.findByIdAndUpdate(roomId, { $push: { 'chats': msgData._id } })
        } catch (err) {
            return
        }

    })

    // Join Room
    socket.on('join-room', async (roomId, userId) => {
        let roomInDB;
        try {
            roomInDB = await Room.findById(roomId);
        } catch (err) {
            socket.join(roomId);
            io.to(roomId).emit("Bot", { message: `ERR - Room with id: ${roomId} doesn't exist!` })
            socket.leave(roomId);
        }

        if (!roomInDB) return;
        else {
            socket.join(roomId);

            // Sending room data with last 100 chats back to room
            Room.findById(roomId).populate('chats').exec((err, roomData) => {
                let last100Chats = roomData.chats.reverse().slice(0, 101).reverse();
                roomData.chats = last100Chats;
                io.to(roomId).emit('room_data', roomData);
            })
        }
    })

    socket.on('leave-room', (roomID, username) => {
        io.to(roomID).emit('Bot', { message: `${username} Left!` })
        socket.leave(roomID);
    })

    socket.on('leave-all', () => {
        let connectedRooms = Array.from(socket.rooms).slice(1);

        connectedRooms.forEach(room => {
            socket.leave(room);
        })
    })
})