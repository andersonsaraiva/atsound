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
        date_of_birth: DataTypes.DATE,
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
