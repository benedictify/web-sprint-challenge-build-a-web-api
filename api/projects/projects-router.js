const express = require('express')
// require mw here, functions destructured
const Projects = require('./projects-model')
const Actions = require('../actions/actions-model')

const router = express.Router();

// global mw's if any

// * next: 
// router.verb(relative path, mw's, (req, res, next) => func to do stuff)
router.get('/', )

module.exports = router;
