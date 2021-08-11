const Sequelize = require("sequelize");
const db = require("../db");
const { INTEGER, BOOLEAN } = Sequelize;

const Order = db.define("order", {
  inProgress: {
    type: BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Order;
