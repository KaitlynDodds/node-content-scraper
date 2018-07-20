'use strict';

const fs = require('fs');

const logger = {}

logger.log = function(errMsg) {
	const log = `[${new Date().toString()}] ${errMsg}`;
	if (!fs.existsSync('logs/')) {
		fs.mkdirSync('logs/');
	}
	// write errors to log file 
	fs.appendFile(`logs/scraper-error.log`, `${log}\n`, function (err) {
		if (err) throw err;
	});
}

logger.write = function(errMsg) {
	process.stdout.write(`${errMsg}\n`);
}

module.exports.logger = logger;