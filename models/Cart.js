// models/Cart.js
const { DataTypes } = require('sequelize');
const { sequelizeInstance } = require('../db'); // Используем экземпляр Sequelize из db.js
const User = require('./User');
const Product = require('./Product');

const Cart = sequelizeInstance.define('Cart', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
}, {
    tableName: 'cart',
    timestamps: true,
});

// Связь между пользователями, корзиной и товарами
User.hasMany(Cart);
Cart.belongsTo(User);
Product.hasMany(Cart);
Cart.belongsTo(Product);

module.exports = Cart;