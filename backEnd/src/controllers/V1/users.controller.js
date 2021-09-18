import { pool } from "mssql";
import { getConnection, sql, queries } from "../../database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { response } from "express";

export const getUsers = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getAllUsers);
    res.json({
      success: true,
      message: "Datos del Usuario",
      datos: result.recordset,
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
export const createNewUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (name === null || email === null || password === null) {
    return res.status(400).json({ msg: "FALTA INGRESO DE DATOS" });
  }
  const hash = await bcrypt.hash(password, 15);
  try {
    const pool = await getConnection();
    const emailexist = await pool
      .request()
      .input("email", email.toLowerCase())
      .query(queries.login);
    if (emailexist.recordset[0]) {
      return res.json({
        success: false,
        message: "Correo Ya Existe",
      });
    } else {
      await pool
        .request()
        .input("name", sql.VarChar, name)
        .input("email", sql.VarChar, email.toLowerCase())
        .input("password", sql.VarChar, hash)
        .query(queries.createNewUser);
      res.json({ success: true, message: "Guardado Con exito" });
    }
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("email", email.toLowerCase())
      .query(queries.login);
    if (!result.recordset[0]) {
      throw { status: 500, code: 404, message: "Password invalido" };
      res.send({ mesaje: "Error en Correo" });
    }

    const isOk = await bcrypt.compare(password, result.recordset[0].password);
    if (!isOk) {
      throw { status: 500, code: 404, message: "Password invalido" };
      res.send({ mesaje: "Password Incorrecto" });
    }
    const expiresIn = 60 * 60;
    const token = jwt.sign(
      {
        userId: result.recordset[0].id,
        email: result.recordset[0].email,
        name: result.recordset[0].name,
        rol: result.recordset[0].Rol,
        active: result.recordset[0].active,
        idPreparador: result.recordset[0].idPreparador,
      },
      "hdusiwkowlppqndsuwjwiuueosnka",
      { expiresIn }
    );
    res.send({ token, expiresIn });
  } catch (error) {
    res.status(500);
    res.json({
      success: false,
      error: error.message,
    });
    //res.send(error.message);
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("Id", id)
      .query(queries.getUserById);
    res.send(result.recordset[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const { userId, email } = req.session;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("Id", id)
      .query(queries.deleteUser);
    res.send(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, rol, active, idPreparador } = req.body;
  const pool = await getConnection();
  await pool
    .request()
    .input("name", sql.VarChar, name)
    .input("rol", sql.VarChar, rol)
    .input("active", sql.VarChar, active)
    .input("idPreparador", sql.VarChar, idPreparador)
    .input("Id", id).query(`UPDATE DESPACHO.DBO.USERS 
    SET name=@name,
    rol=@rol,
    active=@active,
    idPreparador=@idPreparador WHERE id=@Id`);
  res.json({
    success: true,
    message: "Se Actualizo con exito",
  });
};
export const updatePassword = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  const hash = await bcrypt.hash(password, 15);
  const pool = await getConnection();
  await pool.request().input("hash", sql.VarChar, hash).input("Id", id)
    .query(`UPDATE DESPACHO.DBO.USERS
     SET password=@hash
    WHERE id=@Id`);
  res.json({
    success: true,
    message: "Se Actualizo con exito",
  });
};
