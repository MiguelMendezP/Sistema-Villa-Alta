"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_controller_1 = require("../controllers/index.controller");
const indexRouter = (0, express_1.Router)();
indexRouter.get("/", index_controller_1.indexResponse);
exports.default = indexRouter;
