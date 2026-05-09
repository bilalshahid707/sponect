const { sequelize, DataTypes } = require("../config/sequelize");
const Sponsee = require("../models/sponsee.model");
const Sponsor = require("../models/sponsor.model");

const Contact = sequelize.define(
  "Contact",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    sponseeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        key: "id",
        model: Sponsee,
      },
    },

    sponsorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        key: "id",
        model: Sponsor,
      },
    },

    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate:{
        isEmail:{
          msg:"Invalid email"
        }
      }
    },

    phone: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  },
  {
    tableName: "contacts",
    timestamps: false,
  }
);

Sponsee.hasMany(Contact, {
  foreignKey: { name: "sponseeId", onDelete: "CASCADE", onUpdate: "CASCADE" },
  as: "contacts",
});
Contact.belongsTo(Sponsee, {
  foreignKey: { name: "sponseeId", onDelete: "CASCADE", onUpdate: "CASCADE" },
});

Sponsor.hasMany(Contact, {
  foreignKey: { name: "sponsorId", onDelete: "CASCADE", onUpdate: "CASCADE" },
  as: "contacts",
});
Contact.belongsTo(Sponsor, {
  foreignKey: { name: "sponsorId", onDelete: "CASCADE", onUpdate: "CASCADE" },
});
module.exports = Contact;
