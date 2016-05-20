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
  });

});
