const Sequelize = require('sequelize');
const db = require('../db');

const OrderItem = db.define('orderItem', {
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = OrderItem;
