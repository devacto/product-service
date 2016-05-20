var routeHelper = require('../core/routeHelper');

module.exports.asJson = function(cart) {
  return {
    products: cart.products,
    discountCode: cart.discountCode,
    links: [{
        self: routeHelper.getPath('cart', { id: cart.id })
    }]
  };
};
