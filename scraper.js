'use strict';

const fs = require('fs');
const crawler = require('./crawler');

// check if data dir exists 
if (!fs.existsSync('./data')) {

	// create the 'data' dir
	fs.mkdir('./data', (err) => {
		if (err) { 
			console.log(err.message); 
		} else {
			// scrap site 
			crawler.scrape('http://www.shirts4mike.com', 'shirts.php');
		}
	});
}
