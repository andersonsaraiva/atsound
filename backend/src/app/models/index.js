'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../../config/database');
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js')
  .forEach(file => {
    /**
     * Choose any one of the below definition for model variable
     */
    // for individual model files having `export default (sequelize, DataTypes) => {`
    const model = require(path.join(__dirname, file)).default(sequelize, Sequelize.DataTypes);
    // for individual model files having `module.exports = (sequelize, DataTypes) => {`
    // const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
