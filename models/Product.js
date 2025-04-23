// models/Product.js
const { DataTypes } = require('sequelize');
const { sequelizeInstance } = require('../db'); // Используем экземпляр Sequelize из db.js

const Product = sequelizeInstance.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'products',
    timestamps: true,
});

module.exports = Product;