'use strict';
const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const data = [];
    const amountToSeed = 5;
    let count = 0;

    while (count < amountToSeed) {
      data.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      count++;
    }

    return queryInterface.bulkInsert('users', data);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
