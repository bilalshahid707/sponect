const { sequelize, DataTypes } = require("../../../config/sequelize");
const Pitch = require("./pitch.model");

const Package = sequelize.define(
  "Package",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    pitchId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        key: "id",
        model: Pitch,
      },
    },

    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    price: {
      type: DataTypes.DECIMAL(16, 2),
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    deliverables: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
  },
  {
    tableName: "packages",
    timestamps: true,
  },
);

Pitch.hasMany(Package, {
  foreignKey: { name: "pitchId", onDelete: "CASCADE", onUpdate: "CASCADE" },
  as: "packages",
});
Package.belongsTo(Pitch, {
  foreignKey: { name: "pitchId", onDelete: "CASCADE", onUpdate: "CASCADE" },
});

module.exports = Package;
