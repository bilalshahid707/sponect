const { sequelize, DataTypes } = require("../../../config/sequelize");
const Sponsee = require("../../../models/sponsee.model");
const {
  genders,
  ageGroups,
  occupations,
  pitchCategories,
} = require("../../../utils/Constants");
const { isValidArrayValues } = require("../../../utils/Validators");

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
      references: { model: Sponsee, key: "id" },
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
    },

    venue: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    startAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    endAt: {
      type: DataTypes.DATE,
      allowNull: false,
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

    preferences: {
      type: DataTypes.ARRAY(DataTypes.ENUM("cash", "inkind")),
      validate: {
        validator(values) {
          isValidArrayValues(values, ["cash", "inkind"]);
        },
      },
      defaultValue: ["cash"],
    },

    tabNumber: {
      type: DataTypes.ENUM("0", "1", "2", "3", "4"),
      defaultValue: "0",
    },
    
    status: {
      type: DataTypes.ENUM(["draft", "published"]),
      defaultValue: "draft",
    },
  },
  {
    tableName: "pitches",
    timestamps: true,
    hooks: {
      beforeValidate: (pitch) => {
        const stringFields = ["title", "venue", "category", "gender", "ageGroup"];
        for (const field of stringFields) {
          if (typeof pitch[field] === "string") {
            pitch[field] = pitch[field].toLowerCase().trim();
          }
        }

        const arrayFields = ["occupation", "opportunities", "promotionChannels", "preferences"];
        for (const field of arrayFields) {
          if (Array.isArray(pitch[field])) {
            pitch[field] = pitch[field].map((v) =>
              typeof v === "string" ? v.toLowerCase().trim() : v,
            );
          }
        }
      },
    },
  },
);

Sponsee.hasMany(Pitch, {
  foreignKey: { name: "sponseeId", onDelete: "CASCADE", onUpdate: "CASCADE" },
  as: "pitches",
});
Pitch.belongsTo(Sponsee, {
  foreignKey: { name: "sponseeId", onDelete: "CASCADE", onUpdate: "CASCADE" },
  as: "sponsee",
});

module.exports = Pitch;
