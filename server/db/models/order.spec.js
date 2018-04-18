/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../index')
const Order = db.model('order')

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  let order;
  beforeEach(() => {
    return Order.create()
      .then(entry => {
        order = entry
      })
  })

  it('includes `userId`', function () {

      return order.save()
        .then(function (savedOrder) {
          expect(savedOrder.userId).to.equal(null);
        });

    });

})
