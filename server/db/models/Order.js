const Sequelize = require("sequelize");
const db = require("../db");
const { INTEGER } = Sequelize;

const Order = db.define("order", {});

module.exports = Order;
