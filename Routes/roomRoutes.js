const express = require('express');
const router = express.Router();
const { deleteRoom, createNewRoom, userRoomData, roomData, addMeToRoom, blockUser, unblockUser } = require('../controller/roomController');

router.post('/', isAuthenticated, createNewRoom);
router.delete('/', isAuthenticated, deleteRoom);
router.get('/user-data', isAuthenticated, userRoomData)
router.get('/', isAuthenticated, roomData)
router.patch('/', isAuthenticated, addMeToRoom)
router.patch('/block', isAuthenticated, blockUser)
router.patch('/unblock', isAuthenticated, unblockUser)


// __________________________ MIDDLEWERES __________________________

function isAuthenticated(req, res, next) {
    if (!req.user) {
        return res.status(401).json({ message: "Please Log In!" })
    } else {
        next();
    }
}

// __________________________________________________________________

module.exports = router;