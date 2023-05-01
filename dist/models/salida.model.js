"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalidaModel = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = require("../database/database.config");
class SalidaModel extends sequelize_1.Model {
}
exports.SalidaModel = SalidaModel;
SalidaModel.init({
    idSalida: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    hora: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    fecha: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    precio: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    terminal_salida: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    terminal_destino: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: database_config_1.sequelize,
    tableName: "salida",
});
