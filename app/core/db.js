var mongoose = require('mongoose');
var environment = process.env.ENVIRONMENT || 'dev';
var config = require('../../config/' + environment);

mongoose.connect(config.dbPath);

module.exports.mongoose = mongoose;
