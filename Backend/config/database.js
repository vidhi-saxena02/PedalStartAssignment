const { Sequelize } = require("sequelize");
const pg = require("pg");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: pg,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = sequelize;
