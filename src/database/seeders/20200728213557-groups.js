'use strict';
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [];
    const amountToSeed = 5;
    let count = 0;

    while (count < amountToSeed) {
      data.push({
        name: faker.name.firstName(),
        user_id: count + 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      count++;
    }

    return queryInterface.bulkInsert('groups', data);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('groups', null, {});
  },
};
