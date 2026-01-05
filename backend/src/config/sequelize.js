const {Sequelize,DataTypes} = require("sequelize")

const sequelize = new Sequelize({
    dialect:'postgres',
    username:process.env.DB_USER,
    password:process.env.DB_PASS,
    host:process.env.DB_HOST,
    port:5432,
    database:process.env.DB_NAME,
    retry:{max:3}
})

module.exports = {sequelize,DataTypes}