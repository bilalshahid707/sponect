const { sequelize, DataTypes } = require("../config/sequelize.js"); // your Sequelize instance
const User = require("./user.model.js");

const Sponsee = sequelize.define(
    "Sponsee",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: "id",
            },
        },
        organizationName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        organizationDescription: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        teamSize: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        website: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        socialLinks: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        logo: {
            type: DataTypes.JSON,
            allowNull: true,
        },
    },
    {
        tableName: "sponsees",
        timestamps: true,
        underscored: true,
    }
);

// Association: 1 User → 1 Applicant
User.hasOne(Sponsee, {foreignKey:{name:"userId",onDelete:"CASCADE",onUpdate:"CASCADE"}});

module.exports = Sponsee
