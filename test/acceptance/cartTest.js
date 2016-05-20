var server = require('../../app/core/server'),
    request = require('supertest');

describe('cart operations', function() {
  var productOne = { "name": "Shirt", "price": 10, "qty": 5 };
  var productTwo = { "name": "Pants", "price": 10, "qty": 2 };
  var productThree = { "name": "Dress", "price": 20, "qty": 2 };
  var productFour = { "name": "Skirt", "price": 30, "qty": 1 };

  describe('when getting all carts', function () {
    var expectedBody = {
      "carts": [
        { "products":[productOne, productTwo], "discountCode": "VALIDCODE", "links": [ {"self":"/cart/1"} ] },
        { "products":[productThree, productFour], "discountCode": "INVALIDCODE", "links": [ {"self":"/cart/2"} ] }
      ],
      "length": 2
    };

    it('then returns 200 and all the carts', function(done) {
      request(server)
        .get('/cart')
        .expect(200, expectedBody, done);
    });
  });

  describe('when getting one particular cart', function() {
    var expectedBody = {
      "carts": [
        { "products":[productOne, productTwo], "discountCode": "VALIDCODE", "links": [ {"self":"/cart/1"} ] }
      ],
      "length": 1
    };

    it('then returns 200 and the correct cart', function(done) {
      request(server)
        .get('/cart/1')
        .expect(200, expectedBody, done);
    });
  });

  describe('when getting a non-existent cart', function() {
    var expectedBody = { "message": "cart 3 is not found" };

    it('returns 404 and a not found message', function(done) {
      request(server)
        .get('/cart/3')
        .expect(404, expectedBody, done);
    });
  });
});
