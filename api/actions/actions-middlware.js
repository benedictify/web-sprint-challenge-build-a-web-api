const Actions = require('./Actionss-model')

async function checkActionsId(req, res, next) { // eslint-disable-line
	try {
		const act = await Actions.get(req.params.id)

		if (act) {
			req.actions = act;
			next();
		} else {
			next({ status: 404, message: "Action not found" })
		}
	} catch (error) {
		next(error);
	}
}

function validateActions(req, res, next) { // eslint-disable-line
	if (!req.body.name || !req.body.description) {
		next({status: 400, message: 'action not complete'})
	} else {
		next();
	}
}

module.exports = {
	checkActionsId,
	validateActions
}
