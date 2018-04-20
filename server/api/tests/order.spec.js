/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');
const db = require('../../db');
const app = require('../../index');
const Order = db.model('order');
const User = db.model('user');
const Address = db.model('address');
const faker = require('faker');

describe('Order routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('/api/orders/', () => {
    const userId = 2;
    const addressId = 5;

    beforeEach(() => {
      return Promise.all([
        User.create({
          id: userId,
          email: 'zeke@zeke.zeke',
          password: 'zeke',
        }),
        Address.create({
          id: addressId,
          name: faker.name.findName(),
          street: faker.address.streetAddress(),
          city: faker.address.city(),
          state: faker.address.state(),
          zip: faker.address.zipCode(),
        }),
      ]).then(() => {
        return Promise.all([
          Order.create({
            userId: userId,
            addressId: addressId,
          }),
        ]);
      });
    });

    it('GET /api/orders', () => {
      return request(app)
        .get('/api/orders')
        .expect(200)
        .then(res => {
          console.log(res.body);
          expect(res.body).to.be.an('array');
          expect(res.body[0].userId).to.be.equal(userId);
          expect(res.body[0].addressId).to.be.equal(addressId);
        });
    });
  }); // end describe('/api/users')
}); // end describe('User routes')
