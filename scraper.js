'use strict';

const fs = require('fs');
const crawler = require('./crawler');
const logger = require('./logger').logger;

// disable console.log to prevent unauthorized logging 
console.log = function() {}

// check if data dir exists 
if (!fs.existsSync('./data')) { 
	// create the 'data' dir
	fs.mkdir('./data', (err) => { 
		if (err) { 
			logger.log(err.message);
			// console.error(err.message); 
		} else {
			scrapeSite();
		}
	});
} else {
	scrapeSite();
}

function scrapeSite() {
	try {
	    // scrape site 
		crawler.scrape('http://www.shirts4mike.com', 'shirts.php');
	} catch (err) {
		logger.log(`Unable to scrape data: ${err.message}`);
		logger.write('Unable to scrape data:\n', err.message);
	}
}
