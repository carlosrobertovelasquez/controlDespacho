import Global from "../../../Global";

export const queriesPedidos = {
  /*pedidos*/
  getQPedidosAutorizacion: `select pt.pedido,pt.cliente,pt.nombre,pt.direccion,pt.monto,pe.estado,pe.fecha_hora from despacho.dbo.tickets_detalle_pedidos pt, ${Global.BASE_DATOS}.${Global.EMPRESA}.pedido  pe  where pe.pedido=pt.pedido and pe.estado in ('N','A') `,
  getPedidoLinea: `select * from ${Global.BASE_DATOS}.${Global.EMPRESA}.pedido_linea where pedido=@pedido`,
  getQCambioEstadoPedido: `update ${Global.BASE_DATOS}.${Global.EMPRESA}.pedido set estado=@estado where pedido=@pedido`,

  getPedidoDetalleById: `select pedl.LOTE,pedl.ARTICULO,art.DESCRIPCION, 
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
};
