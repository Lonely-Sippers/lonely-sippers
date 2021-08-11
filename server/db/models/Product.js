const Sequelize = require('sequelize');
const { STRING, DECIMAL, ENUM, INTEGER, TEXT } = Sequelize;
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
  description: {
    type: TEXT,
  },

  rating: {
    type: INTEGER,
  },

  price: {
    type: DECIMAL(10, 2),
  },

  year: {
    type: INTEGER,
  },
  image_URL: {
    type: STRING,
    defaultValue:
      'https://glassbottlesmanufacturer.com/wp-content/uploads/2017/10/clear-liquor-bottles.jpg',
  },
  count: {
    type: INTEGER,
  },
});

module.exports = Product;
