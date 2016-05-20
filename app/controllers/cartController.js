var cartPresenter   = require('../presenters/cartPresenter'),
    cartRepository  = require('../repositories/cartRepository');

var formatResponse = function(carts) {
  return {
    carts: carts.map(cartPresenter.asJson),
    length: carts.length
  };
};

module.exports.list = function(req, res, next) {
  cartRepository.all(function(carts) {
    res.send(200, formatResponse(carts));
    next();
  });
};

module.exports.show = function(req, res, next) {
  var id = req.params.id;
  cartRepository.find(id, function(cart) {
    if(!cart) {
      res.send(404, { message: 'cart ' + id + ' is not found' });
      return next();
    }
    res.send(200, formatResponse([cart]));
    next();
  });
};
