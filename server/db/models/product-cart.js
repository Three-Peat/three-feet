const Sequelize = require('sequelize')
const db = require('../db')

const ProductCart = db.define('productCart', {
    quantity: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
    },
  })

  module.exports = ProductCart
