const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cards = sequelize.define('Cards', {
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
});

module.exports = Cards;
