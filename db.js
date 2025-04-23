// db.js
const { Sequelize } = require('sequelize');

// Подключение к базе данных PostgreSQL
const sequelizeInstance = new Sequelize({
    dialect: "postgres",
    port: 5432,
    database: "Курсовая Прокофьев А.",
    username: "postgres",
    password: "4x24oqwpH",
});

// Функция для инициализации базы данных
const initDB = async () => {
    try {
        await sequelizeInstance.authenticate(); // Проверка подключения
        console.log("Подключение к базе данных успешно установлено.");
    } catch (error) {
        console.error("Ошибка при подключении к базе данных:", error);
        process.exit(1); // Завершаем процесс с ошибкой
    }
};

module.exports = { sequelizeInstance, initDB };