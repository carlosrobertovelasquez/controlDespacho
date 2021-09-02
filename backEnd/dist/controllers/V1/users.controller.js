"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUser = exports.deleteUser = exports.getUserById = exports.login = exports.createNewUser = exports.getUsers = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mssql = require("mssql");

var _database = require("../../database");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var getUsers = /*#__PURE__*/function () {
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
            return _pool.request().query(_database.queries.getAllUser);

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

  return function getUsers(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getUsers = getUsers;

var createNewUser = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body, name, email, password, hash, _pool2, emailexist;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password;

            if (!(name == null || email == null || password == null)) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              msg: "FALTA INGRESO DE DATOS"
            }));

          case 3:
            _context2.next = 5;
            return _bcrypt["default"].hash(password, 15);

          case 5:
            hash = _context2.sent;
            _context2.prev = 6;
            _context2.next = 9;
            return (0, _database.getConnection)();

          case 9:
            _pool2 = _context2.sent;
            _context2.next = 12;
            return _pool2.request().input("email", email.toLowerCase()).query(_database.queries.login);

          case 12:
            emailexist = _context2.sent;

            if (!emailexist.recordset[0]) {
              _context2.next = 17;
              break;
            }

            return _context2.abrupt("return", res.json({
              success: false,
              message: "Correo Ya Existe"
            }));

          case 17:
            _context2.next = 19;
            return _pool2.request().input("name", _database.sql.VarChar, name).input("email", _database.sql.VarChar, email.toLowerCase()).input("password", _database.sql.VarChar, hash).query(_database.queries.createNewUser);

          case 19:
            res.json({
              success: true,
              message: "Guardado Con exito"
            });

          case 20:
            _context2.next = 26;
            break;

          case 22:
            _context2.prev = 22;
            _context2.t0 = _context2["catch"](6);
            res.status(500);
            res.send(_context2.t0.message);

          case 26:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[6, 22]]);
  }));

  return function createNewUser(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.createNewUser = createNewUser;

var login = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$body2, email, password, _pool3, result, isOk, expiresIn, token;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
            _context3.prev = 1;
            _context3.next = 4;
            return (0, _database.getConnection)();

          case 4:
            _pool3 = _context3.sent;
            _context3.next = 7;
            return _pool3.request().input("email", email.toLowerCase()).query(_database.queries.login);

          case 7:
            result = _context3.sent;

            if (result.recordset[0]) {
              _context3.next = 10;
              break;
            }

            throw {
              code: 404,
              message: "Correo no Existe"
            };

          case 10:
            _context3.next = 12;
            return _bcrypt["default"].compare(password, result.recordset[0].password);

          case 12:
            isOk = _context3.sent;

            if (isOk) {
              _context3.next = 15;
              break;
            }

            throw {
              code: 404,
              message: "Password invalido"
            };

          case 15:
            expiresIn = 60 * 60;
            token = _jsonwebtoken["default"].sign({
              userId: result.recordset[0].id,
              email: result.recordset[0].email,
              name: result.recordset[0].name
            }, "hdusiwkowlppqndsuwjwiuueosnka", {
              expiresIn: expiresIn
            });
            res.send({
              token: token,
              expiresIn: expiresIn
            });
            _context3.next = 23;
            break;

          case 20:
            _context3.prev = 20;
            _context3.t0 = _context3["catch"](1);
            // res.status(500);
            res.send(_context3.t0.message);

          case 23:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 20]]);
  }));

  return function login(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.login = login;

var getUserById = /*#__PURE__*/function () {
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
            return _pool4.request().input("Id", id).query(_database.queries.getUserById);

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

  return function getUserById(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getUserById = getUserById;

var deleteUser = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var id, _req$session, userId, email, _pool5, result;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            _req$session = req.session, userId = _req$session.userId, email = _req$session.email;
            _context5.prev = 2;
            _context5.next = 5;
            return (0, _database.getConnection)();

          case 5:
            _pool5 = _context5.sent;
            _context5.next = 8;
            return _pool5.request().input("Id", id).query(_database.queries.deleteUser);

          case 8:
            result = _context5.sent;
            res.send(result);
            _context5.next = 16;
            break;

          case 12:
            _context5.prev = 12;
            _context5.t0 = _context5["catch"](2);
            res.status(500);
            res.send(_context5.t0.message);

          case 16:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[2, 12]]);
  }));

  return function deleteUser(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deleteUser = deleteUser;

var updateUser = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var id, _req$body3, name, email, password, pool;

    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            id = req.params.id;
            _req$body3 = req.body, name = _req$body3.name, email = _req$body3.email, password = _req$body3.password;

            if (!(name == null || email == null || password == null)) {
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
            return pool.request().input("name", _database.sql.VarChar, name).input("email", _database.sql.VarChar, email).input("password", _database.sql.VarChar, password).input("Id", id).query(_database.queries.updateUser);

          case 9:
            res.json({
              name: name,
              email: email
            });

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function updateUser(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.updateUser = updateUser;