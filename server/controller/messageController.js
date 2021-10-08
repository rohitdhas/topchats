const Message = require('../database/schema/messageSchema');

const deleteMessage = (req, res) => {
    const refID = req.query.id;

    if (refID) {
        Message.findOneAndDelete({ refID })
            .then((data) => res.status(201).json({ message: "Message Deleted!", data }))
            .catch((err) => {
                console.log(err.message);
                res.status(500).json({ message: "Something went wrong!" })
            })
    }
}

module.exports = { deleteMessage }