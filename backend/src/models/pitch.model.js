const { sequelize, DataTypes } = require("../config/sequelize");
const Sponsee = require("./sponsee.model");
const {
  genders,
  ageGroups,
  occupations,
  pitchCategories,
} = require("../utils/Constants");
const { isValidArrayValues } = require("../utils/Validators");

const Pitch = sequelize.define(
  "Pitch",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    sponseeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    expectedAudience: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    venue: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    startAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    endAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    category: {
      type: DataTypes.ENUM(pitchCategories),
      validate: {
        isIn: {
          args: [pitchCategories],
          msg: "Invalid Category",
        },
      },
      defaultValue: "event",
    },

    coverPhoto: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    gender: {
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [genders],
          msg: "Invalid gender. Must be one of: male, female, both",
        },
      },
      defaultValue: "both",
    },

    ageGroup: {
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [ageGroups],
          msg: "Invalid age group. Must be one of: 13-17, 18-24, 25-34, 35-44, 45-54, 55-64, 65+",
        },
      },
      allowNull: true,
    },

    occupation: {
      type: DataTypes.ARRAY(DataTypes.ENUM(occupations)),
      validate: {
        validator(values) {
          isValidArrayValues(values, occupations);
        },
      },
      defaultValue: ["other"],
    },

    opportunities: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },

    promotionChannels: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },

    previousSponsors: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },

    currentSponsors: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },

    proposalDoc: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    media: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },

    preferences: {
      type: DataTypes.ARRAY(DataTypes.ENUM("cash", "inkind")),
      validate:{
        isIn:{
          args:[['cash','inkind']],
          msg:"Invalid preference"
        }
      }
    },
  },
  {
    tableName: "pitches",
    timestamps: true,
  }
);

Sponsee.hasMany(Pitch, {
  foreignKey: { name: "sponseeId", onDelete: "CASCADE", onUpdate: "CASCADE" },
  as: "pitches",
});
Pitch.belongsTo(Sponsee, {
  foreignKey: { name: "sponseeId", onDelete: "CASCADE", onUpdate: "CASCADE" },
});

module.exports = Pitch;
