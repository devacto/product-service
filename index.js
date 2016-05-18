var server = require('./app/core/server'),
    uncaughtProcessExceptionHandler = require('./app/core/uncaughtProcessExceptionHandler');

process.on('uncaughtException', uncaughtProcessExceptionHandler);

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

server.listen(port, function() {
  console.log('%s listening at %s\n', server.name, server.url);
});
