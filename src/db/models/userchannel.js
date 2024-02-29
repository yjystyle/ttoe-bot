const DataTypes = require("sequelize");

module.exports = {
  table: "user_channel",
  fields: {
    date: {
      type: DataTypes.DATEONLY,
      primaryKey: true,
      allowNull: false
    },
    userId: {type: DataTypes.STRING, primaryKey: true},
    channelId: {type: DataTypes.STRING, primaryKey: true},
    status:{type: DataTypes.SMALLINT, allowNull: false, defaultValue: 2} // 0: 가능, 1:불가능, 2:미정
  },
};