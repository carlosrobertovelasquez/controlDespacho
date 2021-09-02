import Global from "../../../Global";

export const queriesFacturas = {
  /*pedidos*/
  getQFacturasDespacho: `select fa.factura,fa.fecha,fa.cliente_origen,cli.NOMBRE, replace(fa.direccion_factura,'DETALLE:','') AS DIRECCION,fa.observaciones,fa.total_factura,fa.condicion_pago from 
  ${Global.BASE_DATOS}.${Global.EMPRESA}.factura fa,
  ${Global.BASE_DATOS}.${Global.EMPRESA}.cliente cli
  where fa.cliente_origen=cli.cliente and
  fa.fecha>='2021-08-01 00:00:00.000' and 
  fa.anulada='N' and tipo_documento='F' 
   and fa.factura not in (select factura from despacho.dbo.fleteitems)`,
  getPedidoLinea: `select * from ${Global.BASE_DATOS}.${Global.EMPRESA}.pedido_linea where pedido=@pedido`,
  getQCambioEstadoPedido: `update ${Global.BASE_DATOS}.${Global.EMPRESA}.pedido set estado=@estado where pedido=@pedido`,
  /*Facturas*/
  /*Tickets*/
  //Actualizamos en TCargaPedido
};
