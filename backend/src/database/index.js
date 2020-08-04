const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../app/models/User');
const Provider = require('../app/models/Provider');
const Budget = require('../app/models/Budget');
const Service = require('../app/models/Service');
const Customer = require('../app/models/Customer');
const Car = require('../app/models/Car');
const Employee = require('../app/models/Employee');
const Product = require('../app/models/Product');
const Event = require('../app/models/Event');

const connection = new Sequelize(dbConfig);

User.init(connection);
Provider.init(connection);
Budget.init(connection);
Service.init(connection);
Customer.init(connection);
Car.init(connection);
Employee.init(connection);
Product.init(connection);
Event.init(connection);

Budget.associate(connection.models);
Service.associate(connection.models);
Customer.associate(connection.models);
Car.associate(connection.models);

module.exports = connection;
