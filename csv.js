const Json2csvParser = require('json2csv').Parser;
var fs = require('fs');
 
function toCSV(records) {
	const fields = Object.keys(records);
	fields.push('time');

	// get current date 
	const date = new Date();
	const filename = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;


	const opts = {
		fields: fields,
		header: (!fs.existsSync(`data/${filename}.csv`)) // returns false if file does not exist, will need headers only when writing to the file for the first time
	};

	// add timestamp to csv records 
	records.time = date.toString('en-US');

	// parse json to csv 
	try {
		const json2csvParser = new Json2csvParser(opts);
		const csv = json2csvParser.parse(records);

		// if file already exists, overwrite 
		

		// write data to csv file 
		fs.appendFile(`data/${filename}.csv`, `${csv}\n`, function (err) {
	  		if (err) throw err;
	  		console.log('.');
		});
	} catch (err) {
		console.error(`Unable to write to CSV file: ${err.message}`);
	}
}

function overwriteFile(filename) {

	// check if last modified date is more than 60 sec old 

}

module.exports.toCSV = toCSV;