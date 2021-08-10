const Sequelize = require("sequelize");
const db = require("../db");
const { INTEGER, STRING } = Sequelize;

const OrderItem = db.define("order item", {
  name: {
    type: STRING,
  },
  price: {
    type: INTEGER,
  },
});

module.exports = OrderItem;
