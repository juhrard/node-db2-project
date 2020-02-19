const express = require('express');

const router = require('./routers/router.js');

const server = express();

server.use(express.json());

server.use('/api/cars', router);

module.exports = server;
