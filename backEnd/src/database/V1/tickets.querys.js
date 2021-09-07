import Global from "../../../Global";

export const queriesTicket = {
  /*pedidos*/
  CargaPedidos:
    "select * from despacho.dbo.TCargaPedidos where num_Ticket ='0'",
  getPedidoByid: `select 
  Ped.PEDIDO,Ped.ESTADO,Ped.AUTORIZADO, Ped.FECHA_HORA,Ped.FECHA_APROBACION,Ped.USUARIO, ped.VENDEDOR,ven.NOMBRE ,
 Ped.CLIENTE_ORIGEN,Ped.NOMBRE_CLIENTE,Ped.DIRECCION_FACTURA,Ped.TOTAL_A_FACTURAR,getDATE() as fecha_hora_Carga,ped.OBSERVACIONES 
 from
 ${Global.BASE_DATOS}.${Global.EMPRESA}.PEDIDO Ped,
 ${Global.BASE_DATOS}.${Global.EMPRESA}.VENDEDOR ven
 where 
 Ped.VENDEDOR=ven.VENDEDOR AND
 Ped.PEDIDO=@Pedido`,
  getPedidoDetalleByid: `select pedl.LOTE,pedl.ARTICULO,art.DESCRIPCION, 
  sum(pedl.CANTIDAD_PEDIDA) as CANTIDAD_PEDIDA,
  sum(pedl.CANTIDAD_A_FACTURA) as CANTIDAD_A_FACTURA,
  sum(pedl.CANTIDAD_BONIFICAD) as CANTIDAD_BONIFICAD
  from
  ${Global.BASE_DATOS}.${Global.EMPRESA}.PEDIDO_LINEA pedl,
  ${Global.BASE_DATOS}.${Global.EMPRESA}.ARTICULO art
  where PEDIDO=@Pedido and
  art.ARTICULO=pedl.ARTICULO
  group by pedl.lote,pedl.ARTICULO,art.DESCRIPCION
  order by pedl.articulo`,
  getPedidoTicket: `select ped.pedido,ped.cliente_origen as cliente,ped.nombre_cliente as nombre,REPLACE(ped.direccion_factura,',',' ') as direccion, ped.total_a_facturar as monto,'01' as estado,ped.vendedor,ven.nombre as nombre_vendedor,ped.observaciones as nota,'ND' as ubicacion from ${Global.BASE_DATOS}.${Global.EMPRESA}.pedido ped,${Global.BASE_DATOS}.${Global.EMPRESA}.vendedor ven where ped.vendedor=ven.vendedor and ped.pedido=@pedido`,
  getPedidoLinea: `select * from ${Global.BASE_DATOS}.${Global.EMPRESA}.pedido_linea where pedido=@pedido`,
  /*Facturas*/
  /*Tickets*/
  //Actualizamos en TCargaPedido
  getActualizarTcargaPedido:
    "update Despacho.dbo.TCargaPedidos set num_Ticket=@Nticket,Fecha_Hora_ticket=@FechaHoraTicket where pedidos=@pedido",
  getMaxTicket: "select max(ticket) as maximo from despacho.dbo.tickets",
  //Crear Ticket
  crearTicket: `insert into Despacho.dbo.tickets(ticket,preparador,estado,cant_pedido,fecha_inicio,ubicacion,created_at)values(@Nticket,@preparador,@estado,@cantPedido,@fechaInicio,@ubicacion,@createAt)`,
  createTicketPedido: `insert into Despacho.dbo.tickets_detalle_pedido(id_ticket,pedido,cliente,nombre,direccion,monto,estado,vendedor,nombre_vendedor,nota,ubicacion) values(@Ticket,@pedido,@cliente,@nombre,@direccion,@monto,@estado,@vendedor,@nombreVendedor,@nota,@ubicacion)`,
  getQTicketProductos: `SELECT dp.id,dp.ticket,dp.pedido,dp.pedido_linea,dp.bodega,dp.lote,dp.articulo,art.DESCRIPCION,dp.cantidad_pedida,dp.cantidad_a_facturar,dp.cantidad_bonificad,dp.ubicacion FROM Despacho.DBO.tickets_detalle_productos dp,${Global.BASE_DATOS}.${Global.EMPRESA}.ARTICULO art WHERE dp.articulo=art.ARTICULO and ticket=@Id order by dp.pedido`,
  getQTicketImpresionConLote: `select pl.BODEGA,pl.ARTICULO,pl.LOTE,sum((pl.CANTIDAD_A_FACTURA+pl.CANTIDAD_BONIFICAD)) CANTIDAD,pl.PEDIDO,art.DESCRIPCION, CONVERT(VARCHAR(10),lt.FECHA_VENCIMIENTO, 103) as  FECHA_VENCIMIENTO from 
              Despacho.dbo.tickets_detalle_pedidos tdp,
              ${Global.BASE_DATOS}.${Global.EMPRESA}.ARTICULO art,
              ${Global.BASE_DATOS}.${Global.EMPRESA}.PEDIDO_LINEA pl,
              ${Global.BASE_DATOS}.${Global.EMPRESA}.MFS.LOTE lt
              where 
              pl.PEDIDO=tdp.pedido and
              pl.articulo=art.ARTICULO and
              pl.LOTE=lt.LOTE and
              pl.ARTICULO=lt.ARTICULO and
              tdp.id_ticket=@idTicket
              group by pl.BODEGA, pl.LOTE,pl.ARTICULO,pl.PEDIDO,art.DESCRIPCION,lt.FECHA_VENCIMIENTO
  
  `,
  getQTicketImpresionSinLote: `select pl.BODEGA,
  pl.ARTICULO,
  sum((pl.CANTIDAD_A_FACTURA+pl.CANTIDAD_BONIFICAD)) CANTIDAD,
  pl.PEDIDO,
  art.DESCRIPCION
              from 
              Despacho.dbo.tickets_detalle_pedidos tdp,
              ${Global.BASE_DATOS}.${Global.EMPRESA}.ARTICULO art,
              ${Global.BASE_DATOS}.${Global.EMPRESA}.PEDIDO_LINEA pl
              where 
              pl.PEDIDO=tdp.pedido and
              pl.articulo=art.ARTICULO and
              tdp.id_ticket=@idTicket
              group by pl.BODEGA, pl.ARTICULO,pl.PEDIDO, art.DESCRIPCION`,
  getQTicketbyId: `select 
  ti.ticket,ti.preparador,pre.nombre,ti.estado,est.NOMBRE,ti.fecha_inicio,ti.fecha_fin,ti.usuario_creacion,ti.usuario_estado,ti.fecha_inicio_preparacion,ti.fecha_fin_preparacion,ti.vultos,ti.fecha_fin_revision,ti.ubicacion
  from 
  Despacho.dbo.tickets ti,
  Despacho.dbo.ayudantes pre,
  Despacho.dbo.estado_ticket est
  where 
  ti.estado=est.TIPO and
  ti.preparador=pre.id and
  ticket=@IdTicket`,
  /*Fletes*/
  /*Liquidaciones*/
  updateTablaPedido: `UPDATE ${Global.BASE_DATOS}.${Global.EMPRESA}.pedido set ${Global.RUBROFLETE}='Ticket='+@idTicket,estado='A' where pedido=@pedido`,
  updateTablaPedidoSoftland: `update ${Global.BASE_DATOS}.${Global.EMPRESA}.pedido_linea set cantidad_a_factura=0, where pedido=@pedido`,
  updateTablaPedidoEstado: `UPDATE ${Global.BASE_DATOS}.${Global.EMPRESA}.pedido set ${Global.RUBROESTADO}=@estado where pedido=@pedido`,
  getPedidosTicketId: `select * from despacho.dbo.tickets_detalle_pedidos where id_ticket=@id`,
  /*Movil*/
  getTicketPreparador: `select  *
  from Despacho.dbo.tickets where preparador=@idPreparador `,
  getListaTickerPorPreparador: `select * from despacho.dbo.tickets where estado=@estado and preparador=@idPreparador`,
  getPreparoTicketid: `select * from Despacho.dbo.preparo where ticket=@idTicket and preparada=0`,
  getRevisoTicketid: `select * from Despacho.dbo.reviso where ticket=@idTicket and reviso=0`,
  getInsertPrepraro: `insert into despacho.dbo.preparo(ticket,ubicacion,lote,bodega,articulo,codigoBarrasInvt,codigoBarrasVent,cantidad,descripcion) 
select pl.ticket, pl.ubicacion, pl.LOTE, pl.BODEGA,
  pl.ARTICULO,art.CODIGO_BARRAS_INVT,art.CODIGO_BARRAS_VENT,
  sum((pl.CANTIDAD_A_FACTURAr+pl.CANTIDAD_BONIFICAD)) CANTIDAD,
  art.DESCRIPCION
              from 
              Despacho.dbo.tickets_detalle_pedidos tdp,
              SOFTLAND.C01.ARTICULO art,
              Despacho.dbo.tickets_detalle_productos pl
              where 
              pl.PEDIDO=tdp.pedido and
              pl.articulo=art.ARTICULO and
              tdp.id_ticket=@idTicket and not EXISTS (SELECT * FROM Despacho.dbo.preparo where ticket=@idTicket)
              group by pl.ticket, pl.ubicacion,  pl.LOTE, pl.BODEGA, pl.ARTICULO,art.CODIGO_BARRAS_INVT,art.CODIGO_BARRAS_VENT, art.DESCRIPCION`,
  getUpdatePrepraro: `update Despacho.dbo.preparo set cantidadPreparada=@cantidad,preparada=1 where ticket=@ticket and articulo=@articulo`,
  getInsertRevision: `insert into despacho.dbo.reviso(pedido,pedidoLinea,ticket,ubicacion,lote,bodega,articulo,codigoBarrasInvt,codigoBarrasVent,cantidad,descripcion) 
  select pl.pedido,pl.pedido_linea, pl.ticket, pl.ubicacion, pl.LOTE, pl.BODEGA,
    pl.ARTICULO,art.CODIGO_BARRAS_INVT,art.CODIGO_BARRAS_VENT,
    (pl.CANTIDAD_A_FACTURAr+pl.CANTIDAD_BONIFICAD) CANTIDAD,
    art.DESCRIPCION
                from 
                Despacho.dbo.tickets_detalle_pedidos tdp,
                SOFTLAND.C01.ARTICULO art,
                Despacho.dbo.tickets_detalle_productos pl
                where 
                pl.PEDIDO=tdp.pedido and
                pl.articulo=art.ARTICULO and
                tdp.id_ticket=@idTicket and not EXISTS (SELECT * FROM Despacho.dbo.reviso where ticket=@idTicket)`,
};
