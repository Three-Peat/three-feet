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
User.hasMandy(Review);
User.hasMany(Order);

// ADDRESS ASSOCIATIONS
Address.belongsTo(User);

// ORDER ITEM ASSOCIATIONS
OrderItem.hasOne(Product);
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
Product.hasMany(Review);

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
