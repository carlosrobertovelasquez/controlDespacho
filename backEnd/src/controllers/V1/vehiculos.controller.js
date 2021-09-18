import { pool } from "mssql";
import { getConnection, sql, queriesVehiculos } from "../../database";

export const getVehiculo = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queriesVehiculos.getAllVehiculo);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
export const createNewVehiculo = async (req, res) => {
  const { placa, modelo, kinicial, kfinal, estado, ano, propio, combustible } =
    req.body;
  if (
    placa == null ||
    modelo == null ||
    kinicial == null ||
    kfinal == null ||
    estado == null ||
    ano == null ||
    propio == null ||
    combustible == null
  ) {
    return res
      .status(400)
      .json({ msg: "No tiene todos los Campos Solicitados" });
  }
  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("placa", sql.VarChar, placa)
      .input("modelo", sql.VarChar, modelo)
      .input("kinicial", sql.Decimal(28, 2), kinicial)
      .input("kfinal", sql.Decimal(28, 2), kfinal)
      .input("estado", sql.VarChar, estado)
      .input("ano", sql.VarChar, ano)
      .input("propio", sql.VarChar, propio)
      .input("combustible", sql.VarChar, combustible)
      .query(queriesVehiculos.createNewVehiculos);
    res.json({ placa, modelo });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getVehiculoById = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("Id", id)
      .query(queriesVehiculos.getVehiculoById);
    res.send(result.recordset[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const deleteVehiculo = async (req, res) => {
  const { id } = req.params;
  //Validamos si esta relacionado en un flete
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("Id", id)
      .query(
        `select * from despacho.dbo.vehiculos where id in (select vehiculo_id from Despacho.dbo.fletes where vehiculo_id=@Id) `
      );
    if (result.recordset[0]) {
      return res.json({
        success: false,
        message: "El Vehiculo No se puede Elinimar Tiene asignado Fletes",
      });
    } else {
      await pool
        .request()
        .input("Id", sql.VarChar, id)
        .query(queriesVehiculos.deleteVehiculo);
      res.json({ success: true, message: "Se Elimino con Exito" });
    }
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const updateVehiculo = async (req, res) => {
  const { id } = req.params;
  const { placa, modelo, kinicial, kfinal, estado, ano, propio, combustible } =
    req.body;
  if (
    placa == null ||
    modelo == null ||
    kinicial == null ||
    kfinal == null ||
    estado == null ||
    ano == null ||
    propio == null ||
    combustible == null
  ) {
    return res.status(400).json({ msg: "Bad Request. Please Fill all fields" });
  }

  const pool = await getConnection();

  await pool
    .request()
    .input("placa", sql.VarChar, placa)
    .input("modelo", sql.VarChar, modelo)
    .input("kinicial", sql.Decimal(28, 2), kinicial)
    .input("kfinal", sql.Decimal(28, 2), kfinal)
    .input("estado", sql.VarChar, estado)
    .input("ano", sql.VarChar, ano)
    .input("propio", sql.VarChar, propio)
    .input("combustible", sql.VarChar, combustible)
    .input("Id", id)
    .query(queriesVehiculos.updateVehiculos);
  res.json({ placa, modelo });
};
