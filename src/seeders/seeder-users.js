'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      email: 'nam@gmail.com',
      password: '123456',
      firstName: 'nam',
      lastName: 'nguyen',
      address: 'VN',
      gender: 'M',
      typeRole: 'ROLE',
      keyRole: 'R1',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

   down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
