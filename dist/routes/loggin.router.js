"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loggin_controller_1 = require("../controllers/loggin.controller");
const logginRouter = (0, express_1.Router)();
//Ruta
logginRouter.get("/", loggin_controller_1.loginController.logginView);
logginRouter.post("/", loggin_controller_1.loginController.logginUsuario);
logginRouter.get("/register", loggin_controller_1.loginController.register);
logginRouter.post("/register", loggin_controller_1.loginController.register);
exports.default = logginRouter;
