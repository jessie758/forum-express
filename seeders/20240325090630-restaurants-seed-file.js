'use strict';

const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Restaurants',
      Array.from({ length: 50 }, () => ({
        name: faker.name.findName(),
        tel: faker.phone.phoneNumber(),
        opening_hours: '11:00',
        address: faker.address.streetAddress(),
        image: `https://loremflickr.com/320/240/restaurant,food/?random=${
          Math.random() * 100
        }`,
        description: faker.lorem.text(),
        created_at: new Date(),
        updated_at: new Date(),
      }))
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Restaurants', {});
  },
};