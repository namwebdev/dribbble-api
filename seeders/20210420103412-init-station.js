"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "stations",
      [
        {
          name: "Bến xe Miền Tây",
          address: "address",
          province: "HCM",
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
