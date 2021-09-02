"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateEstadoPedido = exports.getPedidoAutorizacion = exports.getPedidoDetalleById = exports.getPedidoById = exports.TcargaPedidos = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mssql = require("mssql");

var _database = require("../../database");

var TcargaPedidos = /*#__PURE__*/function () {
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
            return _pool.request().query(_database.queries.CargaPedidos);

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

  return function TcargaPedidos(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.TcargaPedidos = TcargaPedidos;

var getPedidoById = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var pedido, _pool2, result;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            pedido = req.params.pedido;
            _context2.prev = 1;
            _context2.next = 4;
            return (0, _database.getConnection)();

          case 4:
            _pool2 = _context2.sent;
            _context2.next = 7;
            return _pool2.request().input("Pedido", pedido).query(_database.queries.getPedidoByid);

          case 7:
            result = _context2.sent;
            res.send(result.recordset[0]);
            _context2.next = 15;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](1);
            res.status(500);
            res.send(_context2.t0.message);

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 11]]);
  }));

  return function getPedidoById(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getPedidoById = getPedidoById;

var getPedidoDetalleById = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var pedido, _pool3, result;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            pedido = req.params.pedido;
            _context3.prev = 1;
            _context3.next = 4;
            return (0, _database.getConnection)();

          case 4:
            _pool3 = _context3.sent;
            _context3.next = 7;
            return _pool3.request().input("Pedido", pedido).query(_database.queries.getPedidoDetalleByid);

          case 7:
            result = _context3.sent;
            res.json(result.recordset);
            _context3.next = 15;
            break;

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3["catch"](1);
            res.status(500);
            res.send(_context3.t0.message);

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 11]]);
  }));

  return function getPedidoDetalleById(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getPedidoDetalleById = getPedidoDetalleById;

var getPedidoAutorizacion = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _pool4, result;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return (0, _database.getConnection)();

          case 3:
            _pool4 = _context4.sent;
            _context4.next = 6;
            return _pool4.request().query(_database.queriesPedidos.getQPedidosAutorizacion);

          case 6:
            result = _context4.sent;
            res.json(result.recordset);
            _context4.next = 14;
            break;

          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4["catch"](0);
            res.status(500);
            res.send(_context4.t0.message);

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 10]]);
  }));

  return function getPedidoAutorizacion(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getPedidoAutorizacion = getPedidoAutorizacion;

var updateEstadoPedido = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var pedido, estado, pool;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            pedido = req.params.pedido;
            estado = req.body.estado;
            _context5.next = 4;
            return (0, _database.getConnection)();

          case 4:
            pool = _context5.sent;

            if (!(estado === "N")) {
              _context5.next = 9;
              break;
            }

            _context5.next = 8;
            return pool.request().input("estado", _database.sql.VarChar, "A").input("pedido", pedido).query(_database.queriesPedidos.getQCambioEstadoPedido);

          case 8:
            res.json({
              estado: estado
            });

          case 9:
            if (!(estado === "A")) {
              _context5.next = 13;
              break;
            }

            _context5.next = 12;
            return pool.request().input("estado", _database.sql.VarChar, "N").input("pedido", pedido).query(_database.queriesPedidos.getQCambioEstadoPedido);

          case 12:
            res.json({
              estado: estado
            });

          case 13:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function updateEstadoPedido(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.updateEstadoPedido = updateEstadoPedido;