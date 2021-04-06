require("dotenv").config();
const Sequelize = require("sequelize");

module.exports = {
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "123456",
  database: process.env.DB_DATABASE || "demo",
  host: process.env.DB_HOST || "127.0.0.1",
  port: process.env.DB_PORT || "3306",
  dialect: "mysql",
  logging: false,
  define: {
    freezeTableName: true,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  retry: {
    match: [
      Sequelize.ConnectionError,
      Sequelize.ConnectionAcquireTimeoutError,
      Sequelize.ConnectionTimedOutError,
      /Deadlock/i,
    ],
    name: "query",
    backoffBase: 100,
    backoffExponent: 1.1,
    timeout: 60000,
    max: Infinity,
  },
};
