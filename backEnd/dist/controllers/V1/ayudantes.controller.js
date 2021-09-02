"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateAyudante = exports.deleteAyudante = exports.getAyudanteById = exports.createNewAyudante = exports.getAyudantesActivos = exports.getAyudantes = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = require("express");

var _mssql = require("mssql");

var _database = require("../../database");

var getAyudantes = /*#__PURE__*/function () {
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
            return _pool.request().query(_database.queries.getAllAyudantes);

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

  return function getAyudantes(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getAyudantes = getAyudantes;

var getAyudantesActivos = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _pool2, result;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return (0, _database.getConnection)();

          case 3:
            _pool2 = _context2.sent;
            _context2.next = 6;
            return _pool2.request().query(_database.queries.getAllAyudantesActive);

          case 6:
            result = _context2.sent;
            res.json(result.recordset);
            _context2.next = 14;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](0);
            res.status(500);
            res.send(_context2.t0.message);

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 10]]);
  }));

  return function getAyudantesActivos(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getAyudantesActivos = getAyudantesActivos;

var createNewAyudante = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var datos, _pool3;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            datos = req.body.datos;

            if (!(datos.dui == null || datos.codEmpleado == null || datos.nombre == null)) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt("return", res.json({
              success: false,
              message: "Todos los Campos son Obligatorios"
            }));

          case 3:
            _context3.prev = 3;
            _context3.next = 6;
            return (0, _database.getConnection)();

          case 6:
            _pool3 = _context3.sent;
            _context3.next = 9;
            return _pool3.request().input("dui", _database.sql.VarChar, datos.dui).input("codEmpleado", _database.sql.VarChar, datos.codEmpleado).input("nombre", _database.sql.VarChar, datos.nombre.toUpperCase()).input("estado", _database.sql.VarChar, "A").query("INSERT INTO DESPACHO.DBO.AYUDANTES(dui,cod_empleado,nombre,estado) VALUES(@dui,@codEmpleado,@nombre,@estado)");

          case 9:
            res.json({
              success: true,
              message: "Guardado Con exito"
            });
            _context3.next = 16;
            break;

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](3);
            res.status(500);
            res.send(_context3.t0.message);

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[3, 12]]);
  }));

  return function createNewAyudante(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.createNewAyudante = createNewAyudante;

var getAyudanteById = /*#__PURE__*/function () {
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
            return _pool4.request().input("Id", id).query(_database.queries.getAyudanteById);

          case 7:
            result = _context4.sent;
            res.send(result.recordset[0]);
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

  return function getAyudanteById(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getAyudanteById = getAyudanteById;

var deleteAyudante = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var id, _pool5, result;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            _context5.prev = 1;
            _context5.next = 4;
            return (0, _database.getConnection)();

          case 4:
            _pool5 = _context5.sent;
            _context5.next = 7;
            return _pool5.request().input("Id", id).query(_database.queries.deleteAyudantes);

          case 7:
            result = _context5.sent;
            res.send(result);
            _context5.next = 15;
            break;

          case 11:
            _context5.prev = 11;
            _context5.t0 = _context5["catch"](1);
            res.status(500);
            res.send(_context5.t0.message);

          case 15:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 11]]);
  }));

  return function deleteAyudante(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deleteAyudante = deleteAyudante;

var updateAyudante = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var id, _req$body, dui, cod_empleado, nombre, estado, pool;

    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            id = req.params.id;
            _req$body = req.body, dui = _req$body.dui, cod_empleado = _req$body.cod_empleado, nombre = _req$body.nombre, estado = _req$body.estado;

            if (!(dui == null || cod_empleado == null || nombre == null || estado == null)) {
              _context6.next = 4;
              break;
            }

            return _context6.abrupt("return", res.status(400).json({
              msg: "Bad Request. Please Fill all fields"
            }));

          case 4:
            _context6.next = 6;
            return (0, _database.getConnection)();

          case 6:
            pool = _context6.sent;
            _context6.next = 9;
            return pool.request().input("dui", _database.sql.VarChar, dui).input("cod_empleado", _database.sql.VarChar, cod_empleado).input("nombre", _database.sql.VarChar, nombre).input("estado", _database.sql.VarChar, estado).input("Id", id).query(_database.queries.updateAyudantes);

          case 9:
            res.json({
              placa: placa,
              modelo: modelo
            });

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function updateAyudante(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.updateAyudante = updateAyudante;