'use strict';
const bcrypt = require('bcrypt');
const saltRounds = 10;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      username:'Tienoccho0000',
      password:bcrypt.hashSync('654321', saltRounds),
      firstName: 'Tien',
      lastName: 'Ho',
      email: 'hotien@example.com',
      phoneNumber: '0123456789',
      gender: '0',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
