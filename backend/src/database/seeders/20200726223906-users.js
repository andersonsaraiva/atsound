'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'admin',
          email: 'admin@admin.com',
          role: 'admin',
          password_hash: await bcrypt.hash('1234', 8)
        },
        {
          name: 'user',
          email: 'user@user.com',
          role: 'user',
          password_hash: await bcrypt.hash('1234', 8)
        }
      ],
      {}
    ),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
