const { Model, DataTypes } = require('sequelize');

class Car extends Model {
  static init(sequelize) {
    super.init(
      {
        model: DataTypes.STRING,
        color: DataTypes.STRING,
        year: DataTypes.STRING,
        license_plate: DataTypes.STRING
      },
      { sequelize }
    );
  }

  static associate(models) {
    this.belongsTo(models.Customer, { foreignKey: 'customer_id', as: 'customer' });
  }
}

module.exports = Car;
