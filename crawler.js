'use strict'

const Crawler = require('crawler');
const csv = require('./csv');

function scrape(uri, path = "") {
	let crawler;
	try {
		// create new crawler 
		crawler = new Crawler({
			rateLimit: 1000,
			// This will be called for each crawled page
		    callback : scrapeProductPage
		});
	} catch (err) {
		console.error(`Unable to connect to site ${uri + '/' + path}:\n ${err.message}`);
	}

	// make direct hit on known url 
	crawler.direct({
	    uri: `${uri}/${path}`,
	    skipEventRequest: false, // defaults to true, direct requests won't trigger Evnet:'request'
	    callback: function(err, res) {
	    	if (err) {
		        console.error(`Unable to connect to site ${uri + '/' + path}:\n ${err.message}`);
		    } else {
		    	// setup to use jquery
		        let $ = res.$;

		        // find all product lis on page 
		        const products = $(".products").children();

		        // store individual product page urls 
		        let productUrls = [];

		        // // parse href attr from each product, isolate product id
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
        console.error(`Unable to scrape site ${uri + '/' + path}:\n ${err.message}`);
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