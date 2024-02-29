const DataTypes = require("sequelize");

module.exports = {
  table: "user",
  fields: {
    user_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    // unique: true,
    name: DataTypes.STRING,
    //   unique: true,
    globalName: DataTypes.STRING,
    bot: DataTypes.BOOLEAN
  },
};
