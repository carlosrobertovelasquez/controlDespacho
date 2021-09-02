"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _ayudantes = require("../../controllers/V1/ayudantes.controller");

var router = (0, _express.Router)();
router.get("/api/v1/ayudantes", _ayudantes.getAyudantes);
router.get("/api/v1/ayudantesActivos", _ayudantes.getAyudantesActivos);
router.post("/api/v1/ayudantes", _ayudantes.createNewAyudante);
router.get("/api/v1/ayudantes/:id", _ayudantes.getAyudanteById);
router["delete"]("/api/v1/ayudantes/:id", _ayudantes.deleteAyudante);
router.put("/api/v1/ayudantes/:id", _ayudantes.updateAyudante);
var _default = router;
exports["default"] = _default;