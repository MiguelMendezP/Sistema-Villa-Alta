"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pasajero_controller_1 = require("../controllers/pasajero.controller");
const multer_middleware_1 = __importDefault(require("../middlewares/multer.middleware"));
const PasajeroRouter = (0, express_1.Router)();
PasajeroRouter.get("/view", pasajero_controller_1.indexViewPasajero);
PasajeroRouter.get("/", pasajero_controller_1.getPasajero);
PasajeroRouter.post("/", multer_middleware_1.default.single("imagen"), pasajero_controller_1.createPasajero);
PasajeroRouter.post("/update/:idPasajero", multer_middleware_1.default.single("imagen"), pasajero_controller_1.updatePasajero);
PasajeroRouter.delete("/:idPasajero", pasajero_controller_1.deletePasajero);
exports.default = PasajeroRouter;
