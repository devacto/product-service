var Cart = require('../models/cart'),
    cartDataStore = [
      {
        id: 1463699485,
        products: [{
          name: 'Shirt',
          price: 10,
          qty: 5
        },
        {
          name: 'Pants',
          price: 10,
          qty: 2
        }],
        discountCode: 'VALIDCODE'
      },
      {
        id: 1463699484,
        products: [{
          name: 'Dress',
          price: 20,
          qty: 2
        },
        {
          name: 'Skirt',
          price: 30,
          qty: 1
        }],
        discountCode: 'INVALIDCODE'
      }
    ];

    module.exports.find = function(id, done) {
      process.nextTick(function() {
        for(var i = 0; i < cartDataStore.length; i++) {
          if(cartDataStore[i].id === id) {
            done(new Cart(
              {
                id: cartDataStore[i].id,
                products: cartDataStore[i].products,
                discountCode: cartDataStore[i].discountCode
              }));
            return;
          }
        }
        done();
      });
    };

    module.exports.all = function(done) {
      process.nextTick(function() {
        var carts;
        carts = cartDataStore.map(function(dataStoreCart) {
          return new Cart({
            id: dataStoreCart.id,
            products: dataStoreCart.products,
            discountCode: dataStoreCart.discountCode
          });
        });
        done(carts);
      });
    };
