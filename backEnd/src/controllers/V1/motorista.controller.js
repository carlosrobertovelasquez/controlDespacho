import { pool } from "mssql";
import { getConnection, sql, queries, queriesMotoristas } from "../../database";

export const getMotoristas = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .query(queriesMotoristas.getAllMotorista);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
export const createNewMotorista = async (req, res) => {
  const { dui, nombre, licencia, tipo_lic, estado } = req.body;
  if (
    dui == null ||
    nombre == null ||
    licencia == null ||
    tipo_lic == null ||
    estado == null
  ) {
    return res.status(400).json({ msg: "Bad Request. Please Fill all fields" });
  }
  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("dui", sql.VarChar, dui)
      .input("nombre", sql.VarChar, nombre)
      .input("licencia", sql.VarChar, licencia)
      .input("tipo_lic", sql.VarChar, tipo_lic)
      .input("estado", sql.VarChar, estado)
      .query(queriesMotoristas.createMotorista);
    res.json({ dui, nombre, licencia });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getMotoristaById = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("Id", id)
      .query(queriesMotoristas.getMotoristaById);
    res.send(result.recordset[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const deleteMotorista = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("Id", id)
      .query(
        `select * from despacho.dbo.motoristas 
        where id in (select motorista_id from Despacho.dbo.fletes where motorista_id=@Id)  `
      );
    if (result.recordset[0]) {
      return res.json({
        success: false,
        message: "El Transportista No se puede Elinimar Tiene asignado Fletes",
      });
    } else {
      await pool
        .request()
        .input("Id", sql.VarChar, id)
        .query(queriesMotoristas.deleteMotorista);
      res.json({ success: true, message: "Se Elimino con Exito" });
    }
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const updateMotorista = async (req, res) => {
  const { id } = req.params;
  const { dui, nombre, licencia, tipo_lic, estado } = req.body;
  if (
    dui == null ||
    nombre == null ||
    licencia == null ||
    tipo_lic == null ||
    estado == null
  ) {
    return res.status(400).json({ msg: "Bad Request. Please Fill all fields" });
  }

  const pool = await getConnection();

  await pool
    .request()
    .input("dui", sql.VarChar, dui)
    .input("nombre", sql.VarChar, nombre)
    .input("licencia", sql.VarChar, licencia)
    .input("tipo_lic", sql.VarChar, tipo_lic)
    .input("estado", sql.VarChar, estado)
    .input("Id", id)
    .query(queriesMotoristas.updateMotorista);
  res.json({ placa, modelo });
};
