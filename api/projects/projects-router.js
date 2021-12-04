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

router.get('/:id', checkId, (req, res, next) => { // eslint-disable-line
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

router.put('/:id', validateProject, checkId, (req, res, next) => {
  Projects.update(req.params.id, req.body)
    .then(project => {
      res.json(project);
    })
    .catch(error => {
      next(error);
    });
});

router.delete('/:id', checkId, (req, res, next) => {
  Projects.remove(req.params.id)
    .then(count => {
      res.status(200).json({ message: 'project deleted' });
    })
    .catch(error => {
      next(error);
    });
});

router.get("/:id/actions", checkId, (req, res, next) => {
	Projects.getProjectActions(req.params.id)
		.then(actions => {
			res.status(200).json(actions)
		})
		.catch(error => {
			next(error);
		})
})

router.use(errorHandling);

module.exports = router;
