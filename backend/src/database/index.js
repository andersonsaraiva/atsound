const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../app/models/User');
const Provider = require('../app/models/Provider');
const Budget = require('../app/models/Budget');
const Service = require('../app/models/Service');

const connection = new Sequelize(dbConfig);

User.init(connection);
Provider.init(connection);
Budget.init(connection);
Service.init(connection);

Service.associate(connection.models);

module.exports = connection;
