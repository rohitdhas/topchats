const express = require('express');
const router = express.Router();
const { deleteMessage } = require('../controller/messageController')

router.delete('/message', deleteMessage);

module.exports = router;