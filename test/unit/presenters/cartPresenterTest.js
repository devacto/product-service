var cartPresenter = require('../../../app/presenters/cartPresenter');

describe('CartPresenter', function() {

  describe('when presenting a cart', function() {
    var json;

    before(function() {
      var sampleCart = {
        products: [
          {
            name: 'Dress',
            price: 90,
            qty: 1
          }
        ],
        discountCode: 'VALIDCODE'
      };
      json = cartPresenter.asJson(sampleCart);
    });

    it('then presents the discount code', function(){
      json.should.have.property('discountCode');
    });

    it('then presents the products', function(){
      json.should.have.property('products');
    });

    it('then presents the correct discounted total', function(){
      json.should.have.property('total');
      json.total.should.eql(85);
    });

    it('then presents link to itself', function(){
      json.should.have.property('links');
    });
  });

  describe('when presenting a cart with invalid discount code', function() {
    var json;

    before(function() {
      var sampleCart = {
        products: [
          {
            name: 'Dress',
            price: 90,
            qty: 1
          }
        ],
        discountCode: 'INVALIDCODE'
      };
      json = cartPresenter.asJson(sampleCart);
    });

    it('then presents the discount code', function(){
      json.should.have.property('discountCode');
    });

    it('then presents the products', function(){
      json.should.have.property('products');
    });

    it('then presents the correct non-discounted total', function(){
      json.should.have.property('total');
      json.total.should.eql(90);
    });

    it('then presents link to itself', function(){
      json.should.have.property('links');
    });
  });
});
