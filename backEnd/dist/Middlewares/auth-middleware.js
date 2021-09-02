"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkAuth = void 0;

var _express = require("express");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var checkAuth = function checkAuth() {
  var req = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _express.Request;
  var res = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _express.Response;
  var next = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _express.NextFunction;

  try {
    var token = req.headers.token;

    if (!token) {
      throw new Error("missing header token");
    }

    var payload = _jsonwebtoken["default"].verify(token, "hdusiwkowlppqndsuwjwiuueosnka");

    req.session = {
      userId: payload.userId,
      email: payload.email
    };
    next();
  } catch (error) {
    res.status(401).send(error.message);
  }
};

exports.checkAuth = checkAuth;