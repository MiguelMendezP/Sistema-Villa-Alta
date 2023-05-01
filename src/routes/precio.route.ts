import {Router} from "express";
import { 
    indexViewPrecio,
    createPrecio,
    getPrecio,
    updatePrecio,
    deletePrecio 
} from "../controllers/precio.controller";
import storageMulter from "../middlewares/multer.middleware";


const precioRoute: Router = Router();

precioRoute.get("/view", indexViewPrecio);
precioRoute.get("/", getPrecio);
precioRoute.post("/",storageMulter.single("imagen"), createPrecio);
precioRoute.post("/update/:idPrecio",storageMulter.single("imagen"), updatePrecio);
precioRoute.delete("/:idPrecio",deletePrecio);



export default precioRoute;
