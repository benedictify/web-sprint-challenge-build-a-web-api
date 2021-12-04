const express = require('express')
const { 
	checkId,
	errorHandling,
	validateProject
} = require('./projects-middleware') 
const Projects = require('./projects-model.js')
// const Actions = require('../actions/actions-model')

const router = express.Router();

// global mw's if any

router.get('/', (req, res, next) => {
	Projects.get()
		.then(projects => {
			res.status(200).json(projects)
		})
		.catch(error => {
			next(error);
		})
})

router.get('/:id', checkId, (req, res, next) => {
	res.status(200).json(req.project)
})

router.post('/', validateProject, (req, res, next) => {
  Projects.insert(req.body)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(error => {
      next(error);
    });
});

router.use(errorHandling);

module.exports = router;
