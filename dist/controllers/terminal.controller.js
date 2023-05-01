"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTerminal = exports.updateTerminal = exports.createTerminal = exports.getTerminales = exports.indexViewTerminal = void 0;
const terminal_models_1 = require("../models/terminal.models");
async function indexViewTerminal(req, res) {
    return res.render("administrador/terminal-view");
}
exports.indexViewTerminal = indexViewTerminal;
async function getTerminales(req, res) {
    const { query: where } = req;
    const terminales = await terminal_models_1.TermianlModel.findAll({
        attributes: ["idTerminal", "nombre", "ciudad", "estado"],
        raw: true,
        where
    });
    res.status(200).json(terminales);
}
exports.getTerminales = getTerminales;
async function createTerminal(req, res) {
    try {
        const { body } = req;
        console.log(body);
        const newTerminal = await terminal_models_1.TermianlModel.create(body, { raw: true });
        res.status(201).json(newTerminal);
    }
    catch (error) {
        console.log(error);
    }
}
exports.createTerminal = createTerminal;
async function updateTerminal(req, res) {
    const { idTerminal } = req.params;
    const { body } = req;
    const entity = await terminal_models_1.TermianlModel.findByPk(idTerminal);
    await (entity === null || entity === void 0 ? void 0 : entity.update(body));
    res.status(201).json(entity === null || entity === void 0 ? void 0 : entity.toJSON());
}
exports.updateTerminal = updateTerminal;
async function deleteTerminal(req, res) {
    const { idTerminal } = req.params;
    const entity = await terminal_models_1.TermianlModel.findByPk(idTerminal);
    await (entity === null || entity === void 0 ? void 0 : entity.destroy());
    res.status(204).json({ ok: "" });
}
exports.deleteTerminal = deleteTerminal;
