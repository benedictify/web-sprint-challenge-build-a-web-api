// add middlewares here related to projects
const Project = require('./projects-model')

async function checkId(req, res, next) {
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

function errorHandling(err, req, res, next) {
  res.status(err.status || 500).json({
    message: `${err.message}`,
    stack: err.stack,
  });
}

module.exports = {
	checkId,
	errorHandling
}
