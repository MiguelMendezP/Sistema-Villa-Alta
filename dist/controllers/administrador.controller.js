"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAdministrador = exports.updateAdministrador = exports.createAdministrador = exports.getAdministrador = exports.indexViewAdministrador = void 0;
const administrador_model_1 = require("./../models/administrador.model");
async function indexViewAdministrador(req, res) {
    return res.render("administrador/administrador-view");
}
exports.indexViewAdministrador = indexViewAdministrador;
async function getAdministrador(req, res) {
    const { query: where } = req;
    const admin = await administrador_model_1.AdministradorModel.findAll({
        attributes: ["idAdministrador", "nombre", "correo", "contrasenia", "administrador"],
        raw: true,
        where
    });
    res.status(200).json(admin);
}
exports.getAdministrador = getAdministrador;
async function createAdministrador(req, res) {
    try {
        const { body } = req;
        console.log(body);
        const newAdmin = await administrador_model_1.AdministradorModel.create(body, { raw: true });
        res.status(201).json(newAdmin);
    }
    catch (error) {
        console.log(error);
    }
}
exports.createAdministrador = createAdministrador;
async function updateAdministrador(req, res) {
    const { idAdministrador } = req.params;
    const { body } = req;
    const entity = await administrador_model_1.AdministradorModel.findByPk(idAdministrador);
    await (entity === null || entity === void 0 ? void 0 : entity.update(body));
    res.status(201).json(entity === null || entity === void 0 ? void 0 : entity.toJSON());
}
exports.updateAdministrador = updateAdministrador;
async function deleteAdministrador(req, res) {
    const { idAdministrador } = req.params;
    const entity = await administrador_model_1.AdministradorModel.findByPk(idAdministrador);
    await (entity === null || entity === void 0 ? void 0 : entity.destroy());
    res.status(204).json({ ok: "" });
}
exports.deleteAdministrador = deleteAdministrador;
