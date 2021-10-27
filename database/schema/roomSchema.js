const mongoose = require('mongoose')

const Room = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    chats: [{ type: mongoose.Types.ObjectId, ref: "Message" }],
    users: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    admin: { type: mongoose.Types.ObjectId, ref: 'User' }
})

module.exports = mongoose.model('Room', Room);