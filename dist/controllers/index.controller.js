"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexResponse = void 0;
function indexResponse(req, res) {
    const data = { title: "Programacion web" };
    return res.render("index-view");
}
exports.indexResponse = indexResponse;
