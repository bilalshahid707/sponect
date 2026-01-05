const { sequelize, DataTypes } = require("../config/sequelize.js");
const Sponsee = require("./sponsee.model.js");
const Sponsor = require("./sponsor.model.js");
const { socials } = require("../utils/Constants.js");

const Social = sequelize.define(
  "Social",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    sponseeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Sponsee,
        key: "id",
      },
    },
    sponsorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Sponsor,
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [socials],
          msg: "Invalid social name",
        },
      },
    },
    URL: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: {
          msg: "invalid link",
        },
      },
    },
    followerCount: {
      type: DataTypes.DECIMAL(16, 2),
      allowNull: true,
      defaultValue: 0,
    },
  },
  {
    hooks: {
      async beforeSave(social) {
        if (!social.sponseeId && !social.sponsorId) {
          throw new Error(
            "Social link must be associated with sponsor or sponsee"
          );
        }
      },
    },
    tableName: "socials",
    timestamps: true,
  }
);

Sponsee.hasMany(Social, {
  foreignKey: { name: "sponseeId", onDelete: "CASCADE", onUpdate: "CASCADE" },
  as: "socials",
});
Social.belongsTo(Sponsee, {
  foreignKey: { name: "sponseeId", onDelete: "CASCADE", onUpdate: "CASCADE" },
});

Sponsor.hasMany(Social, {
  foreignKey: { name: "sponsorId", onDelete: "CASCADE", onUpdate: "CASCADE" },
  as: "socials",
});
Social.belongsTo(Sponsor, {
  foreignKey: { name: "sponsorId", onDelete: "CASCADE", onUpdate: "CASCADE" },
});

module.exports = Social;
