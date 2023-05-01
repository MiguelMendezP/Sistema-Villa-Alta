"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_session_middleware_1 = require("./middlewares/express-session.middleware");
// Importing Routes
const loggin_router_1 = __importDefault(require("./routes/loggin.router"));
const busqueda_router_1 = __importDefault(require("./routes/busqueda.router"));
const index_route_1 = __importDefault(require("./routes/index.route"));
const terminal_route_1 = __importDefault(require("./routes/terminal.route"));
const usuario_route_1 = __importDefault(require("./routes/usuario.route"));
const administrador_router_1 = __importDefault(require("./routes/administrador.router"));
const salidas_route_1 = __importDefault(require("./routes/salidas.route"));
const pasajero_router_1 = __importDefault(require("./routes/pasajero.router"));
const boleto_router_1 = __importDefault(require("./routes/boleto.router"));
// Initializations
const app = (0, express_1.default)();
//settings
app.set("port", process.env.PORT || 4000);
app.set("view engine", "ejs");
app.set('views', path_1.default.join(__dirname, './views'));
//middlewares
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, './public')));
app.use(express_session_middleware_1.sessionConfig);
app.use(express_session_middleware_1.sessionMiddleware);
//routes
app.use("/", loggin_router_1.default);
app.use("/busqueda", busqueda_router_1.default);
app.use("/pasajero", pasajero_router_1.default);
app.use("/mis-boletos", boleto_router_1.default);
app.use("/admin", index_route_1.default);
app.use("/admin/terminal", terminal_route_1.default);
app.use("/admin/usuario", usuario_route_1.default);
app.use("/admin/administrador", administrador_router_1.default);
app.use("/admin/salida", salidas_route_1.default);
exports.default = app;
