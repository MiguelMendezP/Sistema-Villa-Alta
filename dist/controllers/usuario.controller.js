"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuario = exports.updateUsuario = exports.createUsuario = exports.getUsuario = exports.indexViewUsuario = void 0;
const usuario_model_1 = require("./../models/usuario.model");
async function indexViewUsuario(req, res) {
    return res.render("administrador/usuario-view");
}
exports.indexViewUsuario = indexViewUsuario;
async function getUsuario(req, res) {
    const { query: where } = req;
    const usuarios = await usuario_model_1.UsuarioModel.findAll({
        attributes: ["idUsuario", "nombre", "correo", "contrasenia"],
        raw: true,
        where
    });
    res.status(200).json(usuarios);
}
exports.getUsuario = getUsuario;
async function createUsuario(req, res) {
    try {
        const { body } = req;
        console.log(body);
        const newUsuario = await usuario_model_1.UsuarioModel.create(body, { raw: true });
        res.status(201).json(newUsuario);
    }
    catch (error) {
        console.log(error);
    }
}
exports.createUsuario = createUsuario;
async function updateUsuario(req, res) {
    const { idUsuario } = req.params;
    const { body } = req;
    const entity = await usuario_model_1.UsuarioModel.findByPk(idUsuario);
    await (entity === null || entity === void 0 ? void 0 : entity.update(body));
    res.status(201).json(entity === null || entity === void 0 ? void 0 : entity.toJSON());
}
exports.updateUsuario = updateUsuario;
async function deleteUsuario(req, res) {
    const { idUsuario } = req.params;
    const entity = await usuario_model_1.UsuarioModel.findByPk(idUsuario);
    await (entity === null || entity === void 0 ? void 0 : entity.destroy());
    res.status(204).json({ ok: "" });
}
exports.deleteUsuario = deleteUsuario;
