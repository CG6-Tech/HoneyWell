const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Payment = sequelize.define('Payment', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cardnumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  expirationdate: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cvv: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});

module.exports = Payment;
