const { Model, DataTypes } = require('sequelize');

class Event extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        start: DataTypes.DATE,
        end: DataTypes.DATE,
        color: DataTypes.STRING,
        description: DataTypes.STRING,
        timed: DataTypes.BOOLEAN
      },
      { sequelize }
    );
  }
}

module.exports = Event;
