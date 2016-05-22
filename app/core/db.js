var mongoose = require('mongoose'),
    mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';

mongoose.connect(mongoUri, function(err) {
  console.error(JSON.stringify({
    time: new Date().toUTCString(),
    error: err.message,
    state: 'MongoDB connection error.'
  }));
});

module.exports.mongoose = mongoose;
