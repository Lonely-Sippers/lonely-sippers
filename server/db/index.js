//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
const Order = require("./models/Order");
const OrderItem = require("./models/OrderItem");
const Review = require("./models/Review");

//class methods
User.prototype.createCart = function () {
  return Order.create({
    userId: this.id,
    inProgress: true,
  });
};

User.prototype.getCart = async function () {
  let cart = await Order.findOne({
    where: {
      userId: this.id,
      inProgress: true,
    },
  });
  if (!cart) {
    cart = await Order.create({
      userId: this.id,
    });
  }
  return cart;
};

//associations could go here!
User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

Product.hasMany(OrderItem);
OrderItem.belongsTo(Product);

User.hasMany(Review);
Review.belongsTo(User);

Product.hasMany(Review);
Review.belongsTo(Product);

module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
    OrderItem,
  },
};
