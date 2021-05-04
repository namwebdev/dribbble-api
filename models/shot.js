"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Shot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Category }) {
      this.belongsTo(Category, { foreignKey: "category_id" });
    }
  }
  Shot.init(
    {
      title: DataTypes.STRING,
      image: DataTypes.STRING,
      link: DataTypes.STRING,
      author_name: DataTypes.STRING,
      author_avatar: DataTypes.STRING,
      author_link: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Shot",
    }
  );
  return Shot;
};
