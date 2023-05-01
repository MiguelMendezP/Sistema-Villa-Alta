"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const salida_controller_1 = require("../controllers/salida.controller");
const multer_middleware_1 = __importDefault(require("../middlewares/multer.middleware"));
const salidaRouter = (0, express_1.Router)();
salidaRouter.get("/view", salida_controller_1.indexViewSalida);
salidaRouter.get("/", salida_controller_1.getSalida);
salidaRouter.post("/", multer_middleware_1.default.single("imagen"), salida_controller_1.createSalida);
salidaRouter.post("/update/:idSalida", multer_middleware_1.default.single("imagen"), salida_controller_1.updateSalida);
salidaRouter.delete("/:idSalida", salida_controller_1.deleteSalida);
exports.default = salidaRouter;
