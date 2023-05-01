"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const terminal_controller_1 = require("../controllers/terminal.controller");
const multer_middleware_1 = __importDefault(require("../middlewares/multer.middleware"));
const terminalRouter = (0, express_1.Router)();
terminalRouter.get("/view", terminal_controller_1.indexViewTerminal);
terminalRouter.get("/", terminal_controller_1.getTerminales);
terminalRouter.post("/", multer_middleware_1.default.single("imagen"), terminal_controller_1.createTerminal);
terminalRouter.post("/update/:idTerminal", multer_middleware_1.default.single("imagen"), terminal_controller_1.updateTerminal);
terminalRouter.delete("/:idTerminal", terminal_controller_1.deleteTerminal);
exports.default = terminalRouter;
