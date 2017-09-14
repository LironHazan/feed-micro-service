'use strict';

const request = require('request-promise');
const conf = require('../config.json');

exports.fetchAllFeed = (req, res) => {
    const options = {
        uri: conf.pb_api,
        method: 'GET'
    };
    request(options)
        .then( (feeds) => {
            res.send(feeds);
        })
        .catch( (err) => {
            res.send(err);
        });
}

// since the data amount is small and using redis will be an overhead
// I'm not gonna cache it and will call the playbazz content upon each request.
// in real life - for static content it's ok to cache using variable
// for large amount of data I would use redis with a refresh implementation.
// for 'too large' amount should think of a lazy solution (using offsets) or
// redesign of the system/data
exports.filterFeed = (req, res) => {
    const source = req.query.source || null;
    const options = {
        uri: conf.pb_api,
        method: 'GET'
    };
    request(options)
        .then((feed) => {
            const feedObj = JSON.parse(feed)
            const items = req.query.source ? feedObj.items.filter(feed => feed.source === source) : feeds;
            console.log('filtered items' + items);
            res.send(items);
        })
        .catch( (err) => {
            res.send(err);
        });
}
