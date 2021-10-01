const express = require('express');
const router = express.Router();
const { localLogin, logout, register, getUser } = require('../controller/userAuthController')

router.post("/login", isAuthenticated, localLogin);

router.post("/register", isAuthenticated, register);

router.delete("/logout", logout);

router.get('/user', getUser);

// _________________________ MIDDLEWERES _________________________

function isAuthenticated(req, res, next) {
    if (req.user) {
        return res.status(200).json({ message: "Already Logged In!", success: true })
    } else {
        next();
    }
}
module.exports = router;
