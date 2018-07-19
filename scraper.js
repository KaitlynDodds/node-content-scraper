'use strict';

const fs = require('fs');
const crawler = require('./crawler');

// check if data dir exists 
if (!fs.existsSync('./data')) { 
	// create the 'data' dir
	fs.mkdir('./data', (err) => { 
		if (err) { 
			console.error(err.message); 
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
		console.error('Unable to scrape data:\n', err.message);
	}
}
