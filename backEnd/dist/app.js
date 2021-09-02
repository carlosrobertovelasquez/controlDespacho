"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _config = _interopRequireDefault(require("./config"));

var _cors = _interopRequireDefault(require("cors"));

var _users = _interopRequireDefault(require("./routes/V1/users.router"));

var _vehiculos = _interopRequireDefault(require("./routes/V1/vehiculos.router"));

var _motorista = _interopRequireDefault(require("./routes/V1/motorista.router"));

var _ayudantes = _interopRequireDefault(require("./routes/V1/ayudantes.router"));

var _pedidos = _interopRequireDefault(require("./routes/V1/pedidos.router"));

var _tickets = _interopRequireDefault(require("./routes/V1/tickets.router"));

var app = (0, _express["default"])(); //setting

app.set("port", _config["default"].port); //middlawares

app.use((0, _cors["default"])());
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use(_users["default"], _vehiculos["default"], _motorista["default"], _ayudantes["default"], _pedidos["default"], _tickets["default"]);
var _default = app;
exports["default"] = _default;