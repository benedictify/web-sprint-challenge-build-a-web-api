const logger = (req, res, next) => {
	console.log(`\n${req.method} request to ${req.path}\n`);
	next();
}

function errorHandling(err, req, res, next) { // eslint-disable-line
  res.status(err.status || 500).json({
    message: `${err.message}`,
    stack: err.stack,
  });
}

module.exports = {
	logger, 
	errorHandling,
}
