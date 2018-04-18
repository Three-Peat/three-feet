/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../index')
const Cart = db.model('cart')

describe('Cart model', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  let cart;
  beforeEach(() => {
    return Cart.create()
      .then(entry => {
        cart = entry
      })
  })

  it('has no attributes of its own', function () {

      return cart.save()
        .then(function (savedCart) {
          expect(Object.keys(savedCart.dataValues)).to.eql(['id', 'updatedAt', 'createdAt']);
        });

    });

})
