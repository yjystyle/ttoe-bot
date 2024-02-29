const Sequelize = require("sequelize");

const connection = new Sequelize("database", "user", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  // SQLite only
  storage: "database.sqlite",
});
const models = require("./models");
// console.log(models);
const model = {};
for (const name in models) { 
  models[name] = connection.define(models[name].table, models[name].fields);
}

connection.sync();
models['User'].belongsToMany(models['Channel'], { through: models['UserChannel'], foreignKey: 'userId' });
models['Channel'].belongsToMany(models['User'], { through: models['UserChannel'], foreignKey: 'channelId' });

models['UserChannel'].belongsTo(models['User'], { foreignKey: 'userId' });
models['UserChannel'].belongsTo(models['Channel'], { foreignKey: 'channelId' });

module.exports = {
  connection,
  models,
};
