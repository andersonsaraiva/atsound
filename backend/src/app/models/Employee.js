const { Model, DataTypes } = require('sequelize');

class Employee extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        date_of_birth: DataTypes.DATE,
        gender: DataTypes.STRING,
        nationality: DataTypes.STRING,
        marital_status: DataTypes.STRING,
        schooling: DataTypes.STRING,
        cpf: DataTypes.STRING,
        rg: DataTypes.STRING,
        cnh: DataTypes.STRING,
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
}

module.exports = Employee;
