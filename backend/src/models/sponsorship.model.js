const { sequelize, DataTypes } = require("../config/sequelize.js"); // your Sequelize instance
const Sponsor = require("./sponsor.model.js");

const Sponsorship = sequelize.define(
    "Sponsorship",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        sponsorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Sponsor,
                key: "id",
            }
        },
        title:{
            type:DataTypes.STRING,
            allowNull:false
        },
        description:{
            type:DataTypes.STRING,
            allowNull:true
        },
        amountSponsored:{
            type:DataTypes.DECIMAL(16,2),
            allowNull:false
        },
        thumbnailURL:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                isURL:{
                    msg:"invalid link"
                }
            }
        },
        thumbnailPublicID:{
            type:DataTypes.STRING,
            allowNull:false
        },
        status:{
            type:DataTypes.ENUM("active","inactive"),
            allowNull:false,
            validate:{
                isIn:{
                    args:[['active','inactive']],
                    msg:"Invalid status type"
                }
            }
        }
    },
    {
        tableName: "sponsorships",
        timestamps: true,
    }
);


Sponsor.hasMany(Sponsorship, {foreignKey:{name:"sponsorId",onDelete:"CASCADE",onUpdate:"CASCADE"},as:'sponsorships'});
Sponsorship.belongsTo(Sponsor,{foreignKey:{name:"sponsorId",onDelete:"CASCADE",onUpdate:"CASCADE"}});

module.exports = Sponsorship
