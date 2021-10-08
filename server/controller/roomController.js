const ObjectId = require('mongoose').Types.ObjectId;
const Room = require('../database/schema/roomSchema')

const createNewRoom = async (req, res) => {
    const { name, admin } = req.body;

    let roomInDB = await Room.find({ name });
    if (roomInDB === null) {

        let newRoom = new Room({
            name,
            admin: ObjectId(admin),
            users: [ObjectId(admin)]
        })
        let roomData = newRoom.save();

        res.status(201).json({ message: "Room Created!", success: true, data: { name, id: roomData._id } })
    } else {
        res.status(403).json({ message: `Room with name: ${name} already exist!`, success: false })
    }
}

const deleteRoom = async (req, res) => {
    const roomID = req.query.id;
    try {
        let roomInDB = await Room.findByIdAndDelete(roomID);
        if (roomInDB === null) {
            res.status(403).json({ message: `Room doesn't exist!`, success: false })
        } else {
            res.status(201).json({ message: "Room Deleted!", success: true })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = { createNewRoom, deleteRoom };