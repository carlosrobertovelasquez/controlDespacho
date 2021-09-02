import { pool } from "mssql";
import { getConnection, sql, queries, queriesPedidos } from "../../database";

export const TcargaPedidos = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.CargaPedidos);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
export const getPedidoById = async (req, res) => {
  const { pedido } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("Pedido", pedido)
      .query(queries.getPedidoByid);
    res.send(result.recordset[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getPedidoDetalleById = async (req, res) => {
  const { pedido } = req.params;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("Pedido", sql.VarChar, pedido)
      .query(queriesPedidos.getPedidoDetalleById);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
    console.log(error.message);
  }
};
export const getPedidoAutorizacion = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .query(queriesPedidos.getQPedidosAutorizacion);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const updateEstadoPedido = async (req, res) => {
  const { pedido } = req.params;
  const { estado } = req.body;
  const pool = await getConnection();
  if (estado === "N") {
    await pool
      .request()
      .input("estado", sql.VarChar, "A")
      .input("pedido", pedido)
      .query(queriesPedidos.getQCambioEstadoPedido);
    res.json({ estado });
  }
  if (estado === "A") {
    await pool
      .request()
      .input("estado", sql.VarChar, "N")
      .input("pedido", pedido)
      .query(queriesPedidos.getQCambioEstadoPedido);
    res.json({ estado });
  }
};
