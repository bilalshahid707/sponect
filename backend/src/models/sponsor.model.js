const { sequelize, DataTypes } = require("../config/sequelize.js");
const User = require("./user.model.js");
const { occupations, genders, ageGroups } = require("../utils/Constants");
const { isValidArrayValues } = require("../utils/Validators.js");
const AppError = require("../utils/AppError.js");

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
      type: DataTypes.TEXT,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    industry: {
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
    cover: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: {
        url: null,
        publicId: null,
      },
    },
    minBudget: {
      type: DataTypes.DECIMAL(16, 2),
      allowNull: true,
      defaultValue: 1000,

      // Validating only minimum budget, since it will throw error every time minBudget is less than maxBudget
      validate: {
        validator(value) {
          if (value > this.maxBudget) {
            throw new AppError(
              "Minimum budget cannot be greater than maximum budget."
            );
          }
        },
      },
    },
    maxBudget: {
      type: DataTypes.DECIMAL(16, 2),
      allowNull: true,
      defaultValue: 50000,
    },
    cashSponsorship: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    inkindSponsorship: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    shortDuration: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    longDuration: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    oneTimeDuration: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    categories: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    totalSponsorships: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    totalInvestment: {
      type: DataTypes.DECIMAL(16, 2),
      defaultValue: 0,
    },
    gender: {
      type: DataTypes.ENUM(genders),
      defaultValue: "both",
      validate: {
        isIn: {
          args: [genders],
          msg: "Invalid gender",
        },
      },
    },
    ageGroup: {
      type: DataTypes.ENUM(ageGroups),
      allowNull: true,
      validate: {
        isIn: {
          args: [ageGroups],
          msg: "Invalid age group",
        },
      },
    },
    occupation: {
      type: DataTypes.ARRAY(DataTypes.ENUM(occupations)),
      defaultValue: ["other"],
      validate: {
        validator(values) {
          isValidArrayValues(values, occupations);
        },
      },
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },

  {
    tableName: "sponsors",
    timestamps: true,
  }
);

User.hasOne(Sponsor, {
  foreignKey: { name: "userId", onDelete: "CASCADE", onUpdate: "CASCADE" },
  as:'postedBy'
});
Sponsor.belongsTo(User, {
  foreignKey: { name: "userId", onDelete: "CASCADE", onUpdate: "CASCADE" },
  as:'postedBy'
});

module.exports = Sponsor;
