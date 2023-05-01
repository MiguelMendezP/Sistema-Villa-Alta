"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const busqueda_controller_1 = require("../controllers/busqueda.controller");
const buscar = (0, express_1.Router)();
//Ruta
buscar.get("/", busqueda_controller_1.buscarController.buscar);
buscar.post("/", busqueda_controller_1.buscarController.buscando);
buscar.get("/viajes", busqueda_controller_1.buscarController.salidas);
exports.default = buscar;
