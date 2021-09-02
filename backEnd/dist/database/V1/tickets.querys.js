"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queriesTicket = void 0;

var _Global = _interopRequireDefault(require("../../../Global"));

var queriesTicket = {
  /*pedidos*/
  CargaPedidos: "select * from despacho.dbo.TCargaPedidos where num_Ticket ='0'",
  getPedidoByid: "select \n  Ped.PEDIDO,Ped.ESTADO,Ped.AUTORIZADO, Ped.FECHA_HORA,Ped.FECHA_APROBACION,Ped.USUARIO, ped.VENDEDOR,ven.NOMBRE ,\n Ped.CLIENTE_ORIGEN,Ped.NOMBRE_CLIENTE,Ped.DIRECCION_FACTURA,Ped.TOTAL_A_FACTURAR,getDATE() as fecha_hora_Carga,ped.OBSERVACIONES \n from\n ".concat(_Global["default"].BASE_DATOS, ".").concat(_Global["default"].EMPRESA, ".PEDIDO Ped,\n ").concat(_Global["default"].BASE_DATOS, ".").concat(_Global["default"].EMPRESA, ".VENDEDOR ven\n where \n Ped.VENDEDOR=ven.VENDEDOR AND\n Ped.PEDIDO=@Pedido"),
  getPedidoDetalleByid: "select pedl.LOTE,pedl.ARTICULO,art.DESCRIPCION, \n  sum(pedl.CANTIDAD_PEDIDA) as CANTIDAD_PEDIDA,\n  sum(pedl.CANTIDAD_A_FACTURA) as CANTIDAD_A_FACTURA,\n  sum(pedl.CANTIDAD_BONIFICAD) as CANTIDAD_BONIFICAD\n  from\n  ".concat(_Global["default"].BASE_DATOS, ".").concat(_Global["default"].EMPRESA, ".PEDIDO_LINEA pedl,\n  ").concat(_Global["default"].BASE_DATOS, ".").concat(_Global["default"].EMPRESA, ".ARTICULO art\n  where PEDIDO=@Pedido and\n  art.ARTICULO=pedl.ARTICULO\n  group by pedl.lote,pedl.ARTICULO,art.DESCRIPCION\n  order by pedl.articulo"),
  getPedidoTicket: "select ped.pedido,ped.cliente_origen as cliente,ped.nombre_cliente as nombre,REPLACE(ped.direccion_factura,',',' ') as direccion, ped.total_a_facturar as monto,'01' as estado,ped.vendedor,ven.nombre as nombre_vendedor,ped.observaciones as nota,'ND' as ubicacion from ".concat(_Global["default"].BASE_DATOS, ".").concat(_Global["default"].EMPRESA, ".pedido ped,").concat(_Global["default"].BASE_DATOS, ".").concat(_Global["default"].EMPRESA, ".vendedor ven where ped.vendedor=ven.vendedor and ped.pedido=@pedido"),
  getPedidoLinea: "select * from ".concat(_Global["default"].BASE_DATOS, ".").concat(_Global["default"].EMPRESA, ".pedido_linea where pedido=@pedido"),

  /*Facturas*/

  /*Tickets*/
  //Actualizamos en TCargaPedido
  getActualizarTcargaPedido: "update Despacho.dbo.TCargaPedidos set num_Ticket=@Nticket,Fecha_Hora_ticket=@FechaHoraTicket where pedidos=@pedido",
  getMaxTicket: "select max(ticket) as maximo from despacho.dbo.tickets",
  //Crear Ticket
  crearTicket: "insert into Despacho.dbo.tickets(ticket,preparador,estado,cant_pedido,fecha_inicio,ubicacion,created_at)values(@Nticket,@preparador,@estado,@cantPedido,@fechaInicio,@ubicacion,@createAt)",
  createTicketPedido: "insert into Despacho.dbo.tickets_detalle_pedido(id_ticket,pedido,cliente,nombre,direccion,monto,estado,vendedor,nombre_vendedor,nota,ubicacion) values(@Ticket,@pedido,@cliente,@nombre,@direccion,@monto,@estado,@vendedor,@nombreVendedor,@nota,@ubicacion)",
  getQTicketProductos: "SELECT dp.id,dp.ticket,dp.pedido,dp.pedido_linea,dp.bodega,dp.lote,dp.articulo,art.DESCRIPCION,dp.cantidad_pedida,dp.cantidad_a_facturar,dp.cantidad_bonificad,dp.ubicacion FROM Despacho.DBO.tickets_detalle_productos dp,".concat(_Global["default"].BASE_DATOS, ".").concat(_Global["default"].EMPRESA, ".ARTICULO art WHERE dp.articulo=art.ARTICULO and ticket=@Id order by dp.pedido"),
  getQTicketImpresionConLote: "select pl.BODEGA,pl.ARTICULO,pl.LOTE,sum((pl.CANTIDAD_A_FACTURA+pl.CANTIDAD_BONIFICAD)) CANTIDAD,pl.PEDIDO,art.DESCRIPCION, CONVERT(VARCHAR(10),lt.FECHA_VENCIMIENTO, 103) as  FECHA_VENCIMIENTO from \n              Despacho.dbo.tickets_detalle_pedidos tdp,\n              ".concat(_Global["default"].BASE_DATOS, ".").concat(_Global["default"].EMPRESA, ".ARTICULO art,\n              ").concat(_Global["default"].BASE_DATOS, ".").concat(_Global["default"].EMPRESA, ".PEDIDO_LINEA pl,\n              ").concat(_Global["default"].BASE_DATOS, ".").concat(_Global["default"].EMPRESA, ".MFS.LOTE lt\n              where \n              pl.PEDIDO=tdp.pedido and\n              pl.articulo=art.ARTICULO and\n              pl.LOTE=lt.LOTE and\n              pl.ARTICULO=lt.ARTICULO and\n              tdp.id_ticket=@idTicket\n              group by pl.BODEGA, pl.LOTE,pl.ARTICULO,pl.PEDIDO,art.DESCRIPCION,lt.FECHA_VENCIMIENTO\n  \n  "),
  getQTicketImpresionSinLote: "select pl.BODEGA,\n  pl.ARTICULO,\n  sum((pl.CANTIDAD_A_FACTURA+pl.CANTIDAD_BONIFICAD)) CANTIDAD,\n  pl.PEDIDO,\n  art.DESCRIPCION\n              from \n              Despacho.dbo.tickets_detalle_pedidos tdp,\n              ".concat(_Global["default"].BASE_DATOS, ".").concat(_Global["default"].EMPRESA, ".ARTICULO art,\n              ").concat(_Global["default"].BASE_DATOS, ".").concat(_Global["default"].EMPRESA, ".PEDIDO_LINEA pl\n              where \n              pl.PEDIDO=tdp.pedido and\n              pl.articulo=art.ARTICULO and\n              tdp.id_ticket=@idTicket\n              group by pl.BODEGA, pl.ARTICULO,pl.PEDIDO, art.DESCRIPCION"),
  getQTicketbyId: "select \n  ti.ticket,ti.preparador,pre.nombre,ti.estado,est.NOMBRE,ti.fecha_inicio,ti.fecha_fin,ti.usuario_creacion,ti.usuario_estado,ti.fecha_inicio_preparacion,ti.fecha_fin_preparacion,ti.vultos,ti.fecha_fin_revision,ti.ubicacion\n  from \n  Despacho.dbo.tickets ti,\n  Despacho.dbo.ayudantes pre,\n  Despacho.dbo.estado_ticket est\n  where \n  ti.estado=est.TIPO and\n  ti.preparador=pre.id and\n  ticket=@IdTicket",

  /*Fletes*/

  /*Liquidaciones*/
  updateTablaPedido: "UPDATE ".concat(_Global["default"].BASE_DATOS, ".").concat(_Global["default"].EMPRESA, ".pedido set rubro5='Ticket='+@idTicket,estado='A' where pedido=@pedido")
};
exports.queriesTicket = queriesTicket;