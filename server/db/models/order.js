const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order');

module.exports = Order;

/* Specs
has many order line items,
belongs to user,
belongs to address,
date purchased (virtual) - not needed, we will use createdAt
*/
