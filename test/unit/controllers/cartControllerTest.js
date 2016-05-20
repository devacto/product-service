var sinon = require('sinon');

var rewire = require('rewire'),
cartController = rewire('../../../app/controllers/cartController'),
repository = cartController.__get__('cartRepository'),
presenter = cartController.__get__('cartPresenter');

describe('cart controller', function() {
  var body,
  statusCode,
  mockResponse = {
    send: function(_statusCode, _body) {
      statusCode = _statusCode;
      body = _body;
    }
  };

  var asJson = sinon.stub(presenter, 'asJson');
  before(function() {
    asJson.returns('presented cart');
  });

  after(function() {
    asJson.restore();
  });

  describe('when getting all carts', function() {
    var carts = [ 'Cart 1', 'Cart 2' ];
    var all = sinon.stub(repository, 'all');

    after(function() {
      all.restore();
    });

    describe('and there are carts', function() {
      before(function(done) {
        all.yields(carts);
        cartController.list(null, mockResponse, done);
      });

      it('then returns a 200 OK', function() {
        statusCode.should.equal(200);
      });

      it('then returns the carts after being transformed by the presenter', function() {
        body.should.have.property('carts');
        body.carts.should.eql(['presented cart', 'presented cart']);
      });

      it('then returns total number of carts', function() {
        body.should.have.property('length');
        body.length.should.equal(2);
      });
    });

    describe('and there is no cart', function() {
      before(function(done) {
        all.yields([]);
        cartController.list(null, mockResponse, done);
      });

      it('then returns a 200 OK', function() {
        statusCode.should.equal(200);
      });

      it('then returns an empty array', function() {
        body.should.have.property('carts');
        body.carts.should.eql([]);
      });

      it('then the total number of cart is 0', function() {
        body.should.have.property('length');
        body.length.should.eql(0);
      });
    });
  });

  describe('when getting a cart', function() {
    var req = { params: { id: 1 } },
        find = sinon.stub(repository, 'find');

    after(function() {
      find.restore();
    });

    describe('and the cart exists', function() {
      before(function(done) {
        find.withArgs(1).yields('Cart that exists');
        cartController.show(req, mockResponse, done);
      });

      it('then returns a 200 OK', function() {
        statusCode.should.equal(200);
      });

      it('then returns the cart after being transformed by the presenter', function() {
        body.should.have.property('carts');
        body.carts.should.eql(['presented cart']);
      });

      it('then the total number of carts is 1', function() {
        body.should.have.property('length');
        body.length.should.eql(1);
      });
    });

    describe('and it does not exist', function() {
      before(function(done) {
        find.withArgs(1).yields(null);
        cartController.show(req, mockResponse, done);
      });

      it('then returns error saying cart not found', function() {
        body.should.eql({ message:'cart 1 is not found' });
        statusCode.should.equal(404);
      });
    });

  });

});
