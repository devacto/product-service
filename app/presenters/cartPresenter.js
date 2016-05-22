var routeHelper = require('../core/routeHelper'),
    _ = require('lodash');

module.exports.asJson = function(cart) {
  var total = 0;

  _(cart.products).forEach(function(product) {
    total += product.price * product.qty;
  });

  if(String(cart.discountCode) === 'VALIDCODE') {
    total -= 5;
  }

  return {
    products: cart.products,
    discountCode: cart.discountCode,
    total: total,
    links: [{
        self: routeHelper.getPath('cart', { id: cart.id })
    }]
  };
};
