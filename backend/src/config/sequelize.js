const {Sequelize,DataTypes} = require("sequelize")

const sequelize = process.env.DATABASE_URL
    ? new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
        retry: { max: 3 }
    })
    : new Sequelize({
        dialect: 'postgres',
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        host: process.env.DB_HOST,
        port: 5432,
        database: process.env.DB_NAME,
        retry: { max: 3 }
    })

module.exports = {sequelize,DataTypes}