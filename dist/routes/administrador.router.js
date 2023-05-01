"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const administrador_controller_1 = require("../controllers/administrador.controller");
const multer_middleware_1 = __importDefault(require("../middlewares/multer.middleware"));
const administradorRouter = (0, express_1.Router)();
administradorRouter.get("/view", administrador_controller_1.indexViewAdministrador);
administradorRouter.get("/", administrador_controller_1.getAdministrador);
administradorRouter.post("/", multer_middleware_1.default.single("imagen"), administrador_controller_1.createAdministrador);
administradorRouter.post("/update/:idAdministrador", multer_middleware_1.default.single("imagen"), administrador_controller_1.updateAdministrador);
administradorRouter.delete("/:idAdministrador", administrador_controller_1.deleteAdministrador);
exports.default = administradorRouter;
