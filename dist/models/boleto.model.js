"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoletoModel = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = require("../database/database.config");
class BoletoModel extends sequelize_1.Model {
}
exports.BoletoModel = BoletoModel;
BoletoModel.init({
    idBoleto: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    idUsuario: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    idSalida: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    noAsiento: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: database_config_1.sequelize,
    tableName: "boleto",
});
