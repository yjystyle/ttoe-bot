const DataTypes = require("sequelize");

module.exports = {
  table: "channel",
  fields: {
    channel_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    channel_name: DataTypes.STRING,
    game_name: DataTypes.STRING,
  },
};
