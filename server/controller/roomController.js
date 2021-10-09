const ObjectId = require('mongoose').Types.ObjectId;
const Room = require('../database/schema/roomSchema')

const createNewRoom = async (req, res) => {
    const { name, admin } = req.body;

    let roomInDB = await Room.findOne({ name });
    if (roomInDB === null) {
        let newRoom = new Room({
            name,
            admin: ObjectId(admin)
        })
        let roomData = await newRoom.save();

        res.status(201).json({ message: "Room Created!", success: true, data: { name, id: roomData._id } })
    } else {
        res.status(403).json({ message: `Room with name: ${name} already exist! Select another name.`, success: false })
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

const roomData = async (req, res) => {
    const userId = req.user.id;

    try {
        let userRoomData = await Room.find({ $or: [{ 'admin': ObjectId(userId) }, { 'users': ObjectId(userId) }] })
        res.status(201).json({ data: userRoomData })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = { createNewRoom, deleteRoom, roomData };