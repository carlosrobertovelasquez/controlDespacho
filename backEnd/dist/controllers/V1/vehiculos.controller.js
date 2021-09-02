"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateVehiculo = exports.deleteVehiculo = exports.getVehiculoById = exports.createNewVehiculo = exports.getVehiculo = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mssql = require("mssql");

var _database = require("../../database");

var getVehiculo = /*#__PURE__*/function () {
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
            return _pool.request().query(_database.queries.getAllVehiculo);

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

  return function getVehiculo(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getVehiculo = getVehiculo;

var createNewVehiculo = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body, placa, modelo, kinicial, kfinal, estado, ano, propio, combustible, _pool2;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, placa = _req$body.placa, modelo = _req$body.modelo, kinicial = _req$body.kinicial, kfinal = _req$body.kfinal, estado = _req$body.estado, ano = _req$body.ano, propio = _req$body.propio, combustible = _req$body.combustible;

            if (!(placa == null || modelo == null || kinicial == null || kfinal == null || estado == null || ano == null || propio == null || combustible == null)) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              msg: "No tiene todos los Campos Solicitados"
            }));

          case 3:
            _context2.prev = 3;
            _context2.next = 6;
            return (0, _database.getConnection)();

          case 6:
            _pool2 = _context2.sent;
            _context2.next = 9;
            return _pool2.request().input("placa", _database.sql.VarChar, placa).input("modelo", _database.sql.VarChar, modelo).input("kinicial", _database.sql.Decimal(28, 2), kinicial).input("kfinal", _database.sql.Decimal(28, 2), kfinal).input("estado", _database.sql.VarChar, estado).input("ano", _database.sql.VarChar, ano).input("propio", _database.sql.VarChar, propio).input("combustible", _database.sql.VarChar, combustible).query(_database.queries.createNewVehiculos);

          case 9:
            res.json({
              placa: placa,
              modelo: modelo
            });
            _context2.next = 16;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](3);
            res.status(500);
            res.send(_context2.t0.message);

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[3, 12]]);
  }));

  return function createNewVehiculo(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.createNewVehiculo = createNewVehiculo;

var getVehiculoById = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var id, _pool3, result;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;
            _context3.prev = 1;
            _context3.next = 4;
            return (0, _database.getConnection)();

          case 4:
            _pool3 = _context3.sent;
            _context3.next = 7;
            return _pool3.request().input("Id", id).query(_database.queries.getVehiculoById);

          case 7:
            result = _context3.sent;
            res.send(result.recordset[0]);
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

  return function getVehiculoById(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getVehiculoById = getVehiculoById;

var deleteVehiculo = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var id, _pool4, result;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            _context4.prev = 1;
            _context4.next = 4;
            return (0, _database.getConnection)();

          case 4:
            _pool4 = _context4.sent;
            _context4.next = 7;
            return _pool4.request().input("Id", id).query(_database.queries.deleteVehiculo);

          case 7:
            result = _context4.sent;
            res.send(result);
            _context4.next = 15;
            break;

          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4["catch"](1);
            res.status(500);
            res.send(_context4.t0.message);

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 11]]);
  }));

  return function deleteVehiculo(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.deleteVehiculo = deleteVehiculo;

var updateVehiculo = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var id, _req$body2, placa, modelo, kinicial, kfinal, estado, ano, propio, combustible, pool;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            _req$body2 = req.body, placa = _req$body2.placa, modelo = _req$body2.modelo, kinicial = _req$body2.kinicial, kfinal = _req$body2.kfinal, estado = _req$body2.estado, ano = _req$body2.ano, propio = _req$body2.propio, combustible = _req$body2.combustible;

            if (!(placa == null || modelo == null || kinicial == null || kfinal == null || estado == null || ano == null || propio == null || combustible == null)) {
              _context5.next = 4;
              break;
            }

            return _context5.abrupt("return", res.status(400).json({
              msg: "Bad Request. Please Fill all fields"
            }));

          case 4:
            _context5.next = 6;
            return (0, _database.getConnection)();

          case 6:
            pool = _context5.sent;
            _context5.next = 9;
            return pool.request().input("placa", _database.sql.VarChar, placa).input("modelo", _database.sql.VarChar, modelo).input("kinicial", _database.sql.Decimal(28, 2), kinicial).input("kfinal", _database.sql.Decimal(28, 2), kfinal).input("estado", _database.sql.VarChar, estado).input("ano", _database.sql.VarChar, ano).input("propio", _database.sql.VarChar, propio).input("combustible", _database.sql.VarChar, combustible).input("Id", id).query(_database.queries.updateVehiculos);

          case 9:
            res.json({
              placa: placa,
              modelo: modelo
            });

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function updateVehiculo(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.updateVehiculo = updateVehiculo;