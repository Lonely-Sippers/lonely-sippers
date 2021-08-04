const Sequelize = require('sequelize');
const { STRING, INTEGER, UUIDV4, DATE } = Sequelize;
const db = require('../db');


const User = db.define('user', {
  id: {
      type: INTEGER,
      allowNull: false
  },
  cartId: {
      type: UUIDV4
  },
  username: {
      type: STRING,
      unique: true
  },
  password: {
      type: STRING
  },
  email: {
      type: STRING,
      unique: true,
      validate: {
          isEmail: true
      }
  },
  firstName: {
      type: STRING
  },
  lastName: {
      type: STRING
  },
  createdAt: {
      type: DATE,
      validate: {
          isDate: true
      }
  }, 
  orderId: {
    //needs Order model
    type: UUIDV4
  }

});

module.exports = User;
//allowNull on just id vs other attributes too, another way to determine users with account vs without?
//Role or Access model -- diff. between user vs admin
