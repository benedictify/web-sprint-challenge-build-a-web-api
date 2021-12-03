const express = require('express');
const { logger } = require('./middleware')

const projectsRouter = require('../api/projects/projects-router');

const server = express();

server.use(express.json());

// global mw
server.use(logger)

// routers
server.use('/api/projects', projectsRouter);

// projects mw



// √ Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
