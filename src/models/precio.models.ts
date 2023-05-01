import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.config";
import PrecioType from "../types/precio.types";

export class PrecioModel extends Model<PrecioType> {}

PrecioModel.init(
    {
        idPrecio: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        destino: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        precioOaxaca: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        precioVilla: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "precio",
    }
);