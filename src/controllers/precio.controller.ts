import { Request, Response } from "express";
import { PrecioModel } from "../models/precio.models";

export async function indexViewPrecio(req: Request, res: Response) {
    return res.render("administrador/precio-view");
}

export async function getPrecio(req: Request, res: Response) {
    const { query: where } = req
    const precios = await PrecioModel.findAll({
        attributes: ["idPrecio", "destino", "precioOaxaca", "precioVilla"],
        raw: true,
        where
    });
    res.status(200).json(precios);
}

export async function createPrecio(req: Request, res: Response) {
    try {
        const { body } = req;
        console.log(body);
        const newPrecio = await PrecioModel.create(body, { raw: true });
        res.status(201).json(newPrecio);
    } catch (error) {
        console.log(error);
    }
}

export async function updatePrecio(req: Request, res: Response) {
    const { idPrecio } = req.params;
    const { body } = req;
    const entity = await PrecioModel.findByPk(idPrecio)
    await entity?.update(body);
    res.status(201).json(entity?.toJSON());
}

export async function deletePrecio(req: Request, res: Response) {
    const { idPrecio } = req.params;
    const entity = await PrecioModel.findByPk(idPrecio);
    await entity?.destroy();
    res.status(204).json({ok:""});
}