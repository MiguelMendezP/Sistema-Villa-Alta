"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_controller_1 = require("../controllers/usuario.controller");
const multer_middleware_1 = __importDefault(require("../middlewares/multer.middleware"));
const usuarioRouter = (0, express_1.Router)();
usuarioRouter.get("/view", usuario_controller_1.indexViewUsuario);
usuarioRouter.get("/", usuario_controller_1.getUsuario);
usuarioRouter.post("/", multer_middleware_1.default.single("imagen"), usuario_controller_1.createUsuario);
usuarioRouter.post("/update/:idUsuario", multer_middleware_1.default.single("imagen"), usuario_controller_1.updateUsuario);
usuarioRouter.delete("/:idUsuario", usuario_controller_1.deleteUsuario);
exports.default = usuarioRouter;
