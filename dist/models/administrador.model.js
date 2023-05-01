"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdministradorModel = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = require("../database/database.config");
class AdministradorModel extends sequelize_1.Model {
}
exports.AdministradorModel = AdministradorModel;
AdministradorModel.init({
    idAdministrador: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    correo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    contrasenia: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    administrador: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    }
}, {
    sequelize: database_config_1.sequelize,
    tableName: "administrador",
});
