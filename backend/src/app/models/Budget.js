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
}

module.exports = Budget;
