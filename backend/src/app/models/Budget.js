const { Model, DataTypes } = require('sequelize');

class Budget extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        cpf: DataTypes.STRING,
        date: DataTypes.DATE
      },
      { sequelize }
    );
  }

  static associate(models) {
    this.hasMany(models.Service, { foreignKey: 'budget_id', as: 'services' });
  }
}

module.exports = Budget;
