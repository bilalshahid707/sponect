const { sequelize, DataTypes } = require('../config/sequelize')
const bcrypt = require("bcryptjs")

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail:{
                msg:"Invalid email"
            }
        }
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
            isNumeric: {
                msg:"Invalid phone number"
            }
        }
    },
    role: {
        type: DataTypes.ENUM("sponsee","sponsor"),
        allowNull: false,
        validate:{
            isIn:{
                args:[['sponsor','sponsee']],
                msg:"Invalid user role"
            }
        }
    },
    designation: {
        type: DataTypes.STRING,
        allowNull: true,
        set(value) {
            this.setDataValue('designation', value.toLowerCase())
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    passwordChangedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    avatar: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: {
            url: null,
            publicId: null
        }
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
    tableName: 'users',
    timestamps:true
})

module.exports = User