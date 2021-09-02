"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _motorista = require("../../controllers/V1/motorista.controller");

var router = (0, _express.Router)();
router.get("/api/v1/motoristas", _motorista.getMotoristas);
router.post("/api/v1/motoristas", _motorista.createNewMotorista);
router.get("/api/v1/motoristas/:id", _motorista.getMotoristaById);
router["delete"]("/api/v1/motoristas/:id", _motorista.deleteMotorista);
router.put("/api/v1/motoristas/:id", _motorista.updateMotorista);
var _default = router;
exports["default"] = _default;