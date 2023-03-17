const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/db');

const seqConnection = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect
});

const todo = require('./todo.model')(seqConnection);

const seqModel = {
  Sequelize: Sequelize,
  seqConnection,
  todo
}

module.exports = seqModel;