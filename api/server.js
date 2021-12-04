const express = require('express');
const { logger } = require('./middleware')

const projectsRouter = require('../api/projects/projects-router');
const actionsRouter = require('../api/actions/actions-router');

const server = express();

server.use(express.json());

// global mw
server.use(logger)

// routers
server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

module.exports = server;
