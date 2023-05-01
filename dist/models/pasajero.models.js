"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasajeroModel = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = require("../database/database.config");
class PasajeroModel extends sequelize_1.Model {
}
exports.PasajeroModel = PasajeroModel;
PasajeroModel.init({
    idUsuario: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    apellido: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    telefono: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: database_config_1.sequelize,
    tableName: "pasajero",
});
