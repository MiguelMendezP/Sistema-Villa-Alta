"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSalida = exports.updateSalida = exports.createSalida = exports.getSalida = exports.indexViewSalida = void 0;
const salida_model_1 = require("../models/salida.model");
async function indexViewSalida(req, res) {
    return res.render("administrador/salida-view");
}
exports.indexViewSalida = indexViewSalida;
async function getSalida(req, res) {
    const { query: where } = req;
    const salidas = await salida_model_1.SalidaModel.findAll({
        attributes: ["idSalida", "hora", "fecha", "precio", "terminal_salida", "terminal_destino"],
        raw: true,
        where
    });
    res.status(200).json(salidas);
}
exports.getSalida = getSalida;
async function createSalida(req, res) {
    try {
        const { body } = req;
        console.log(body);
        const newSalida = await salida_model_1.SalidaModel.create(body, { raw: true });
        res.status(201).json(newSalida);
    }
    catch (error) {
        console.log(error);
    }
}
exports.createSalida = createSalida;
async function updateSalida(req, res) {
    const { idSalida } = req.params;
    const { body } = req;
    const entity = await salida_model_1.SalidaModel.findByPk(idSalida);
    await (entity === null || entity === void 0 ? void 0 : entity.update(body));
    res.status(201).json(entity === null || entity === void 0 ? void 0 : entity.toJSON());
}
exports.updateSalida = updateSalida;
async function deleteSalida(req, res) {
    const { idSalida } = req.params;
    const entity = await salida_model_1.SalidaModel.findByPk(idSalida);
    await (entity === null || entity === void 0 ? void 0 : entity.destroy());
    res.status(204).json({ ok: "" });
}
exports.deleteSalida = deleteSalida;
