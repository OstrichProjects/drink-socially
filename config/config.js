'use strict';

// Utilize Lo-Dash utility library
var _ = require('lodash');

// Extend the base configuration in all.js with environment
// specific configuration
module.exports = _.extend(
    require(__dirname + '/../config/env/all.js'),
    require(__dirname + '/../config/env/' + process.env.NODE_ENV + '.js') || {}
);

var facebook = {
	clientId: '250982388421083',
	clientSecret: '212f6a5faa67601025e311d7bcec4753',
	callbackURL: 'auth/facebook/callback'
}