import Sequelize from "sequelize";
import config from "./g.config";

export const sequelize = new Sequelize(
  config.database,
  config.user,
  config.password,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

module.exports = {
  sequelize,
};
