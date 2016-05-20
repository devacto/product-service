var mongoose = require('mongoose');
var mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';

mongoose.connect(mongoUri);

module.exports.mongoose = mongoose;
