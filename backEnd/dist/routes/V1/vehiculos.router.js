"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _vehiculos = require("../../controllers/V1/vehiculos.controller");

var router = (0, _express.Router)();
router.get("/api/v1/vehiculos", _vehiculos.getVehiculo);
router.get("/api/v1/vehiculos", _vehiculos.getVehiculoById);
router.post("/api/v1/vehiculos", _vehiculos.createNewVehiculo);
router.get("/api/v1/vehiculos/:id", _vehiculos.getVehiculoById);
router["delete"]("/api/v1/vehiculos/:id", _vehiculos.deleteVehiculo);
router.put("/api/v1/vehiculos/:id", _vehiculos.updateVehiculo);
var _default = router;
exports["default"] = _default;