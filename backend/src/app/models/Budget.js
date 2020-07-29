const moment = require('moment');

const { Model, DataTypes } = require('sequelize');

class Budget extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        cpf: DataTypes.STRING,
        date: {
          type: DataTypes.DATE,
          get: function () {
            return moment(this.getDataValue('date')).format('DD/MM/YYYY');
          }
        },
        total: DataTypes.VIRTUAL
      },
      { sequelize }
    );
  }

  static associate(models) {
    this.hasMany(models.Service, { foreignKey: 'budget_id', as: 'services' });
  }
}

module.exports = Budget;
