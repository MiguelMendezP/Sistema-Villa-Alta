"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePasajero = exports.updatePasajero = exports.createPasajero = exports.getPasajero = exports.indexViewPasajero = void 0;
const pasajero_models_1 = require("./../models/pasajero.models");
async function indexViewPasajero(req, res) {
    return res.render("busqueda/components/pago-components");
}
exports.indexViewPasajero = indexViewPasajero;
async function getPasajero(req, res) {
    const { query: where } = req;
    const pasajero = await pasajero_models_1.PasajeroModel.findAll({
        attributes: ["idUsuario", "nombre", "apellido", "telefono"],
        raw: true,
        where
    });
    res.status(200).json(pasajero);
}
exports.getPasajero = getPasajero;
async function createPasajero(req, res) {
    try {
        const { body } = req;
        console.log(body);
        const newPasajero = await pasajero_models_1.PasajeroModel.create(body, { raw: true });
        res.status(201).json(newPasajero);
    }
    catch (error) {
        console.log(error);
    }
}
exports.createPasajero = createPasajero;
async function updatePasajero(req, res) {
    const { nombre } = req.params;
    const { body } = req;
    const entity = await pasajero_models_1.PasajeroModel.findByPk(nombre);
    await (entity === null || entity === void 0 ? void 0 : entity.update(body));
    res.status(201).json(entity === null || entity === void 0 ? void 0 : entity.toJSON());
}
exports.updatePasajero = updatePasajero;
async function deletePasajero(req, res) {
    const { nombre } = req.params;
    const entity = await pasajero_models_1.PasajeroModel.findByPk(nombre);
    await (entity === null || entity === void 0 ? void 0 : entity.destroy());
    res.status(204).json({ ok: "" });
}
exports.deletePasajero = deletePasajero;
