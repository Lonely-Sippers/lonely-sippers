const Sequelize = require('sequelize');
const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// const axios = require('axios');
const { STRING, INTEGER, UUID, UUIDV4 } = Sequelize;

const SALT_ROUNDS = 5;

const User = db.define('user', {
  id: {
    type: UUID,
    primaryKey: true, 
    defaultValue: UUIDV4
  },
  username: {
    type: STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false
  },
  cartId: {
    type: INTEGER,
  },
  //some of the fields below probably should have an allowNull:false
  //   but I'm leaving it off for the time being so everything builds without modifying the seed file
  email: {
    type: STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  firstName: {
    type: STRING,
  },
  lastName: {
    type: STRING,
  },
  orderId: {
    //needs Order model
    type: INTEGER,
  },
});

module.exports = User;

// //allowNull on just id vs other attributes too, another way to determine users with account vs without?
// //Role or Access model -- diff. between user vs admin

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  //we need to compare the plain version to an encrypted version of the password
  return bcrypt.compare(candidatePwd, this.password);
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT);
};

/**
 * classMethods
 */
User.authenticate = async function ({ username, password }) {
  const user = await this.findOne({ where: { username } });
  if (!user || !(await user.correctPassword(password))) {
    const error = Error('Incorrect username/password');
    error.status = 401;
    throw error;
  }
  return user.generateToken();
};

// User.findByToken = async function (token) {
//   try {
//     const { id } = await jwt.verify(token, process.env.JWT);
//     const user = User.findByPk(id);
//     if (!user) {
//       throw 'nooo';
//     }
//     return user;
//   } catch (ex) {
//     const error = Error('bad token');
//     error.status = 401;
//     throw error;
//   }
// };

/**
 * hooks
 */
const hashPassword = async (user) => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
};

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));
