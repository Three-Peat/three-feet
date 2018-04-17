const Sequelize = require('sequelize');
const db = require('../db');

const Address = db.define('address', {
  street: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  zip: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Address;
