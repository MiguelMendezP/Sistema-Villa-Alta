"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBoleto = exports.updateBoleto = exports.createBoleto = exports.getBoleto = exports.indexViewBoleto = void 0;
const boleto_model_1 = require("../models/boleto.model");
async function indexViewBoleto(req, res) {
    return res.render("boletos/boleto-view");
}
exports.indexViewBoleto = indexViewBoleto;
async function getBoleto(req, res) {
    const { query: where } = req;
    const boleto = await boleto_model_1.BoletoModel.findAll({
        attributes: ["idBoleto", "idUsuario", "idSalida", "noAsiento"],
        raw: true,
        where
    });
    res.status(200).json(boleto);
}
exports.getBoleto = getBoleto;
async function createBoleto(req, res) {
    try {
        const { body } = req;
        console.log(body);
        const newBoleto = await boleto_model_1.BoletoModel.create(body, { raw: true });
        res.status(201).json(newBoleto);
    }
    catch (error) {
        console.log(error);
    }
}
exports.createBoleto = createBoleto;
async function updateBoleto(req, res) {
    const { idBoleto } = req.params;
    const { body } = req;
    const entity = await boleto_model_1.BoletoModel.findByPk(idBoleto);
    await (entity === null || entity === void 0 ? void 0 : entity.update(body));
    res.status(201).json(entity === null || entity === void 0 ? void 0 : entity.toJSON());
}
exports.updateBoleto = updateBoleto;
async function deleteBoleto(req, res) {
    const { idBoleto } = req.params;
    const entity = await boleto_model_1.BoletoModel.findByPk(idBoleto);
    await (entity === null || entity === void 0 ? void 0 : entity.destroy());
    res.status(204).json({ ok: "" });
}
exports.deleteBoleto = deleteBoleto;
