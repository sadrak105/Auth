const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');

const registerRouter = require('./users/registerRouter.js');
const loginRouter = require('./users/loginRouter.js');
const usersRouter = require('./users/usersRouter.js');
const sessionConfig = require('./users/sessionConfig.js');

const server = express();

mongoose
.connect('mongodb://localhost/authpassdb')
.then(conn => {
    console.log('\n=== connected to mongo ===\n')
})
.catch(err => {
    console.log('error connecting to mongo', err)
})


server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(session(sessionConfig));

server.use('/api/register', registerRouter);
server.use('/api/login', loginRouter);
server.use('/api/users', usersRouter);

server.get('/', function(req, res) {
    res.status(200).json({ api: 'running' })
})

server.listen(9000, () => {console.log('/n=== Server running on 9k ===/n')})