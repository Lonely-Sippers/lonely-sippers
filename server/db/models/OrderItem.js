const Sequelize = require('sequelize');
const db = require('../db');
const { INTEGER } = Sequelize;

const OrderItem = db.define('orderItem', {
  total: {
    type: INTEGER,
  },
});

module.exports = OrderItem;
