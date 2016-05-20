var server = require('../../app/core/server'),
    request = require('supertest');

describe('cart operations', function() {

  describe('when getting all carts', function () {
    var productOne = { "name": "Shirt", "price": 10, "qty": 5 };
    var productTwo = { "name": "Pants", "price": 10, "qty": 2 };
    var productThree = { "name": "Dress", "price": 20, "qty": 2 };
    var productFour = { "name": "Skirt", "price": 30, "qty": 1 };


    var expected_body = {
      "carts": [
        { "products":[productOne, productTwo], "discountCode": "VALIDCODE", "links": [ {"self":"/cart/1"} ] },
        { "products":[productThree, productFour], "discountCode": "INVALIDCODE", "links": [ {"self":"/cart/2"} ] }
      ],
      "length": 2
    };

    it('then returns 200 and all the listings', function(done) {
      request(server)
        .get('/cart')
        .expect(200, expected_body, done);
    });
  });
});
