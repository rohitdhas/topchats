const Message = require('../database/schema/messageSchema')
const Room = require('../database/schema/roomSchema')

module.exports = (server) => {
    const io = require('socket.io')(server, {
        cors: {
            origin: "http://localhost:3000"
        }
    })

    io.on('connection', (socket) => {
        // Messages

        socket.on('message', async (messageData) => {
            const { room, sender, time, message, refID } = messageData;
            socket.to(room).emit('recieve_message', messageData)

            let newMsg = new Message({ sender, message, time, refID });
            let msgData = await newMsg.save()

            await Room.findOneAndUpdate({ name: room }, { $push: { 'chats': msgData._id } });
        })

        // Join Room
        socket.on('join-room', async (room, username) => {
            let roomInDB = await Room.findOne({ name: room });
            if (roomInDB === null) {
                return
            } else {
                socket.join(room);

                // Sending room data with last 100 chats back to room
                Room.findOne({ name: room }).populate('chats').exec((err, roomData) => {
                    let last100Chats = roomData.chats.reverse().slice(0, 101).reverse();
                    roomData.chats = last100Chats;
                    io.to(room).emit('room_data', roomData);
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
}

// TODO: make storing and retriving message work - DONE
// TODO: create admin dashboard and set room permessions 
// TODO: make ui/ux better
