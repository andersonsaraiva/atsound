const { Model, DataTypes } = require('sequelize');

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        provider_id: DataTypes.INTEGER,
        name: DataTypes.STRING,
        brand: DataTypes.STRING,
        description: DataTypes.STRING,
        quantity: DataTypes.INTEGER,
        purchase_date: DataTypes.DATE,
        purchase_value: DataTypes.FLOAT,
        stock_value: DataTypes.FLOAT
      },
      { sequelize }
    );
  }
}

module.exports = Product;
