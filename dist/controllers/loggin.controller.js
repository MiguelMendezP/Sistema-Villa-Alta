"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = void 0;
const usuario_model_1 = require("../models/usuario.model");
const administrador_model_1 = require("./../models/administrador.model");
class LoginController {
    logginView(req, res) {
        res.render("login/login-view", {
            title: 'Login'
        });
    }
    async logginUsuario(req, res) {
        try {
            const { body } = req;
            const { correo, contrasenia } = body;
            const usuarioResponse = await usuario_model_1.UsuarioModel.findOne({
                attributes: ["idUsuario", "nombre", "correo", "contrasenia"],
                where: { correo }
            });
            const administradorResponse = await administrador_model_1.AdministradorModel.findOne({
                attributes: ["idAdministrador", "nombre", "correo", "contrasenia", "administrador"],
                where: { correo }
            });
            if (usuarioResponse !== null) {
                const contraseniaUsuario = usuarioResponse.getDataValue("contrasenia");
                if (contrasenia == contraseniaUsuario) {
                    const user = usuarioResponse.toJSON();
                    delete user.contrasenia;
                    req.session.user = user;
                    console.log(user);
                    //return res.redirect("/busqueda");
                }
                else {
                    window.alert("La contraseña esta mal");
                }
            }
            else if (administradorResponse !== null) {
                const contraseniaAdministrador = administradorResponse.getDataValue("contrasenia");
                if (contrasenia == contraseniaAdministrador) {
                    const admin = administradorResponse.toJSON();
                    delete admin.contrasenia;
                    req.session.user = admin;
                    return res.redirect("/admin");
                }
                else {
                    window.alert("La contraseña esta mal");
                }
            }
        }
        catch (error) {
            res.send("error");
        }
    }
    register(req, res) {
        res.render("login/register-view", {
            title: 'Register'
        });
    }
    //Registrarse 
    registrarse(req, res) {
        console.log(req.body);
        res.send("Recivido");
    }
}
exports.loginController = new LoginController();
