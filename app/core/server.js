var restify = require('restify'),
    log = require('./logger'),
    uncaughtServerExceptionHandler = require('./uncaughtServerExceptionHandler');

var server = restify.createServer({
  name: 'CartAPI',
  log: log
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.authorizationParser());
server.use(restify.dateParser());
server.use(restify.queryParser());
server.use(restify.jsonp());
server.use(restify.gzipResponse());
server.use(restify.bodyParser());
server.on('uncaughtException', uncaughtServerExceptionHandler);

server.pre(function(req, res, next) {
  req.log.info({
    time: new Date().getTime(),
    id: req.id(),
    method: req.method,
    path: req.path(),
    state: "started"
  });
  next();
});

server.on('after', function(req, res, route) {
  req.log.info({
    time: new Date().getTime(),
    id: req.id(),
    method: route.spec.method,
    path: route.spec.path,
    statusCode: res.statusCode,
    length: res.headers()['content-length'],
    state: "finished"
  });
});

module.exports = server;

var healthController = require('../controllers/healthController');

server.get('/health', healthController.get);
