'use strict'

const Crawler = require('crawler');

function scrape(uri, path = "") {

	// create new crawler 
	const crawler = new Crawler({
		// This will be called for each crawled page
	    callback : function (err, res, done) {
			if (err) {
	            console.log(err);
	        } else {
	        	// setup to use jquery
	            var $ = res.$;

	            // setup to use jquery
	        }

	        done();
	    }
	});

	// make direct hit on known url 
	crawler.direct({
	    uri: `${uri}/${path}`,
	    skipEventRequest: false, // defaults to true, direct requests won't trigger Evnet:'request'
	    callback: function(err, res) {
	        if(err) {
	            console.log(err)
	        } else {
	        	// setup to use jquery
	            let $ = res.$;

	            // store path for each product 
	            let productPaths = [];

	            // find all product lis on page 
	            const products = $(".products").children();

	            // parse href attr from each product, isolate product id
	            for (let i = 0; i < products.length; i++) {
	            	// get href val for each product
	            	let productHref = $(products[i]).find('a').attr('href');

	            	// add to product paths
	            	productPaths.push(`${uri}/${productHref}`);
	            }

	            // setup crawler queue to visit individual product pages 
	            crawler.queue(productPaths);
	        }
	    }
	});

	
}

module.exports.scrape = scrape;