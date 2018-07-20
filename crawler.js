'use strict'

const Crawler = require('crawler');
const csv = require('./csv');
const logger = require('./logger').logger;

function scrape(uri, path = "") {
	// create new crawler 
	const crawler = new Crawler({
		rateLimit: 1000,
		// This will be called for each crawled page
	    callback : scrapeProductPage
	});

	// make direct hit on known url 
	crawler.direct({
	    uri: `${uri}/${path}`,
	    skipEventRequest: false, // defaults to true, direct requests won't trigger Event:'request'
	    callback: function(error, response) {
	    	if (error) {
				logger.log(`Unable to connect to site ${this.uri}: ${error.message}`);
		        logger.write(`Unable to connect to site ${this.uri}:\n ${error.message}`);
		    } else {
		    	// setup to use jquery
		        let $ = response.$;

		        // find all product lis on page 
		        const products = $(".products").children();

		        // store individual product page urls 
		        let productUrls = [];

		        // parse href attr from each product, isolate product id
		        for (let i = 0; i < products.length; i++) {
		        	// get href val for each product
		        	let productHref = $(products[i]).find('a').attr('href');

		        	// add to product paths
		        	productUrls.push(`${uri}/${productHref}`);
		        }

		        // setup crawler queue to visit individual product pages 
		        crawler.queue(productUrls);
		    }
	    }
	});
}

function scrapeProductPage(err, res, done) {
	if (err) {
		logger.log(`Unable to scrape site: ${err.message}`);
        logger.write(`Unable to scrape site:\n ${err.message}`);
    } else {
    	// setup to use jquery
        var $ = res.$;
        
        // gather data 
        const data = {
        	title: $('.shirt-details h1').contents().not('span').text().trim(), 
        	price: $('.price').text(),
        	imageurl: `${res.request.uri.host}/${$('.shirt-picture img').attr('src')}`,
        	url: res.request.uri.href
        };

        // build csv
        csv.toCSV(data);
    }

    done();
}

module.exports.scrape = scrape;