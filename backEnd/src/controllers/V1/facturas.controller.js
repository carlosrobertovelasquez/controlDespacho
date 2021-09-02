import { pool } from "mssql";
import { getConnection, sql, queriesFacturas } from "../../database";

export const getFacturasDespacho = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .query(queriesFacturas.getQFacturasDespacho);
    // res.json(result.recordset);
    res.json({
      success: true,
      message: "Cargado Con Exito",
      datos: result.recordset,
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getFacturaById = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .query(queriesFacturas.getQFacturasDespacho);
    // res.json(result.recordset);
    res.json({
      success: true,
      message: "Cargado Con Exito",
      datos: result.recordset,
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
export const getFacturaLineasById = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .query(queriesFacturas.getQFacturasDespacho);
    // res.json(result.recordset);
    res.json({
      success: true,
      message: "Cargado Con Exito",
      datos: result.recordset,
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
