const { Model, DataTypes } = require('sequelize');

class Service extends Model {
  static init(sequelize) {
    super.init(
      {
        budget_id: DataTypes.INTEGER,
        description: DataTypes.STRING,
        price: DataTypes.STRING
      },
      { sequelize }
    );
  }
}

module.exports = Service;
