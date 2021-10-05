const mongoose = require('mongoose')

const Room = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    chats: [{ type: mongoose.Types.ObjectId, ref: "Message" }],
    users: {
        type: Array,
        required: true,
        default: []
    },
    admin: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Room', Room);