"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderFileHtml = void 0;
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
async function renderFileHtml(params) {
    const { file, data } = params;
    const filePath = path_1.default.join(__dirname, "..", "views", "templates", file);
    const codeString = await ejs_1.default.renderFile(filePath, data);
    return codeString;
}
exports.renderFileHtml = renderFileHtml;
