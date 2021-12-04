const express = require('express')
const { 
	errorHandling,
} = require('../middleware') 
const { 
	checkProjectId,
	validateProject
} = require('./projects-middleware') 
const Projects = require('./projects-model.js')

const router = express.Router();

router.get('/', (req, res, next) => {
	Projects.get()
		.then(projects => {
			res.status(200).json(projects)
		})
		.catch(error => {
			next(error);
		})
})

router.get('/:id', checkProjectId, (req, res, next) => { // eslint-disable-line
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

router.put('/:id', validateProject, checkProjectId, (req, res, next) => {
  Projects.update(req.params.id, req.body)
    .then(project => {
      res.json(project);
    })
    .catch(error => {
      next(error);
    });
});

router.delete('/:id', checkProjectId, (req, res, next) => {
  Projects.remove(req.params.id)
    .then(() => {
      res.status(200).json({ message: 'project deleted' });
    })
    .catch(error => {
      next(error);
    });
});

router.get("/:id/actions", checkProjectId, (req, res, next) => {
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
