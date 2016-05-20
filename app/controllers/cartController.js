var _ = require('lodash'),
    cartPresenter = require('../presenters/cartPresenter'),
    cartRepository = require('../repositories/cartRepository');

var formatResponse = function(carts) {
  return {
    carts: carts.map(cartPresenter.asJson),
    length: carts.length
  };
};

module.exports.update = function(req, res, next) {
  var requestId = req.params.id;
  cartRepository.findOne({ id: requestId }, function(err, cart) {
    if(!cart) {
      res.send(404, { message: 'cart ' + requestId + ' is not found' });
      return next();
    }

    if(req.body.products) { cart.products = req.body.products; }
    if(req.body.discountCode) { cart.discountCode = req.body.discountCode; }

    cart.products = req.body.products;
    cart.discountCode = req.body.discountCode;
    cart.save(function() {
      res.send(200, formatResponse([cart]));
      next();
    });
  });
};

module.exports.list = function(req, res, next) {
  cartRepository.find({}, function(err, result) {
    var carts = _.filter(result, function(cart) {
      return cart.id > 0;
    });
    res.send(200, formatResponse(carts));
    next();
  });
};

module.exports.show = function(req, res, next) {
  var requestId = req.params.id;
  cartRepository.findOne({ id: requestId }, function(err, cart) {
    if(!cart) {
      res.send(404, { message: 'cart ' + requestId + ' is not found' });
      return next();
    }
    res.send(200, formatResponse([cart]));
    next();
  });
};
