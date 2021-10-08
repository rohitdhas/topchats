// _________________________ IMPORTS _________________________
require('dotenv').config();
const mongoose = require('mongoose');
const passport = require('passport')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const app = express();
// _________________________ DB CONNECTION _________________________

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Mongoose Connected!✅")
        let server = app.listen(4000, (err) => {
            if (err) console.log(err)
            else console.log("Server is running on port 4000!");
        })

        // Socket Connection
        require('./controller/socket_controller')(server)
    })
    .catch((err) => console.log(err))

// _________________________ MIDDLEWERES _________________________

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }))

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

app.use(userAuthRoutes);
app.use(messageRoutes);

// __________________________________________________
