"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queriesPedidos = void 0;

var _Global = _interopRequireDefault(require("../../../Global"));

var queriesPedidos = {
  /*pedidos*/
  getQPedidosAutorizacion: "select pt.pedido,pt.cliente,pt.nombre,pt.direccion,pt.monto,pe.estado,pe.fecha_hora from despacho.dbo.tickets_detalle_pedidos pt, ".concat(_Global["default"].BASE_DATOS, ".").concat(_Global["default"].EMPRESA, ".pedido  pe  where pe.pedido=pt.pedido and pe.estado in ('N','A') "),
  getPedidoLinea: "select * from ".concat(_Global["default"].BASE_DATOS, ".").concat(_Global["default"].EMPRESA, ".pedido_linea where pedido=@pedido"),
  getQCambioEstadoPedido: "update ".concat(_Global["default"].BASE_DATOS, ".").concat(_Global["default"].EMPRESA, ".pedido set estado=@estado where pedido=@pedido")
  /*Facturas*/

  /*Tickets*/
  //Actualizamos en TCargaPedido

};
exports.queriesPedidos = queriesPedidos;