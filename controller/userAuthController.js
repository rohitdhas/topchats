const User = require('../database/schema/userSchema');
const passport = require('passport');
const bcrypt = require('bcrypt');

const localLogin = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {

        if (err) return res.status(500).json({ message: err.message });
        if (!user) res.json({ message: info.message, success: false });

        else {
            req.logIn(user, (err) => {
                if (err) res.status(500).json({ message: err.message });
                else res.status(201).json({ message: "Logged In!", success: true })
            });
        }
    })(req, res, next);
}

const logout = (req, res) => {
    req.logOut();
    res.json({ message: "Logged Out!", success: true });
}

const register = async (req, res) => {
    const { username, password } = req.body;

    try {
        let userInDB = await User.findOne({ username });
        if (userInDB === null) {
            const hashedPassword = await bcrypt.hash(password, 10);
            req.body.password = hashedPassword;

            const user = new User(req.body);
            user.save();
            res.status(201).json({ message: "Account Created!", success: true });
        } else {
            res.status(201).json({ message: "Username already exist!", success: false });
        }
    } catch (err) {
        res.status(500).json({ message: err.message, success: false })
    }
}

const getUser = (req, res) => {
    if (req.user) {
        return res.status(201).json({ data: req.user })
    } else {
        return res.status(401).json({ message: "Not Logged In!" })
    }
}

module.exports = { localLogin, logout, register, getUser }