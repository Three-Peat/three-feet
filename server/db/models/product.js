const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  brand: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  size: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  color: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  photoUrl: {
    type: Sequelize.STRING,
    defaultValue: 'http://icons.iconarchive.com/icons/iconsmind/outline/256/Running-Shoes-icon.png'
  },
})

module.exports = Product
