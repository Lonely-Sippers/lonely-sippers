const Sequelize = require('sequelize');
const { STRING, DECIMAL, ENUM, INTEGER, TEXT } = Sequelize;
const db = require('../db');

const Review = db.define('review', {
  rating: {
    type: INTEGER,
  },
  writtenReview: {
    type: TEXT,
  },
});

module.exports = Review;
