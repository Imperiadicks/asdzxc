const { Sequelize, DataTypes, Model} = require('sequelize');
const {sequelizeInstance} = require('./test.js')
const Weather = sequelizeInstance.define(
    'Weather',
    {
      temperature: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      TypeWeather: {
        type: DataTypes.STRING,
      },
    },
    {
      tablename: "Weather"
    },
    );

    module.exports = {Weather}
    const City = sequelizeInstance.define(
      'Weather',
      {
        Rayon: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        temperature: {
          type: DataTypes.STRING,
        },
      },
      {
        tablename: "City"
      },
      );
  