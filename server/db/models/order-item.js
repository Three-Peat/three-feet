const Sequelize = require('sequelize');
const db = require('../db');

const OrderItem = db.define('orderItem', {
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
});

module.exports = OrderItem;
