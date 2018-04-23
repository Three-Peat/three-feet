const User = require('./user');
const Product = require('./product');
const Address = require('./address');
const Cart = require('./cart');
const Category = require('./category');
const Order = require('./order');
const Review = require('./review');
const OrderItem = require('./order-item');
const ProductCart = require('./product-cart');
const db = require('../db')

/*---------------- ASSOCIATIONS ----------------*/

// USER ASSOCIATIONS
User.hasMany(Address);
User.hasMany(Order);
User.hasOne(Cart);
User.hasMany(Review);

// ADDRESS ASSOCIATIONS
Address.belongsTo(User);

// ORDER ITEM ASSOCIATIONS
OrderItem.belongsTo(Product);
OrderItem.belongsTo(Order);

// ORDER ASSOCIATIONS
Order.belongsTo(User);
Order.hasMany(OrderItem);
Order.belongsTo(Address);

// CART ASSOCIATIONS
Cart.belongsTo(User);

// PRODUCT ASSOCIATIONS
Product.belongsToMany(Cart, { through: ProductCart });
Cart.belongsToMany(Product, { through: ProductCart });
Product.belongsToMany(Category, { through: 'productCategory' });
Category.belongsToMany(Product, { through: 'productCategory' });
Product.hasMany(Review);

const productCategory = db.model(`productCategory`)
// const ProductCart = db.model('productCart')


module.exports = {
  User,
  Product,
  Address,
  Cart,
  Category,
  Order,
  Review,
  OrderItem,
  productCategory,
  ProductCart,
};
