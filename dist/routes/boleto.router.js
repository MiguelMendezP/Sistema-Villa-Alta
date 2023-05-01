"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const boleto_controller_1 = require("../controllers/boleto.controller");
const multer_middleware_1 = __importDefault(require("../middlewares/multer.middleware"));
const BoletoRouter = (0, express_1.Router)();
BoletoRouter.get("/view", boleto_controller_1.indexViewBoleto);
BoletoRouter.get("/", boleto_controller_1.getBoleto);
BoletoRouter.post("/", multer_middleware_1.default.single("imagen"), boleto_controller_1.createBoleto);
BoletoRouter.post("/update/:idBoleto", multer_middleware_1.default.single("imagen"), boleto_controller_1.updateBoleto);
BoletoRouter.delete("/:idBoleto", boleto_controller_1.deleteBoleto);
exports.default = BoletoRouter;
