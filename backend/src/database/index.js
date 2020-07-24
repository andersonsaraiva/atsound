const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../app/models/User');
const Provider = require('../app/models/Provider');

const connection = new Sequelize(dbConfig);

User.init(connection);
Provider.init(connection);

module.exports = connection;
