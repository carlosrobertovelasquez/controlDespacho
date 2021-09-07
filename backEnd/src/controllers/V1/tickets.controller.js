import { pool } from "mssql";
import { getConnection, sql, queries, queriesTicket } from "../../database";
import dateTime from "node-datetime";
import Moment from "moment";
import Global from "../../../Global";
export const getTicketAll = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .query(
        `select ti.ticket,ti.estado,ti.fecha_inicio,ti.ubicacion,ti.preparador,ayu.nombre,ti.cant_pedido from despacho.dbo.tickets ti,despacho.dbo.ayudantes ayu where ti.preparador=ayu.id and ti.estado in ('01','02','03')`
      );
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
export const getTicketTodos = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(
      `  select estado=CASE ti.estado when '01' then 'IR A PREPARAR' when '02' then 'PREPARANDO' when '03' then 'REVISADO'when '04' then 'CERRADO' END ,ti.estado,ti.ticket,ti.fecha_inicio,fecha_inicio_preparacion,fecha_fin_preparacion,fecha_fin_preparacion,
        ti.ubicacion,ti.preparador,ayu.nombre,ti.cant_pedido 
        from despacho.dbo.tickets ti,despacho.dbo.ayudantes ayu where ti.preparador=ayu.id `
    );
    res.json({
      success: true,
      message: "Todos los Tickets",
      datos: result.recordset,
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getActualizarTcargaPedido = async (req, res) => {
  const { pedido } = req.params;
  const { numTicket } = req.body;
  var fechahoy = new Date();
  const pool = await getConnection();
  await pool
    .request()
    .input("Nticket", sql.VarChar, numTicket)
    .input("FechaHoraTicket", sql.DateTime, fechahoy)
    .input("pedido", pedido)
    .query(queries.getActualizarTcargaPedido);
  res.json({ pedido });
};
export const getMaxTicket = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getMaxTicket);
    res.send(result.recordset[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const createTicket = async (req, res) => {
  const { preparador, cantPedido, usuarioCreacion } = req.body;
  if (preparador == "ND" || cantPedido == null || usuarioCreacion == null) {
    return res.status(400).json({ msg: "FALTA INGRESO DE DATOS" });
  }

  var fechahoy = new Date();
  const pool = await getConnection();
  //Consultamos correlativo de ticket
  const result = await pool.request().query(queries.getMaxTicket);
  const corre = result.recordset[0];
  const correlativo = corre.maximo;
  const correl = correlativo + 1;

  try {
    await pool
      .request()
      .input("Nticket", sql.Int, correl)
      .input("preparador", sql.VarChar, preparador)
      .input("estado", sql.VarChar, "01")
      .input("cantPedido", sql.Numeric(18, 0), cantPedido)
      .input("fechaInicio", sql.DateTime, fechahoy)
      .input("usuarioCreacion", sql.VarChar, usuarioCreacion)
      .input("ubicacion", sql.VarChar, "ND")
      .input("createAt", sql.DateTime, fechahoy)
      .query(queries.crearTicket);
    res.json({ correl });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
export const createTicketPedido = async (req, res) => {
  const { ticket, pedido } = req.body;
  const pool = await getConnection();
  //Consultamos Pedido Encabezado

  var fechahoy = new Date();
  for (let i = 0; i < pedido.length; i++) {
    const element = pedido[i];
    try {
      const result = await pool
        .request()
        .input("pedido", sql.VarChar, element.pedidos)
        .query(queries.getPedidoTicket);
      const dato = result.recordset[0];

      await pool
        .request()
        .input("idTicket", sql.VarChar(50), ticket)
        .input("pedido", sql.VarChar(50), element.pedidos)
        .input("cliente", sql.VarChar, dato.cliente)
        .input("nombre", sql.VarChar(150), dato.nombre)
        .input("direccion", sql.VarChar, dato.direccion)
        .input("monto", sql.Decimal(18, 2), dato.monto)
        .input("estado", sql.VarChar(4), dato.estado)
        .input("vendedor", sql.VarChar(10), dato.vendedor)
        .input("nombrevendedor", sql.VarChar(150), dato.nombre_vendedor)
        .input("nota", sql.VarChar(300), dato.nota)
        .input("ubicacion", sql.VarChar(50), dato.ubicacion)
        .query(
          "INSERT INTO Despacho.dbo.tickets_detalle_pedidos(id_ticket,pedido,cliente,nombre,direccion,monto,estado,vendedor,nombre_vendedor,nota,ubicacion) values(@idTicket,@pedido,@cliente,@nombre,@direccion,@monto,@estado,@vendedor,@nombrevendedor,@nota,@ubicacion)"
        );

      //insertamos en la tabla de ticketesdetalleproductos
      const resulPedidoLinea = await pool
        .request()
        .input("pedido", sql.VarChar, element.pedidos)
        .query(queries.getPedidoLinea);
      const pedidoLinea = resulPedidoLinea.recordset;

      for (let i = 0; i < pedidoLinea.length; i++) {
        const element2 = pedidoLinea[i];
        await pool
          .request()
          .input("idTicket", sql.VarChar(50), ticket)
          .input("pedido", sql.VarChar(50), element2.PEDIDO)
          .input("pedidoLinea", sql.VarChar, element2.PEDIDO_LINEA)
          .input("bodega", sql.VarChar, element2.BODEGA)
          .input("lote", sql.VarChar, element2.LOTE)
          .input("articulo", sql.VarChar, element2.ARTICULO)
          .input("precioUnitario", sql.Decimal(18, 2), element2.PRECIO_UNITARIO)
          .input("cantidadPedida", sql.Decimal(18, 2), element2.CANTIDAD_PEDIDA)
          .input(
            "cantidadAFactura",
            sql.Decimal(18, 2),
            element2.CANTIDAD_A_FACTURA
          )
          .input(
            "cantidadBonificad",
            sql.Decimal(18, 2),
            element2.CANTIDAD_BONIFICAD
          )
          .input("ubicacion", sql.VarChar(50), dato.ubicacion)
          .query(
            "INSERT INTO Despacho.dbo.tickets_detalle_productos(ticket,pedido,pedido_linea,bodega,lote,articulo,precio_unitario,cantidad_pedida,cantidad_a_facturar,cantidad_bonificad,ubicacion) values(@idTicket,@pedido,@pedidoLinea,@bodega,@lote,@articulo,@precioUnitario,@cantidadPedida,@cantidadAFactura,@cantidadBonificad,@ubicacion)"
          );
      }
      //actualizamos la tabla de TcargaPedidos
      await pool
        .request()
        .input("idTicket", sql.VarChar(50), ticket)
        .input("pedido", sql.VarChar(50), element.pedidos)
        .input("fechaHoraTicket", sql.DateTime, fechahoy)
        .query(
          "UPDATE Despacho.dbo.TCargaPedidos set num_Ticket=@idTicket,Fecha_Hora_ticket=@fechaHoraTicket where pedidos=@pedido"
        );

      //Actualizamos la tabla de pedido Rubro5 Numero de Ticket

      await pool
        .request()
        .input("idTicket", sql.VarChar(50), ticket)
        .input("pedido", sql.VarChar(50), element.pedidos)
        .query(queriesTicket.updateTablaPedido);
      //Ponemos cantidad a Facturar a 0 en tabla de sofrland

      await pool
        .request()
        .input("pedido", sql.VarChar(50), element.pedidos)
        .query(
          `UPDATE ${Global.BASE_DATOS}.${Global.EMPRESA}.PEDIDO_LINEA set CANTIDAD_A_FACTURA=0 where PEDIDO=@pedido`
        );
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
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

  if (estado === "02") {
    try {
      await pool
        .request()
        .input("estado", sql.VarChar, estado)
        .input("fechahoy", sql.DateTime, d)
        .input("Id", id)
        .query(
          "update despacho.dbo.tickets set estado=@estado,fecha_inicio_preparacion=@fechahoy where ticket=@id"
        );
      //actualizamos estado de los pedidos en softlandERP
      const result = await pool
        .request()
        .input("id", id)
        .query(queriesTicket.getPedidosTicketId);
      res.send(result.recordset);
      const datos = result.recordset;
      for (let i = 0; i < datos.length; i++) {
        const element = datos[i];
        await pool
          .request()
          .input("pedido", sql.VarChar, element.pedido)
          .input("estado", sql.VarChar, "Preparando")
          .query(queriesTicket.updateTablaPedidoEstado);
      }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }
  if (estado === "03") {
    try {
      await pool
        .request()
        .input("estado", sql.VarChar, estado)
        .input("fechahoy", sql.DateTime, d)
        .input("Id", id)
        .query(
          "update despacho.dbo.tickets set estado=@estado,fecha_fin_preparacion=@fechahoy where ticket=@id"
        );
      //actualizamos estado de los pedidos en softlandERP
      const result = await pool
        .request()
        .input("id", id)
        .query(queriesTicket.getPedidosTicketId);
      res.send(result.recordset);
      const datos = result.recordset;
      for (let i = 0; i < datos.length; i++) {
        const element = datos[i];
        await pool
          .request()
          .input("pedido", sql.VarChar, element.pedido)
          .input("estado", sql.VarChar, "En Revision")
          .query(queriesTicket.updateTablaPedidoEstado);
      }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }
  if (estado === "04") {
    try {
      await pool
        .request()
        .input("estado", sql.VarChar, estado)
        .input("fechahoy", sql.DateTime, d)
        .input("Id", id)
        .query(
          "update despacho.dbo.tickets set estado=@estado,fecha_fin_revision=@fechahoy where ticket=@id"
        );
      //actualizamos estado de los pedidos en softlandERP
      const result = await pool
        .request()
        .input("id", id)
        .query(queriesTicket.getPedidosTicketId);
      res.send(result.recordset);
      const datos = result.recordset;
      for (let i = 0; i < datos.length; i++) {
        const element = datos[i];
        await pool
          .request()
          .input("pedido", sql.VarChar, element.pedido)
          .input("estado", sql.VarChar, "Preparado")
          .query(queriesTicket.updateTablaPedidoEstado);
        // recorremos tickets_detalle_productos
        // const result2 = await pool
        //   .request()
        //   .input("id", id)
        //   .query(
        //     ` select * from Despacho.dbo.tickets_detalle_productos where ticket=@id order by pedido,pedido_linea`
        //   );
        // res.send(result2.recordset);
        // const datos2 = result2.recordset;
        // console.log(datos2);
      }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }
};

//Buscamos en la tabla TickePedido para saber el detalle de pedidos en el ticket
export const getTicketDetallePedidoById = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("Id", id)
      .query(
        "select * from despacho.dbo.tickets_detalle_pedidos where id_ticket=@Id"
      );
    res.send(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
export const getTicketDetalleProductoById = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("Id", id)
      .query(queriesTicket.getQTicketProductos);
    res.send(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
//Consulta de Ticket para impression con lote y sin lote
export const getTicketImpresion = async (req, res) => {
  const { lote, idTicket } = req.query;

  if (lote === "S") {
    try {
      const pool = await getConnection();
      const result = await pool
        .request()
        .input("idTicket", idTicket)
        .query(queriesTicket.getQTicketImpresionConLote);
      res.send(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }
  if (lote === "N") {
    try {
      const pool = await getConnection();
      const result = await pool
        .request()
        .input("idTicket", idTicket)
        .query(queriesTicket.getQTicketImpresionSinLote);
      res.send(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }
};
export const getTicketById = async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("IdTicket", id)
      .query(queriesTicket.getQTicketbyId);
    res.send(result.recordset[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
/*Solucion de Movil*/
export const getTicketsPreparador = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("idPreparador", id)
      .query(queriesTicket.getTicketPreparador);
    res.send(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
export const getListaTicketsPreparador = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("idPreparador", id)
      .input("estado", estado)
      .query(
        `select * from despacho.dbo.tickets where estado=@estado and preparador=@idPreparador`
      );
    res.send(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getPreparoTicketid = async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("idTicket", id)
      .query(queriesTicket.getPreparoTicketid);
    res.send(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getInsertPrepraro = async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("idticket", id)
      .query(queriesTicket.getInsertPrepraro);
    res.json({
      success: true,
      message: "Se Ejecuto con exito",
      datos: result,
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
export const getRevisoTicketid = async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("idTicket", id)
      .query(queriesTicket.getRevisoTicketid);
    res.send(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
export const getInsertReviso = async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("idticket", id)
      .query(queriesTicket.getInsertRevision);
    res.json({
      success: true,
      message: "Se Ejecuto con exito",
      datos: result,
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getUpdatePrepraro = async (req, res) => {
  const { cantidad, ticket, articulo } = req.body;
  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("cantidad", sql.Numeric, cantidad)
      .input("ticket", sql.VarChar, ticket)
      .input("articulo", sql.VarChar, articulo)
      .query(
        `update Despacho.dbo.preparo set cantidadPreparada=@cantidad,preparada=1 where ticket=@ticket and articulo=@articulo`
      );
    res.json({
      success: true,
      message: "Todos los Tickets",
    });
    //Revisamos si todos los articulos han sido contados para cambio de estado el ticket

    const registros = await pool
      .request()
      .input("ticket", sql.VarChar, ticket)
      .query(
        `select count(ticket) as total from Despacho.dbo.preparo where ticket=@ticket  and preparada=0`
      );

    const datos = registros.recordset[0];
    const { total } = datos;

    if (total === 0) {
      await pool
        .request()
        .input("ticket", sql.VarChar, ticket)
        .query(
          `update despacho.dbo.tickets set estado='03'  where ticket=@ticket `
        );
    }
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
export const getUpdateReviso = async (req, res) => {
  const { cantidad, ticket, articulo, pedido, linea } = req.body;
  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("cantidad", sql.Numeric, cantidad)
      .input("ticket", sql.VarChar, ticket)
      .input("articulo", sql.VarChar, articulo)
      .input("pedido", sql.VarChar, pedido)
      .input("linea", sql.VarChar, linea)
      .query(
        `update Despacho.dbo.reviso set cantidadRevisada=@cantidad,reviso=1 
        where ticket=@ticket and articulo=@articulo and pedido=@pedido and pedidoLinea=@linea`
      );
    res.json({
      success: true,
      message: "Todos los Tickets",
    });
    //Revisamos si todos los articulos han sido contados para cambio de estado el ticket

    const registros = await pool
      .request()
      .input("ticket", sql.VarChar, ticket)
      .query(
        `select count(ticket) as total from Despacho.dbo.reviso where ticket=@ticket  and reviso=0`
      );

    const datos = registros.recordset[0];
    const { total } = datos;

    if (total === 0) {
      await pool
        .request()
        .input("ticket", sql.VarChar, ticket)
        .query(
          `update despacho.dbo.tickets set estado='04'  where ticket=@ticket `
        );
    }
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
