const Sequelize = require("sequelize");
const db = require("../db");
const { INTEGER, BOOLEAN } = Sequelize;

const Order = db.define("order", {
  inProgress: {
    type: BOOLEAN,
  },
  itemsTotal: {
    type: INTEGER,
    defaultValue: 0,
  },
  priceTotal: {
    type: INTEGER,
    defaultValue: 0,
  },
});

module.exports = Order;
