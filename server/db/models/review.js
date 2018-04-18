const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
    rating: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      }
    },
    name: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  })
  
  module.exports = Review
  