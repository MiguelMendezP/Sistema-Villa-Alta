"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermianlModel = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = require("../database/database.config");
class TermianlModel extends sequelize_1.Model {
}
exports.TermianlModel = TermianlModel;
TermianlModel.init({
    idTerminal: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    ciudad: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    estado: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: database_config_1.sequelize,
    tableName: "terminal",
});
