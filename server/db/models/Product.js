const Sequelize = require("sequelize");
const { STRING, DECIMAL, ENUM, INTEGER } = Sequelize;
const db = require("../db");

const Product = db.define("product", {
  category: {
    type: STRING,
    allowNull: false,
  },
  alcohol_content: {
    type: DECIMAL(10, 2),
    allowNull: false,
  },
  region: {
    type: STRING,
    allowNull: false,
  },

  price: {
    type: INTEGER,
  },

  year: {
    type: INTEGER,
  },
});

module.exports = Product;
