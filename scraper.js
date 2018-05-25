'use strict';

const fs = require('fs');

// check if data dir exists 
if (!fs.existsSync('./data')) {

	// create the 'data' dir
	fs.mkdir('./data', (err) => {
		if (err) { 
			console.log(err.message); 
		} else {
			// scrap site 
			
		}
	});
}
