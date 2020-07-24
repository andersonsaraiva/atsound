const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        username: DataTypes.STRING,
        role: DataTypes.STRING,
        password: DataTypes.VIRTUAL,
        password_reset_token: DataTypes.STRING,
        password_reset_expires: DataTypes.DATE,
        password_hash: DataTypes.STRING
      },
      {
        sequelize,
        hooks: {
          beforeSave: async user => {
            if (user.password) {
              user.password_hash = await bcrypt.hash(user.password, 8);
            }
          }
        }
      }
    );
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }

  generateToken = function () {
    return jwt.sign({ id: this.id, name: this.name, username: this.username, role: this.role }, '@atsound');
  };
}

module.exports = User;
