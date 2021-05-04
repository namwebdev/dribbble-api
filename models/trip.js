"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Trip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Station }) {
      this.belongsTo(Station, { foreignKey: "from_station", as: "from" });
      this.belongsTo(Station, { foreignKey: "to_station", as: "to" });
    }
  }
  Trip.init(
    {
      start_time: DataTypes.DATE,
      price: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Trip",
    }
  );
  return Trip;
};
