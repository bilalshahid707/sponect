const { sequelize, DataTypes } = require("../config/sequelize.js");
const User = require("./user.model.js");
const { activityTypes, teamSizes } = require("../utils/Constants");
const {isValidArrayValues} = require("../utils/Validators.js")

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
      unique: true,
      references: {
        model: User,
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    tagline: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    founded: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    logo: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: {
        url: null,
        publicId: null,
      },
    },
    totalCollaborations: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    teamSize: {
      type: DataTypes.ENUM(teamSizes),
      validate: {
        isIn:{
          args: [teamSizes],
          msg: "Invalid team size",
        },
      },
      defaultValue: "2-10",
    },
    audienceReach: {
      type: DataTypes.DECIMAL(16, 2),
      allowNull: true,
      defaultValue: 0,
    },
    activityTypes: {
      type: DataTypes.ARRAY(DataTypes.ENUM(activityTypes)),
      validate: {
        validator(values){
          isValidArrayValues(values,activityTypes)
        }
      },
      allowNull: true,
      defaultValue: ["other"],
    },
  },
  {
    tableName: "sponsees",
    timestamps: true,
  }
);

User.hasOne(Sponsee, {
  foreignKey: { name: "userId", onDelete: "CASCADE", onUpdate: "CASCADE" },
});
Sponsee.belongsTo(User, {
  foreignKey: { name: "userId", onDelete: "CASCADE", onUpdate: "CASCADE" },
});
module.exports = Sponsee;
