"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateMotorista = exports.deleteMotorista = exports.getMotoristaById = exports.createNewMotorista = exports.getMotoristas = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mssql = require("mssql");

var _database = require("../../database");

var getMotoristas = /*#__PURE__*/function () {
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
            return _pool.request().query(_database.queries.getAllMotorista);

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

  return function getMotoristas(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getMotoristas = getMotoristas;

var createNewMotorista = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body, dui, nombre, licencia, tipo_lic, estado, _pool2;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, dui = _req$body.dui, nombre = _req$body.nombre, licencia = _req$body.licencia, tipo_lic = _req$body.tipo_lic, estado = _req$body.estado;

            if (!(dui == null || nombre == null || licencia == null || tipo_lic == null || estado == null)) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              msg: "Bad Request. Please Fill all fields"
            }));

          case 3:
            _context2.prev = 3;
            _context2.next = 6;
            return (0, _database.getConnection)();

          case 6:
            _pool2 = _context2.sent;
            _context2.next = 9;
            return _pool2.request().input("dui", _database.sql.VarChar, dui).input("nombre", _database.sql.VarChar, nombre).input("licencia", _database.sql.VarChar, licencia).input("tipo_lic", _database.sql.VarChar, tipo_lic).input("estado", _database.sql.VarChar, estado).query(_database.queries.createNewMotorista);

          case 9:
            res.json({
              dui: dui,
              nombre: nombre,
              licencia: licencia
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

  return function createNewMotorista(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.createNewMotorista = createNewMotorista;

var getMotoristaById = /*#__PURE__*/function () {
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
            return _pool3.request().input("Id", id).query(_database.queries.getMotoristaById);

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

  return function getMotoristaById(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getMotoristaById = getMotoristaById;

var deleteMotorista = /*#__PURE__*/function () {
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
            return _pool4.request().input("Id", id).query(_database.queries.deleteMotorista);

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

  return function deleteMotorista(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.deleteMotorista = deleteMotorista;

var updateMotorista = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var id, _req$body2, dui, nombre, licencia, tipo_lic, estado, pool;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            _req$body2 = req.body, dui = _req$body2.dui, nombre = _req$body2.nombre, licencia = _req$body2.licencia, tipo_lic = _req$body2.tipo_lic, estado = _req$body2.estado;

            if (!(dui == null || nombre == null || licencia == null || tipo_lic == null || estado == null)) {
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
            return pool.request().input("dui", _database.sql.VarChar, dui).input("nombre", _database.sql.VarChar, nombre).input("licencia", _database.sql.VarChar, licencia).input("tipo_lic", _database.sql.VarChar, tipo_lic).input("estado", _database.sql.VarChar, estado).input("Id", id).query(_database.queries.updateMotorista);

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

  return function updateMotorista(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.updateMotorista = updateMotorista;