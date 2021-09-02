"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _tickets = require("../../controllers/V1/tickets.controller");

var _authMiddleware = require("../../Middlewares/auth-middleware");

var _validatorMiddleware = require("../../Middlewares/validator-middleware");

var _users = require("../../validators/v1/users.validator");

var router = (0, _express.Router)(); //router.post("/api/v1/login", login);
//router.post("/api/v1/users", createNewUser);
//router.get("/api/v1/users", getUsers);
//router.get("/api/v1/users/:id", getUserById);
//router.delete("/api/v1/users/:id", checkAuth, deleteUser);

router.get("/api/v1/ticketProductos/:id", _tickets.getTicketDetalleProductoById);
router.get("/api/v1/ticketPedidos/:id", _tickets.getTicketDetallePedidoById);
router.get("/api/v1/ticketById/:id", _tickets.getTicketById);
router.get("/api/v1/ticketImpresion/", _tickets.getTicketImpresion);
router.post("/api/v1/createTicket", _tickets.createTicket);
router.post("/api/v1/createTicketPedidos", _tickets.createTicketPedido);
router.get("/api/v1/maxticket", _tickets.getMaxTicket);
router.get("/api/v1/getTicketAll", _tickets.getTicketAll);
router.put("/api/v1/ticket/:pedido", _tickets.getActualizarTcargaPedido);
router.put("/api/v1/ticketEstado/:id", _tickets.cambioEstado);
var _default = router;
exports["default"] = _default;