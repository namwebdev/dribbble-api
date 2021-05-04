"use strict";
const bcrypt = require("bcryptjs");

const passwordDefault = "123456";
const salt = bcrypt.genSaltSync(10);
const hashPassword = bcrypt.hashSync(passwordDefault, salt);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Admin",
          email: "admin@example.com",
          password: hashPassword,
          phone: "0987654321",
          type: "admin",
          createdAt: "2021-03-26 07:06:14",
          updatedAt: "2021-03-26 07:06:14",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
