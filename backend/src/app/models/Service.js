const { Model, DataTypes } = require('sequelize');

class Service extends Model {
  static init(sequelize) {
    super.init(
      {
        description: DataTypes.STRING,
        price: DataTypes.FLOAT
      },
      { sequelize }
    );
  }

  static associate(models) {
    this.belongsTo(models.Budget, { foreignKey: 'budget_id', as: 'budget' });
  }
}

module.exports = Service;
