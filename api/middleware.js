const logger = (req, res, next) => {
	console.log(`\n${req.method} request to ${req.path}\n`);
	next();
}

module.exports = {
	logger
}
