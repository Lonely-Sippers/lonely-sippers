const Sequelize = require('sequelize');
const db = require('../db');
const { INTEGER } = Sequelize;

const Cart = db.define('cart', {
    productId: {
        type: INTEGER
    },
    itemsTotal: {
        type: INTEGER,
        defaultValue: 0
    },
    priceTotal: {
        type: INTEGER,
        defaultValue: 0
    }
});

module.exports = Cart;