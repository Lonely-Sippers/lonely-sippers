//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const OrderItem = require('./models/OrderItem');
const Review = require('./models/Review');

//magic methods
User.createOrder = async function () {
  const order = await Order.create({
    where: {
      userId: User.id,
    },
  });
  return order;
};

User.cartItem = async function () {
  const order = Order.findOne({
    where: {
      userId: User.id,
    },
  });
  const item = await OrderItem.create({
    where: {
      orderId: order.id,
    },
  });
  return item;
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
