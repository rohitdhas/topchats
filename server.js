// _________________________ IMPORTS _________________________
require('dotenv').config();
const mongoose = require('mongoose');
const passport = require('passport')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
// _________________________ DB CONNECTION _________________________

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Mongoose Connected!✅")
    })
    .catch((err) => console.log(err))

// _________________________ MIDDLEWERES _________________________

app.use(express.json());
app.use(express.static('client/build'))
app.use(cors({ origin: "*", credentials: true }))

app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

app.use(cookieParser('secret'));
app.use(passport.initialize());
app.use(passport.session());

require("./passportJS_strategies/localAuth-config")(passport);
// _________________________ ROUTES _________________________

const userAuthRoutes = require('./Routes/userAuthRoutes');
const messageRoutes = require('./Routes/messageRoutes');
const roomRoutes = require('./Routes/roomRoutes');

app.use('/api', userAuthRoutes);
app.use('/api', messageRoutes);
app.use('/api/room', roomRoutes);

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

// __________________________________________________

const server = app.listen(process.env.PORT || 4000, (err) => {
    if (err) console.log(err)
    else {
        // Socket Connection
        require('./controller/socket_controller')
        console.log("Server is running on port 4000!")
    }
})

module.exports = { server };