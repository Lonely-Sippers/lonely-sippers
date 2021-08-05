const Sequelize = require('sequelize');
const { STRING, DECIMAL, ENUM, INTEGER } = Sequelize;
const db = require('../db');

const Product = db.define('product', {
  category: {
    type: STRING,
    allowNull: false,
  },
  alcohol_type: {
    type: STRING,
    allowNull: false,
  },
  alcohol_percentage: {
    type: INTEGER,
    allowNull: false,
  },
  region: {
    type: STRING,
    allowNull: false,
  },

  price: {
    type: DECIMAL(10, 2),
  },

  year: {
    type: INTEGER,
  },
});

module.exports = Product;
