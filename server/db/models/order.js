const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('Created', 'Processing', 'Cancelled', 'Completed'),
    defaultValue: 'Created',
  },
});

module.exports = Order;

/* Specs
has many order line items,
belongs to user,
belongs to address,
date purchased (virtual) - not needed, we will use createdAt
*/
