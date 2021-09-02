"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _users = require("../../controllers/V1/users.controller");

var _authMiddleware = require("../../Middlewares/auth-middleware");

var _validatorMiddleware = require("../../Middlewares/validator-middleware");

var _users2 = require("../../validators/v1/users.validator");

var router = (0, _express.Router)();
router.post("/api/v1/login", _users.login);
router.post("/api/v1/users", _users.createNewUser);
router.get("/api/v1/users", _users.getUsers);
router.get("/api/v1/users/:id", _users.getUserById);
router["delete"]("/api/v1/users/:id", _authMiddleware.checkAuth, _users.deleteUser);
router.put("/api/v1/users/:id", _authMiddleware.checkAuth, _users.updateUser);
var _default = router;
exports["default"] = _default;