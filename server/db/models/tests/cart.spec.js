/* global describe beforeEach it */

const { expect } = require('chai');
const db = require('../../index');
const Cart = db.model('cart');

describe('Cart model', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  let cart;
  beforeEach(() => {
    return Cart.create().then(entry => {
      cart = entry;
    });
  });

  it('includes `userId`', function() {
    return cart.save().then(function(savedCart) {
      expect(Object.keys(savedCart.dataValues)).to.eql([
        'purchased',
        'id',
        'updatedAt',
        'createdAt',
        `userId`,
      ]);
    });
  });
});
