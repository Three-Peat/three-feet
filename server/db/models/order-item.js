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
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      min: 1,
    },
  },
});

OrderItem.afterCreate('updateInventory', function(item) {
  const quantityPurchased = item.quantity;
  const myId = item.dataValues.productId;
  return Product.findById(myId)
    .then(foundItem => {
      foundItem.decrement('inventory', { by: quantityPurchased });
    })
    .catch(err => console.error(err));
});

module.exports = OrderItem;
