"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queries = void 0;
var queries = {
  getAllUser: "SELECT * FROM Despacho.dbo.users",
  createNewUser: "INSERT INTO Despacho.dbo.users (name,email,password) values(@name,@email,@password)",
  getUserById: "SELECT * FROM DESPACHO.DBO.USER WHERE id=@Id ",
  deleteUser: "DELETE DESPACHO.DBO.USERS WHERE ID=@Id",
  updateUser: "UPDATE DESPACHO.DBO.USERS SET name=@name,email=@email,password=@password WHERE id=@Id"
};
exports.queries = queries;