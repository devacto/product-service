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
    state: 'started'
  });
  next();
});

server.on('after', function(req, res) {
  req.log.info({
    time: new Date().getTime(),
    id: req.id(),
    method: req.method,
    path: req.getPath(),
    statusCode: res.statusCode,
    length: res.headers()['content-length'],
    state: 'finished'
  });
});

module.exports = server;

var healthController = require('../controllers/healthController'),
    cartController = require('../controllers/cartController');

server.get('/health', healthController.get);
server.get({ name: 'cart', path: '/cart/:id' }, cartController.show);
server.get({ name: 'carts', path: '/cart' }, cartController.list);
server.put({ name: 'updateCart', path: '/cart/:id' }, cartController.update);
