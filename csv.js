const Json2csvParser = require('json2csv').Parser;
const logger = require('./logger').logger;
const fs = require('fs');
 
function toCSV(records) {
	const fields = Object.keys(records);
	fields.push('time');

	// get current date 
	const date = new Date();
	const filename = `data/${date.getFullYear()}-${date.getMonth()}-${date.getDay()}.csv`;


	const opts = {
		fields: fields,
		header: (overwriteFile(filename)) // returns false if file does not exist, will need headers only when writing to the file for the first time
	};

	// add timestamp to csv records 
	records.time = date.toString('en-US');

	// parse json to csv 
	try {
		const json2csvParser = new Json2csvParser(opts);
		const csv = json2csvParser.parse(records);

		// if file already exists, overwrite 
		if (overwriteFile(filename)) {
			// write data to csv file 
			fs.writeFile(filename, `${csv}\n`, function (err) {
		  		if (err) throw err;
		  		logger.write('.');
			});
		} else {
			// write data to csv file 
			fs.appendFile(filename, `${csv}\n`, function (err) {
		  		if (err) throw err;
		  		logger.write('.');
			});
		}

	} catch (err) {
		logger.log(`Unable to write to CSV file: ${err.message}`);
		logger.log(`Unable to write to CSV file: ${err.message}`);
	}
}

// check if last modified date is more than 5 sec old 
function overwriteFile(filename) {
	if (fs.existsSync(filename)) {
		const stats = fs.statSync(filename);
		const lastModified = new Date(stats.mtime);
		const now = new Date();

		return (now.getSeconds() - lastModified.getSeconds() > 2);
	} else {
		return true;
	}
}

module.exports.toCSV = toCSV;