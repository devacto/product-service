var routeHelper = require('../core/routeHelper');

module.exports.asJson = function(cart) {
  return {
    cart: cart,
    links: [{
        self: routeHelper.getPath('cart', { name: cart.id })
    }]
  };
};
