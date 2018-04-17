const User = require('./user');
const Product = require('./product');
const Address = require('./address');
const Cart = require('./cart');
const Category = require('./category');
const Order = require('./order');
const Review = require('./review');
const OrderItem = require('./order-item');

/*---------------- ASSOCIATIONS ----------------*/

// USER ASSOCIATIONS
User.hasMany(Address);
User.hasMany(Order);
User.hasOne(Cart);

// ADDRESS ASSOCIATIONS
Address.belongsTo(User);
Address.belongsTo(Order);

// ORDER ITEM ASSOCIATIONS
OrderItem.belongsTo(Product);
OrderItem.belongsTo(Order);

// ORDER ASSOCIATIONS
Order.belongsTo(User);
Order.hasMany(OrderItem);
Order.hasOne(Address);

// CART ASSOCIATIONS
Cart.hasMany(Product);
Cart.belongsTo(User);

// PRODUCT ASSOCIATIONS
Product.hasMany(Category);

// REVIEW ASSOCIATIONS
Review.hasOne(Product);
Review.hasOne(User);

module.exports = {
  User,
  Product,
  Address,
  Cart,
  Category,
  Order,
  Review,
  OrderItem,
};
