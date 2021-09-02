"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTicketById = exports.getTicketImpresion = exports.getTicketDetalleProductoById = exports.getTicketDetallePedidoById = exports.cambioEstado = exports.createTicketPedido = exports.createTicket = exports.getMaxTicket = exports.getActualizarTcargaPedido = exports.getTicketAll = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mssql = require("mssql");

var _database = require("../../database");

var _nodeDatetime = _interopRequireDefault(require("node-datetime"));

var _moment = _interopRequireDefault(require("moment"));

var getTicketAll = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _pool, result;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _database.getConnection)();

          case 3:
            _pool = _context.sent;
            _context.next = 6;
            return _pool.request().query("select ti.ticket,ti.estado,ti.fecha_inicio,ti.ubicacion,ti.preparador,ayu.nombre,ti.cant_pedido from despacho.dbo.tickets ti,despacho.dbo.ayudantes ayu where ti.preparador=ayu.id and ti.estado in ('01','02','03')");

          case 6:
            result = _context.sent;
            res.json(result.recordset);
            _context.next = 14;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            res.status(500);
            res.send(_context.t0.message);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 10]]);
  }));

  return function getTicketAll(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getTicketAll = getTicketAll;

var getActualizarTcargaPedido = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var pedido, numTicket, fechahoy, pool;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            pedido = req.params.pedido;
            numTicket = req.body.numTicket;
            fechahoy = new Date();
            _context2.next = 5;
            return (0, _database.getConnection)();

          case 5:
            pool = _context2.sent;
            _context2.next = 8;
            return pool.request().input("Nticket", _database.sql.VarChar, numTicket).input("FechaHoraTicket", _database.sql.DateTime, fechahoy).input("pedido", pedido).query(_database.queries.getActualizarTcargaPedido);

          case 8:
            res.json({
              pedido: pedido
            });

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getActualizarTcargaPedido(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getActualizarTcargaPedido = getActualizarTcargaPedido;

var getMaxTicket = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _pool2, result;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return (0, _database.getConnection)();

          case 3:
            _pool2 = _context3.sent;
            _context3.next = 6;
            return _pool2.request().query(_database.queries.getMaxTicket);

          case 6:
            result = _context3.sent;
            res.send(result.recordset[0]);
            _context3.next = 14;
            break;

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](0);
            res.status(500);
            res.send(_context3.t0.message);

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 10]]);
  }));

  return function getMaxTicket(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getMaxTicket = getMaxTicket;

var createTicket = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _req$body, preparador, cantPedido, usuarioCreacion, fechahoy, pool, result, corre, correlativo, correl;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$body = req.body, preparador = _req$body.preparador, cantPedido = _req$body.cantPedido, usuarioCreacion = _req$body.usuarioCreacion;

            if (!(preparador == "ND" || cantPedido == null || usuarioCreacion == null)) {
              _context4.next = 3;
              break;
            }

            return _context4.abrupt("return", res.status(400).json({
              msg: "FALTA INGRESO DE DATOS"
            }));

          case 3:
            fechahoy = new Date();
            _context4.next = 6;
            return (0, _database.getConnection)();

          case 6:
            pool = _context4.sent;
            _context4.next = 9;
            return pool.request().query(_database.queries.getMaxTicket);

          case 9:
            result = _context4.sent;
            corre = result.recordset[0];
            correlativo = corre.maximo;
            correl = correlativo + 1;
            _context4.prev = 13;
            _context4.next = 16;
            return pool.request().input("Nticket", _database.sql.Int, correl).input("preparador", _database.sql.VarChar, preparador).input("estado", _database.sql.VarChar, "01").input("cantPedido", _database.sql.Numeric(18, 0), cantPedido).input("fechaInicio", _database.sql.DateTime, fechahoy).input("usuarioCreacion", _database.sql.VarChar, usuarioCreacion).input("ubicacion", _database.sql.VarChar, "ND").input("createAt", _database.sql.DateTime, fechahoy).query(_database.queries.crearTicket);

          case 16:
            res.json({
              correl: correl
            });
            _context4.next = 23;
            break;

          case 19:
            _context4.prev = 19;
            _context4.t0 = _context4["catch"](13);
            res.status(500);
            res.send(_context4.t0.message);

          case 23:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[13, 19]]);
  }));

  return function createTicket(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.createTicket = createTicket;

var createTicketPedido = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var _req$body2, ticket, pedido, pool, fechahoy, i, element, result, dato, resulPedidoLinea, pedidoLinea, _i, element2;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _req$body2 = req.body, ticket = _req$body2.ticket, pedido = _req$body2.pedido;
            _context5.next = 3;
            return (0, _database.getConnection)();

          case 3:
            pool = _context5.sent;
            //Consultamos Pedido Encabezado
            fechahoy = new Date();
            i = 0;

          case 6:
            if (!(i < pedido.length)) {
              _context5.next = 40;
              break;
            }

            element = pedido[i];
            _context5.prev = 8;
            _context5.next = 11;
            return pool.request().input("pedido", _database.sql.VarChar, element.pedidos).query(_database.queries.getPedidoTicket);

          case 11:
            result = _context5.sent;
            dato = result.recordset[0];
            _context5.next = 15;
            return pool.request().input("idTicket", _database.sql.VarChar(50), ticket).input("pedido", _database.sql.VarChar(50), element.pedidos).input("cliente", _database.sql.VarChar, dato.cliente).input("nombre", _database.sql.VarChar(150), dato.nombre).input("direccion", _database.sql.VarChar, dato.direccion).input("monto", _database.sql.Decimal(18, 2), dato.monto).input("estado", _database.sql.VarChar(4), dato.estado).input("vendedor", _database.sql.VarChar(10), dato.vendedor).input("nombrevendedor", _database.sql.VarChar(150), dato.nombre_vendedor).input("nota", _database.sql.VarChar(300), dato.nota).input("ubicacion", _database.sql.VarChar(50), dato.ubicacion).query("INSERT INTO Despacho.dbo.tickets_detalle_pedidos(id_ticket,pedido,cliente,nombre,direccion,monto,estado,vendedor,nombre_vendedor,nota,ubicacion) values(@idTicket,@pedido,@cliente,@nombre,@direccion,@monto,@estado,@vendedor,@nombrevendedor,@nota,@ubicacion)");

          case 15:
            _context5.next = 17;
            return pool.request().input("pedido", _database.sql.VarChar, element.pedidos).query(_database.queries.getPedidoLinea);

          case 17:
            resulPedidoLinea = _context5.sent;
            pedidoLinea = resulPedidoLinea.recordset;
            _i = 0;

          case 20:
            if (!(_i < pedidoLinea.length)) {
              _context5.next = 27;
              break;
            }

            element2 = pedidoLinea[_i];
            _context5.next = 24;
            return pool.request().input("idTicket", _database.sql.VarChar(50), ticket).input("pedido", _database.sql.VarChar(50), element2.PEDIDO).input("pedidoLinea", _database.sql.VarChar, element2.PEDIDO_LINEA).input("bodega", _database.sql.VarChar, element2.BODEGA).input("lote", _database.sql.VarChar, element2.LOTE).input("articulo", _database.sql.VarChar, element2.ARTICULO).input("precioUnitario", _database.sql.Decimal(18, 2), element2.PRECIO_UNITARIO).input("cantidadPedida", _database.sql.Decimal(18, 2), element2.CANTIDAD_PEDIDA).input("cantidadAFactura", _database.sql.Decimal(18, 2), element2.CANTIDAD_A_FACTURA).input("cantidadBonificad", _database.sql.Decimal(18, 2), element2.CANTIDAD_BONIFICAD).input("ubicacion", _database.sql.VarChar(50), dato.ubicacion).query("INSERT INTO Despacho.dbo.tickets_detalle_productos(ticket,pedido,pedido_linea,bodega,lote,articulo,precio_unitario,cantidad_pedida,cantidad_a_facturar,cantidad_bonificad,ubicacion) values(@idTicket,@pedido,@pedidoLinea,@bodega,@lote,@articulo,@precioUnitario,@cantidadPedida,@cantidadAFactura,@cantidadBonificad,@ubicacion)");

          case 24:
            _i++;
            _context5.next = 20;
            break;

          case 27:
            _context5.next = 29;
            return pool.request().input("idTicket", _database.sql.VarChar(50), ticket).input("pedido", _database.sql.VarChar(50), element.pedidos).input("fechaHoraTicket", _database.sql.DateTime, fechahoy).query("UPDATE Despacho.dbo.TCargaPedidos set num_Ticket=@idTicket,Fecha_Hora_ticket=@fechaHoraTicket where pedidos=@pedido");

          case 29:
            _context5.next = 31;
            return pool.request().input("idTicket", _database.sql.VarChar(50), ticket).input("pedido", _database.sql.VarChar(50), element.pedidos).query(_database.queriesTicket.updateTablaPedido);

          case 31:
            _context5.next = 37;
            break;

          case 33:
            _context5.prev = 33;
            _context5.t0 = _context5["catch"](8);
            res.status(500);
            res.send(_context5.t0.message);

          case 37:
            i++;
            _context5.next = 6;
            break;

          case 40:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[8, 33]]);
  }));

  return function createTicketPedido(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.createTicketPedido = createTicketPedido;

var cambioEstado = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var id, estado, pool, fechahoy, date, d;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            id = req.params.id;
            estado = req.body.estado;
            _context6.next = 4;
            return (0, _database.getConnection)();

          case 4:
            pool = _context6.sent;
            fechahoy = new Date(); //const fechahoy = new Date().toTimeString("en-US", {
            //  timeZone: "America/Guatemala",
            //});

            date = new Date();
            d = (0, _moment["default"])(date).format();

            if (!(estado === "02")) {
              _context6.next = 12;
              break;
            }

            _context6.next = 11;
            return pool.request().input("estado", _database.sql.VarChar, estado).input("fechahoy", _database.sql.DateTime, d).input("Id", id).query("update despacho.dbo.tickets set estado=@estado,fecha_inicio_preparacion=@fechahoy where ticket=@id");

          case 11:
            res.json({
              estado: estado
            });

          case 12:
            if (!(estado === "03")) {
              _context6.next = 16;
              break;
            }

            _context6.next = 15;
            return pool.request().input("estado", _database.sql.VarChar, estado).input("fechahoy", _database.sql.DateTime, d).input("Id", id).query("update despacho.dbo.tickets set estado=@estado,fecha_fin_preparacion=@fechahoy where ticket=@id");

          case 15:
            res.json({
              estado: estado
            });

          case 16:
            if (!(estado === "04")) {
              _context6.next = 20;
              break;
            }

            _context6.next = 19;
            return pool.request().input("estado", _database.sql.VarChar, estado).input("fechahoy", _database.sql.DateTime, d).input("Id", id).query("update despacho.dbo.tickets set estado=@estado,fecha_fin_revision=@fechahoy where ticket=@id");

          case 19:
            res.json({
              estado: estado
            });

          case 20:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function cambioEstado(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}(); //Buscamos en la tabla TickePedido para saber el detalle de pedidos en el ticket


exports.cambioEstado = cambioEstado;

var getTicketDetallePedidoById = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var id, _pool3, result;

    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            id = req.params.id;
            _context7.prev = 1;
            _context7.next = 4;
            return (0, _database.getConnection)();

          case 4:
            _pool3 = _context7.sent;
            _context7.next = 7;
            return _pool3.request().input("Id", id).query("select * from despacho.dbo.tickets_detalle_pedidos where id_ticket=@Id");

          case 7:
            result = _context7.sent;
            res.send(result.recordset);
            _context7.next = 15;
            break;

          case 11:
            _context7.prev = 11;
            _context7.t0 = _context7["catch"](1);
            res.status(500);
            res.send(_context7.t0.message);

          case 15:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[1, 11]]);
  }));

  return function getTicketDetallePedidoById(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

exports.getTicketDetallePedidoById = getTicketDetallePedidoById;

var getTicketDetalleProductoById = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var id, _pool4, result;

    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            id = req.params.id;
            _context8.prev = 1;
            _context8.next = 4;
            return (0, _database.getConnection)();

          case 4:
            _pool4 = _context8.sent;
            _context8.next = 7;
            return _pool4.request().input("Id", id).query(_database.queriesTicket.getQTicketProductos);

          case 7:
            result = _context8.sent;
            res.send(result.recordset);
            _context8.next = 15;
            break;

          case 11:
            _context8.prev = 11;
            _context8.t0 = _context8["catch"](1);
            res.status(500);
            res.send(_context8.t0.message);

          case 15:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[1, 11]]);
  }));

  return function getTicketDetalleProductoById(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}(); //Consulta de Ticket para impression con lote y sin lote


exports.getTicketDetalleProductoById = getTicketDetalleProductoById;

var getTicketImpresion = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
    var _req$query, lote, idTicket, _pool5, result, _pool6, _result;

    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _req$query = req.query, lote = _req$query.lote, idTicket = _req$query.idTicket;

            if (!(lote === "S")) {
              _context9.next = 16;
              break;
            }

            _context9.prev = 2;
            _context9.next = 5;
            return (0, _database.getConnection)();

          case 5:
            _pool5 = _context9.sent;
            _context9.next = 8;
            return _pool5.request().input("idTicket", idTicket).query(_database.queriesTicket.getQTicketImpresionConLote);

          case 8:
            result = _context9.sent;
            res.send(result.recordset);
            _context9.next = 16;
            break;

          case 12:
            _context9.prev = 12;
            _context9.t0 = _context9["catch"](2);
            res.status(500);
            res.send(_context9.t0.message);

          case 16:
            if (!(lote === "N")) {
              _context9.next = 31;
              break;
            }

            _context9.prev = 17;
            _context9.next = 20;
            return (0, _database.getConnection)();

          case 20:
            _pool6 = _context9.sent;
            _context9.next = 23;
            return _pool6.request().input("idTicket", idTicket).query(_database.queriesTicket.getQTicketImpresionSinLote);

          case 23:
            _result = _context9.sent;
            res.send(_result.recordset);
            _context9.next = 31;
            break;

          case 27:
            _context9.prev = 27;
            _context9.t1 = _context9["catch"](17);
            res.status(500);
            res.send(_context9.t1.message);

          case 31:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[2, 12], [17, 27]]);
  }));

  return function getTicketImpresion(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

exports.getTicketImpresion = getTicketImpresion;

var getTicketById = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
    var id, _pool7, result;

    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            id = req.params.id;
            _context10.prev = 1;
            _context10.next = 4;
            return (0, _database.getConnection)();

          case 4:
            _pool7 = _context10.sent;
            _context10.next = 7;
            return _pool7.request().input("IdTicket", id).query(_database.queriesTicket.getQTicketbyId);

          case 7:
            result = _context10.sent;
            res.send(result.recordset[0]);
            _context10.next = 15;
            break;

          case 11:
            _context10.prev = 11;
            _context10.t0 = _context10["catch"](1);
            res.status(500);
            res.send(_context10.t0.message);

          case 15:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[1, 11]]);
  }));

  return function getTicketById(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();

exports.getTicketById = getTicketById;