const { Sequelize } = require("sequelize");

module.exports = new Sequelize(
    "react_electron",
    "phpmyadmin",
    "blackmesa",
    {
        host: "localhost",
        dialect: "mysql"
    }
);