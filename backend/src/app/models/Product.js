const moment = require('moment');

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
        purchase_date: {
          type: DataTypes.DATE,
          get: function () {
            return moment(this.getDataValue('purchase_date')).format('DD/MM/YYYY');
          }
        },
        purchase_value: DataTypes.FLOAT,
        stock_value: DataTypes.FLOAT
      },
      { sequelize }
    );
  }
}

module.exports = Product;
