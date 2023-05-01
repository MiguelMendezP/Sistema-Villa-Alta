"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const database_config_1 = require("./database/database.config");
require("./database/models.config");
async function main() {
    database_config_1.sequelize
        .sync({ alter: true })
        .then(() => { })
        .catch((err) => console.log(err));
    await app_1.default.listen(app_1.default.get("port"));
    console.log("Server running http://localhost:" + app_1.default.get("port"));
}
main();
