"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscarController = void 0;
class BuscarController {
    buscar(req, res) {
        res.render("busqueda/busqueda-view", {});
    }
    salidas(req, res) {
        res.render("busqueda/viajes-view", {});
    }
    buscando(req, res) {
        res.redirect('/busqueda');
    }
}
exports.buscarController = new BuscarController();
