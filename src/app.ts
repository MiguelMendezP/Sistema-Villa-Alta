//Libreria Express para el framework de node
import express, { Application } from "express";
import morgan from "morgan";
import path from "path"
import dotenv from "dotenv";
dotenv.config();

//se importan los Middleware para guardar las cookie del inicio de sesión
import {sessionConfig, sessionMiddleware} from "./middlewares/express-session.middleware";


//Se importan las clases donde se encuentran todas las rutas 
//Rutas de JSON bases de datos
import precioRouter from "./routes/precio.route";
import usuarioRouter from "./routes/usuario.route";
import administradorRouter from "./routes/administrador.router";
import salidaRouter from "./routes/salidas.route";
import pasajeroRouter from "./routes/pasajero.router";
import boletoRouter from "./routes/boleto.router";
//Rutas de Modulos de ventanas
import LoginRoutes from "./routes/loggin.router";
import BusquedaController from "./routes/busqueda.router";
import reporteRouter from "./routes/reporte.router";


// Initializations
const app: Application = express();

//settings del servidor local
app.set("port", process.env.PORT || 4000);
app.set("view engine","ejs");
app.set('views', path.join(__dirname, './views'));

//middlewares para las cookies
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'./public')))
app.use(sessionConfig);
app.use(sessionMiddleware);

//Rutas
//Administrador
app.use("/admin", reporteRouter);
app.use("/admin/precio",precioRouter);
app.use("/admin/usuario",usuarioRouter)
app.use("/admin/administrador",administradorRouter)
app.use("/admin/salida",salidaRouter);
//Cliente
app.use("/", LoginRoutes);
app.use("/busqueda", BusquedaController);
app.use("/pasajero",pasajeroRouter);
app.use("/mis-boletos",boletoRouter);


export default app;
