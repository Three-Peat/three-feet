const Sequelize = require('sequelize');
const db = require('../db');
const Product = require('./product');

const OrderItem = db.define('orderItem', {
  productId: {
    type: Sequelize.INTEGER,
  },
  orderId: {
    type: Sequelize.INTEGER,
  },
  price: {
    type: Sequelize.INTEGER,
  },
});

OrderItem.afterCreate('updateInventory', function(item) {
  const myId = item.dataValues.productId;
  return Product.findById(myId)
    .then(foundItem => {
      foundItem.decrement('inventory');
    })
    .catch(err => console.error(err));
});

module.exports = OrderItem;
