const Project = require('./projects-model')

async function checkProjectId(req, res, next) { // eslint-disable-line
	try {
		const proj = await Project.get(req.params.id)

		if (proj) {
			req.project = proj;
			next();
		} else {
			next({ status: 404, message: "project not found" })
		}
	} catch (error) {
		next(error);
	}
}

function validateProject(req, res, next) { // eslint-disable-line
	if (!req.body.name || !req.body.description) {
		next({status: 400, message: 'project not complete'})
	} else {
		next();
	}
}

module.exports = {
	checkProjectId,
	validateProject
}
