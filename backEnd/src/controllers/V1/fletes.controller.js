import { pool } from "mssql";
import { getConnection, sql, queriesFletes } from "../../database";
import dateTime from "node-datetime";
import Moment from "moment";

export const getMaxFlete = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queriesFletes.getMaxFlete);
    res.send(result.recordset[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const createFlete = async (req, res) => {
  const {
    motorista,
    cantFacturas,
    usuarioCreacion,
    vehiculo,
    kinicial,
    kfinal,
  } = req.body;
  if (
    motorista == "ND" ||
    cantFacturas == null ||
    usuarioCreacion == null ||
    vehiculo == null
  ) {
    return res.status(400).json({ msg: "FALTA INGRESO DE DATOS" });
  }

  var fechahoy = new Date();
  const pool = await getConnection();
  //Consultamos correlativo de ticket
  const result = await pool
    .request()
    .query(`select max(flete) as maximo from despacho.dbo.fletes`);

  const corre = result.recordset[0];
  const correlativo = corre.maximo;
  const correl = correlativo + 1;

  try {
    await pool
      .request()
      .input("Nflete", sql.Int, correl)
      .input("idVehiculo", sql.VarChar, vehiculo)
      .input("idMotorista", sql.VarChar, motorista)
      .input("numeroFacturas", sql.Decimal(28, 0), parseInt(cantFacturas))
      .input("fecha", sql.DateTime, fechahoy)
      .input("estado", sql.VarChar, "01")
      .input("kinicial", sql.Decimal(28, 0), parseInt(kfinal))
      .input("kfinal", sql.Decimal(28, 0), parseInt(kfinal))
      .input("usuarioCreacion", sql.VarChar, usuarioCreacion)
      .input("createdAt", sql.DateTime, fechahoy)
      .query(queriesFletes.crearFlete);
    res.json({
      success: true,
      message: "Cargado Con Exito",
      datos: correl,
    });
    //Actualizamos el kilometraje de os vehiuclos
    await pool
      .request()
      .query(
        `update despacho.dbo.vehiculos set kinicial=${parseInt(
          kinicial
        )},kfinal=${parseInt(kfinal)} where id=${parseInt(vehiculo)}`
      );
  } catch (error) {
    res.status(500);
    res.send(error.message);
    console.log(error.message);
  }
};
export const createFleteFacturas = async (req, res) => {
  const { flete, facturas } = req.body;
  const pool = await getConnection();
  //Consultamos Pedido Encabezado

  var fechahoy = new Date();
  for (let i = 0; i < facturas.length; i++) {
    const element = facturas[i];
    const totalGeneral =
      parseInt(element.total_factura) + parseInt(totalGeneral);
    try {
      const result = await pool
        .request()
        .input("flete", sql.Int, flete)
        .input("fleteId", sql.VarChar, flete)
        .input("factura", sql.VarChar, element.factura)
        .input("fecha", sql.DateTime, element.fecha)
        .input("cliente", sql.VarChar, element.cliente_origen)
        .input("nombre", sql.VarChar, element.NOMBRE)
        .input("total", sql.Decimal(28, 8), element.total_factura)
        .input("condicionPago", sql.VarChar, element.condicion_pago)
        .input("estado", sql.VarChar, "P")
        .input("createdAt", sql.DateTime, fechahoy)
        .query(queriesFletes.createFleteFacturas);
      // const dato = result.recordset[0];
    } catch (error) {
      res.status(500);
      res.send(error.message);
      console.log(error.message);
    }
  }
  //Traermos el total de montos de cada factura
  const total = await pool
    .request()
    .query(
      `select sum(total) as total from despacho.dbo.fleteitems where flete=${flete}`
    );
  //Actualizamos montoTotal en la tabla de flete
  await pool
    .request()
    .query(
      `update despacho.dbo.fletes set montototal=${total.recordset[0].total} where flete=${flete}`
    );
};

export const encabezadoFlete = async (req, res) => {
  const { flete } = req.params;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("flete", sql.Int, parseInt(flete))
      .query(queriesFletes.encabezadoFlete);
    res.json({
      success: true,
      message: "Encabezado de Flete",
      datos: result.recordset[0],
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
export const detalleFlete = async (req, res) => {
  const { flete } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("flete", sql.Int, parseInt(flete))
      .query(queriesFletes.detalleFlete);
    res.json({
      success: true,
      message: "Detalle de Flete",
      datos: result.recordset,
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getAllFletes = async (req, res) => {
  const { flete } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queriesFletes.getAllflete);
    res.json({
      success: true,
      message: "Todos los Fletes",
      datos: result.recordset,
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
export const getTodosFletes = async (req, res) => {
  const { flete } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queriesFletes.getTodosfletes);
    res.json({
      success: true,
      message: "Todos los Fletes",
      datos: result.recordset,
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
export const cambioEstado = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;
  const pool = await getConnection();
  var fechahoy = new Date();
  //const fechahoy = new Date().toTimeString("en-US", {
  //  timeZone: "America/Guatemala",
  //});

  const date = new Date();
  const d = Moment(date).format();

  try {
    if (estado === "02") {
      await pool
        .request()
        .input("estado", sql.VarChar, estado)
        .input("fechahoy", sql.DateTime, d)
        .input("Id", sql.Int, id)
        .query(
          "update despacho.dbo.fletes set estado=@estado,fechahorasalida=@fechahoy where flete=@Id"
        );

      res.json({ estado });
    }
    if (estado === "03") {
      await pool
        .request()
        .input("estado", sql.VarChar, estado)
        .input("fechahoy", sql.DateTime, d)
        .input("Id", sql.Int, id)
        .query(
          "update despacho.dbo.fletes set estado=@estado,fechahorallegada=@fechahoy where flete=@Id"
        );
      res.json({ estado });
    }
    if (estado === "04") {
      await pool
        .request()
        .input("estado", sql.VarChar, estado)
        .input("fechahoy", sql.DateTime, d)
        .input("Id", sql.Int, id)
        .query(
          "update despacho.dbo.fletes set estado=@estado,updated_at=@fechahoy where flete=@Id"
        );
      res.json({ estado });
    }
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const updateLiquidacionFlete = async (req, res) => {
  const { dato, flete, factura, name, placa } = req.body;

  const hoy = new Date();
  for (let i = 0; i < dato.length; i++) {
    const element = dato[i];
    try {
      const pool = await getConnection();
      const result = await pool
        .request()
        .input("estado", sql.VarChar, element.estado)
        .input("operaciones", sql.VarChar, element.operacion)
        .input("observaciones", sql.VarChar, element.observacion)
        .input("fechaliquidacion", sql.DateTime, hoy)
        .input("usuarioliquidacion", sql.VarChar, name)
        .input("flete", sql.Int, flete)
        .input("factura", sql.VarChar, factura)
        .query(`update Despacho.dbo.fleteitems 
        set estado=@estado,operaciones=@operaciones,observaciones=@observaciones ,
        fechaliquidacion=@fechaliquidacion,usuarioliquidacion=@usuarioliquidacion 
        where flete=@flete and factura=@factura`);
      const resulPedidoLinea = await pool
        .request()
        .input("flete", sql.VarChar, flete)
        .input("estado", sql.VarChar, "L")
        .query(
          "select count(flete) as total from despacho.dbo.fleteitems where flete=@flete and estado<>@estado and reasignada=0"
        );
      //Con esta consuta vemos si existe aun factura con estado diferente de Liqudiado
      const existe = resulPedidoLinea.recordset[0].total;
      if (existe === 0) {
        const fleteActualizado = await pool
          .request()
          .input("flete", sql.VarChar, flete)
          .input("estado", sql.VarChar, "05")
          .input("kfinal", sql.Int, element.kfinal)
          .query(
            "update despacho.dbo.fletes set estado=@estado,kfinal=@kfinal where flete=@flete "
          );
        //Actualizamos Kilometraje de vehiculo
        const Vehiculo = await pool
          .request()
          .input("placa", sql.VarChar, placa)
          .input("kfinal", sql.Int, element.kfinal)
          .query(
            "update despacho.dbo.vehiculos set kfinal=@kfinal where placa=@placa "
          );
      }

      res.json({
        success: true,
        message: "Se actualizo con existo",
        datos: result.recordset,
      });
    } catch (error) {
      res.status(500);
      res.send(error.message);
      console.log(error.message);
    }
  }
};

export const getOperacionesAll = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .query(queriesFletes.getObservacionesAll);
    res.json({
      success: true,
      message: "Se actualizo con existo",
      datos: result.recordset,
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
export const reasignarFlete = async (req, res) => {
  const { fleteOld, factura, fleteNew } = req.body;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("flete", sql.Int, fleteOld)
      .input("factura", sql.VarChar, factura)
      .query(
        "select * from despacho.dbo.fleteitems where flete_id=@flete and factura=@factura"
      );

    // res.json({
    //   success: true,
    //   message: "Se actualizo con existo",
    //   datos: result.recordset,
    // });
    const datos = result.recordset[0];
    //insertamos en la tabla de iten los nuevos productos
    const result2 = await pool
      .request()
      .input("flete", sql.Int, fleteNew)
      .input("factura", sql.VarChar, factura)
      .input("fecha", sql.DateTime, datos.fecha)
      .input("cliente", sql.VarChar, datos.cliente)
      .input("nombre", sql.VarChar, datos.nombre)
      .input("total", sql.Decimal(18, 2), datos.total)
      .input("condicionpago", sql.VarChar, datos.condicionpago)
      .input("estado", sql.VarChar, datos.estado)
      .input("created_at", sql.DateTime, datos.created_at)
      .query(
        `insert into despacho.dbo.fleteitems 
           (flete,flete_id,factura,fecha,cliente,nombre,total,condicionpago,estado,created_at)
     values(@flete,@flete,@factura,@fecha,@cliente,@nombre,@total,@condicionpago,@estado,@created_at) `
      );
    await pool
      .request()
      .input("flete", sql.Int, fleteOld)
      .input("factura", sql.VarChar, factura)
      .query(
        `update despacho.dbo.fleteitems set reasignada=1 where flete_id=@flete and factura=@factura`
      );
    const result3 = await pool
      .request()
      .input("flete", sql.Int, fleteOld)
      .input("factura", sql.VarChar, factura)
      .query(
        `select sum(total) as total ,COUNT(factura) as numerofac from Despacho.dbo.fleteitems 
        where flete_id=@flete and reasignada=0`
      );
    const datosOld = result3.recordset[0];

    await pool
      .request()
      .input("flete", sql.Int, fleteOld)
      .input("montototal", sql.Decimal(18, 2), datosOld.total)
      .input("numerofacturas", sql.Decimal(18, 2), datosOld.numerofac)
      .query(
        `update despacho.dbo.fletes set montototal=@montototal,numerofacturas=@numerofacturas 
        where flete=@flete`
      );
    const result4 = await pool
      .request()
      .input("flete", sql.Int, fleteNew)
      .input("factura", sql.VarChar, factura)
      .query(
        `select sum(total) as total ,COUNT(factura) as numerofac from Despacho.dbo.fleteitems 
        where flete_id=@flete and reasignada=0`
      );
    const datosNew = result4.recordset[0];
    await pool
      .request()
      .input("flete", sql.Int, fleteNew)
      .input("montototal", sql.Decimal(18, 2), datosNew.total)
      .input("numerofacturas", sql.Decimal(18, 2), datosNew.numerofac)
      .query(
        `update despacho.dbo.fletes set montototal=@montototal,numerofacturas=@numerofacturas 
        where flete=@flete`
      );

    res.json({
      success: true,
      message: "Se actualizo con existo",
      datos: result.recordset,
    });

    //
  } catch (error) {
    res.status(500);
    res.send(error.message);
    console.log(error.message);
  }
};
