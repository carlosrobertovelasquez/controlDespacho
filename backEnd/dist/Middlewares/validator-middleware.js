"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleRequestErrors = void 0;

var _express = require("express");

var _expressValidator = require("express-validator");

var handleRequestErrors = function handleRequestErrors() {
  var req = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _express.Request;
  var res = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _express.Response;
  var next = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _express.NextFunction;
  var errors = (0, _expressValidator.validationResult)(req);

  if (errors.isEmpty()) {
    next();
  } else {
    res.status(400).send(errors.array());
  }
};

exports.handleRequestErrors = handleRequestErrors;