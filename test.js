const { Sequelize, DataTypes, Model} = require('sequelize');
const app = require('./connect.js');
  const sequelizeInstance = new Sequelize({
  dialect: "postgres",
  //   host: "21.23.35.4" / "localhost",
  port: 5432,
  database: "Передача прогноза погоды",
  username: "postgres",
  password: "4x24oqwpH",
});

 const initDB = async () => {
    try {
      await sequelizeInstance.authenticate(); 
      await sequelizeInstance.sync();
      console.log("Sequelize was initialized");
    } catch (error) {
      console.log("Sequelize ERROR (initDB)", error);
      process.exit();
    }
  };

module.exports = {initDB, sequelizeInstance} 