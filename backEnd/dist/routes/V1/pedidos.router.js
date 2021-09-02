"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _pedidos = require("../../controllers/V1/pedidos.controller");

var _authMiddleware = require("../../Middlewares/auth-middleware");

var _validatorMiddleware = require("../../Middlewares/validator-middleware");

var _users = require("../../validators/v1/users.validator");

var router = (0, _express.Router)();
router.get("/api/v1/pedidos", _pedidos.TcargaPedidos);
router.get("/api/v1/pedido/:pedido", _pedidos.getPedidoById);
router.get("/api/v1/pedidoD/:pedido", _pedidos.getPedidoDetalleById);
router.get("/api/v1/pedidosAutorizacion", _pedidos.getPedidoAutorizacion);
router.post("/api/v1/pedidoCambioEstado/:pedido", _pedidos.updateEstadoPedido);
var _default = router;
exports["default"] = _default;