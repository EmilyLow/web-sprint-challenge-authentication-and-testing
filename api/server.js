const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session)

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');
const dbConfig = require('../database/dbConfig.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "This secret is my secret",
    store: new KnexSessionStore({
        knex: dbConfig,
        createtable: true
    })
}))

server.use('/api/auth', authRouter);
// server.use('/api/jokes', authenticate, jokesRouter);
server.use('/api/jokes', jokesRouter);

//Me
server.use((err, req, res, next) => {
    console.log(err)

    res.status(500).json({
        message: "Something went wrong",
    })
})

module.exports = server;
