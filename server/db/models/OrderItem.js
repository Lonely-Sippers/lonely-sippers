const Sequelize = require("sequelize");
const db = require("../db");
const { INTEGER } = Sequelize;

const OrderItem = db.define("order item", {
  total: {
    type: INTEGER,
  },
});

module.exports = OrderItem;
