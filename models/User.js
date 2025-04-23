// models/User.js
const { DataTypes } = require('sequelize');
const { sequelizeInstance } = require('../db'); // Используем экземпляр Sequelize из db.js

const User = sequelizeInstance.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'users',
    timestamps: true,
});

module.exports = User;