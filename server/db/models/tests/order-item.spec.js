/* global describe beforeEach it */

const { expect } = require('chai');
const db = require('../../index');
const OrderItem = db.model('orderItem');

describe('OrderItem model', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  let orderItem;
  beforeEach(() => {
    return OrderItem.create({
      price: 100,
    }).then(entry => {
      orderItem = entry;
    });
  });

  it('includes `price`', function() {
    return orderItem.save().then(function(savedOrderItem) {
      expect(savedOrderItem.price).to.equal(100);
    });
  });
});
