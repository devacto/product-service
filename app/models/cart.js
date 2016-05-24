var mongoose = require('../core/db').mongoose,
    cartSchema = {
      id: { type: Number, required: true },
      products: [{
        name: 'string',
        price: 'number',
        qty: 'number'
      }],
      discountCode: String
    };

module.exports = mongoose.model('carts', mongoose.Schema(cartSchema));
