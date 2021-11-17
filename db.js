require("dotenv").config();
const { Sequelize } = require("sequelize");

// const db = new Sequelize(process.env.DATABASE_URL, {
//   dialect: "postgres",
//   ssl: {
//     dialectOptions: {
//       require: true,
//       rejectUnauthorized: false,
//     },
//   },
// });

const db = new Sequelize("postgres://postgres:weewoo123@localhost:5432/palm")

module.exports = db;