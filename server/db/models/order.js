const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  purchaseDate: {
    type: Sequelize.VIRTUAL,
    get() {
      const date = new Date();
      // example return 4/17/2018, 9:29:46 AM
      return date.toLocaleString('en-US');
    },
  },
});

module.exports = Order;

/* Specs
has many order line items,
belongs to user,
belongs to address,
date purchased (virtual)
*/
