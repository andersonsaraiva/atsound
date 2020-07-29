const moment = require('moment');

const { Model, DataTypes } = require('sequelize');

class Customer extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        cpf: DataTypes.STRING,
        gender: DataTypes.STRING,
        date_of_birth: {
          type: DataTypes.DATE,
          get: function () {
            return moment(this.getDataValue('date_of_birth')).format('DD/MM/YYYY');
          }
        },
        zipcode: DataTypes.STRING,
        street: DataTypes.STRING,
        number: DataTypes.STRING,
        neighborhood: DataTypes.STRING,
        complement: DataTypes.STRING,
        city: DataTypes.STRING,
        state: DataTypes.STRING
      },
      { sequelize }
    );
  }

  static associate(models) {
    this.hasMany(models.Car, { foreignKey: 'customer_id', as: 'cars' });
  }
}

module.exports = Customer;
