import { response } from "express";
import { pool } from "mssql";
import { getConnection, sql, queries } from "../../database";

export const getAyudantes = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getAllAyudantes);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
export const getAyudantesActivos = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getAllAyudantesActive);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
export const createNewAyudante = async (req, res) => {
  const { datos } = req.body;
  if (datos.dui == null || datos.codEmpleado == null || datos.nombre == null) {
    //return res.status(400).json({ msg: "Todos los Registro son Obligatorios" });
    return res.json({
      success: false,
      message: "Todos los Campos son Obligatorios",
    });
  }
  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("dui", sql.VarChar, datos.dui)
      .input("codEmpleado", sql.VarChar, datos.codEmpleado)
      .input("nombre", sql.VarChar, datos.nombre.toUpperCase())
      .input("estado", sql.VarChar, "A")
      .query(
        "INSERT INTO DESPACHO.DBO.AYUDANTES(dui,cod_empleado,nombre,estado) VALUES(@dui,@codEmpleado,@nombre,@estado)"
      );
    res.json({ success: true, message: "Guardado Con exito" });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getAyudanteById = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("Id", id)
      .query(queries.getAyudanteById);
    res.send(result.recordset[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const deleteAyudante = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("Id", id)
      .query(queries.deleteAyudantes);
    res.send(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const updateAyudante = async (req, res) => {
  const { id } = req.params;
  const { dui, cod_empleado, nombre, estado } = req.body;
  if (dui == null || cod_empleado == null || nombre == null || estado == null) {
    return res.status(400).json({ msg: "Bad Request. Please Fill all fields" });
  }

  const pool = await getConnection();

  await pool
    .request()
    .input("dui", sql.VarChar, dui)
    .input("cod_empleado", sql.VarChar, cod_empleado)
    .input("nombre", sql.VarChar, nombre)
    .input("estado", sql.VarChar, estado)
    .input("Id", id)
    .query(queries.updateAyudantes);
  res.json({ placa, modelo });
};
