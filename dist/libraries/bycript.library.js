"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePassword = exports.isValidPassword = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const salt = bcrypt_1.default.genSaltSync(10);
function hashPassword(password) {
    return bcrypt_1.default.hashSync(password, salt);
}
exports.hashPassword = hashPassword;
function isValidPassword(pass, passHash) {
    return bcrypt_1.default.compareSync(pass, passHash || "");
}
exports.isValidPassword = isValidPassword;
function generatePassword() {
    return Math.random().toString(36).slice(-11);
}
exports.generatePassword = generatePassword;
