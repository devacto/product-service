module.exports.id = "ADD-CARTS";

module.exports.up = function (done) {
  var coll = this.db.collection('carts');

  var productOne = { "name": "Shirt", "price": 10, "qty": 5 };
  var productTwo = { "name": "Pants", "price": 10, "qty": 2 };
  var productThree = { "name": "Dress", "price": 20, "qty": 2 };
  var productFour = { "name": "Skirt", "price": 30, "qty": 1 };
  var cartOne = { id: 1, products: [productOne, productTwo], discountCode: 'VALIDCODE'};
  var cartTwo = { id: 2, products: [productThree, productFour], discountCode: 'INVALIDCODE'};

  coll.insert(cartOne);
  coll.insert(cartTwo);
  done();
};

module.exports.down = function (done) {
  this.db.carts.drop();
  done();
};
