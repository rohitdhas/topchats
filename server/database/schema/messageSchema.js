const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Message = new Schema({
    sender: {
        type: String,
        required: true,
        ref: 'User'
    },
    message: {
        type: String,
        required: true
    },
    datetime: {
        type: String,
        default: new Date().toLocaleString()
    },
    room: {
        type: String,
        required: true
    },
    seenBy: [{ type: String, required: true, ref: 'User' }]
})

module.exports = mongoose.model('Message', Message);