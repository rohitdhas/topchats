const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Message = new Schema({
    sender: {
        type: Object,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    time: {
        type: String
    },
    refID: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Message', Message);