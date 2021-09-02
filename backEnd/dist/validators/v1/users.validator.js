"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateNewUserBody = void 0;

var _expressValidator = require("express-validator");

var validateNewUserBody = (0, _expressValidator.checkSchema)({
  name: {
    isString: true,
    rtrim: {
      options: ""
    },
    isLength: {
      options: {
        min: 2
      }
    },
    errorMessage: "No se Permite espacios en Blanco"
  },
  email: {
    isEmail: true,
    rtrim: {
      opacity: ""
    },
    isLength: {
      options: {
        min: 4
      }
    },
    errorMessage: "Formato de Correo invalido"
  }
});
exports.validateNewUserBody = validateNewUserBody;