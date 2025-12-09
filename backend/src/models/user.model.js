const { sequelize, DataTypes } = require('../config/sequelize')
const bcrypt = require("bcryptjs")

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        set(value) {
            this.setDataValue('email', value.toLowerCase())
        },
        validate: {
            isEmail: true
        }
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
            isNumeric: true
        }
    },
    accountType: {
        type: DataTypes.ENUM("sponsee", "sponsor"),
        allowNull: false
    },
    designation: {
        type: DataTypes.STRING,
        allowNull: true,
        set(value) {
            this.setDataValue('designation', value.toLowerCase())
        }
    },
    profileImage: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    passwordChangedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    hooks: {
        async beforeSave(user) {
            if (user.changed('password')) {
                user.password = await bcrypt.hash(user.password, 12)
                user.passwordChangedAt = Date.now()
            }
        }
    },
    tableName: 'users'
})

module.exports = User