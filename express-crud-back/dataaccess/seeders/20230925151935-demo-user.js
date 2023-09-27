'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
      await queryInterface.bulkInsert('Users', [{
        name: 'John Doe',
        age: 10,
        createdAt:new Date(),
        updatedAt:new Date()
      },{
        name: 'Johny poe',
        age: 14,
        createdAt:new Date(),
        updatedAt:new Date()
      }], {});
    
  },
  
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
