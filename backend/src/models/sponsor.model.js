const  {sequelize,DataTypes} = require( "../config/sequelize.js");
const  User = require( "./user.model.js");

const Sponsor = sequelize.define(
  "Sponsor",
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
    industry: {
      type: DataTypes.STRING,
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
    budgetRange: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    preferences: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    logo: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },
  },
  {
    tableName: "sponsors",
    timestamps: true,
    underscored: true,
  }
);

// Association: 1 User → 1 Sponsor
User.hasOne(Sponsor,{foreignKey:{name:"userId",onDelete:"CASCADE",onUpdate:"CASCADE"}});


module.exports = Sponsor;
