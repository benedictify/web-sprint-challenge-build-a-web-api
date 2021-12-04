const express = require('express')
const {
	errorHandling,
} = require('../middleware.js');
const { 
	checkActionId,
	validateAction
} = require('./actions-middleware') 
const actions = require('./actions-model.js')

const router = express.Router();

router.get('/', (req, res, next) => {
	actions.get()
		.then(actions => {
			res.status(200).json(actions)
		})
		.catch(error => {
			next(error);
		})
})

router.get('/:id', checkActionId, (req, res, next) => { // eslint-disable-line
	res.status(200).json(req.action)
})

router.post('/', validateAction, (req, res, next) => {
  actions.insert(req.body)
    .then(action => {
      res.status(201).json(action);
    })
    .catch(error => {
      next(error);
    });
});

router.put('/:id', validateAction, checkActionId, (req, res, next) => {
  actions.update(req.params.id, req.body)
    .then(action => {
      res.json(action);
    })
    .catch(error => {
      next(error);
    });
});

router.delete('/:id', checkActionId, (req, res, next) => {
  actions.remove(req.params.id)
    .then(() => {
      res.status(200).json({ message: 'action deleted' });
    })
    .catch(error => {
      next(error);
    });
});

router.use(errorHandling);

module.exports = router;
