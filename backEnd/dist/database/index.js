"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "getConnection", {
  enumerable: true,
  get: function get() {
    return _conection.getConnection;
  }
});
Object.defineProperty(exports, "sql", {
  enumerable: true,
  get: function get() {
    return _conection.sql;
  }
});
Object.defineProperty(exports, "queries", {
  enumerable: true,
  get: function get() {
    return _querys.queries;
  }
});
Object.defineProperty(exports, "queriesTicket", {
  enumerable: true,
  get: function get() {
    return _tickets.queriesTicket;
  }
});
Object.defineProperty(exports, "queriesPedidos", {
  enumerable: true,
  get: function get() {
    return _pedidos.queriesPedidos;
  }
});

var _conection = require("./conection");

var _querys = require("./V1/querys");

var _tickets = require("./V1/tickets.querys");

var _pedidos = require("./V1/pedidos.querys");