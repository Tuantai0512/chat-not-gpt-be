'use strict';
const bcrypt = require('bcrypt');
const saltRounds = 10;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      username:'Tuantai0512',
      password:bcrypt.hashSync('123456', saltRounds),
      firstName: 'Tuan Tai',
      lastName: 'Pham',
      email: 'tuantai@example.com',
      phoneNumber: '0916964202',
      gender: '0',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
