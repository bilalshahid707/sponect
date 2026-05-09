const { sequelize, DataTypes } = require("../../../config/sequelize");
const Pitch = require("./pitch.model");

const Asset = sequelize.define("Asset", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  pitchId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { key: "id", model: Pitch },
  },
  // cover   → pitch cover image (max 1)
  // general → gallery images (max 3)
  // document→ proposal/PDF preview (max 1)
  type: {
    type: DataTypes.ENUM("cover", "general", "document"),
    allowNull: false,
  },
  publicId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  secureUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Pitch.hasMany(Asset, {
  foreignKey: { name: "pitchId", onDelete: "CASCADE", onUpdate: "CASCADE" },
  as: "assets",
});
Asset.belongsTo(Pitch, {
  foreignKey: { name: "pitchId", onDelete: "CASCADE", onUpdate: "CASCADE" },
});

module.exports = Asset;
