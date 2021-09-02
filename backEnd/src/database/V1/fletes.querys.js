import Global from "../../../Global";

export const queriesFletes = {
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
  /* getPedidoDetalleByid: `select pedl.LOTE,pedl.ARTICULO,art.DESCRIPCION, 
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
 /  getPedidoTicket: `select ped.pedido,ped.cliente_origen as cliente,ped.nombre_cliente as nombre,REPLACE(ped.direccion_factura,',',' ') as direccion, ped.total_a_facturar as monto,'01' as estado,ped.vendedor,ven.nombre as nombre_vendedor,ped.observaciones as nota,'ND' as ubicacion from ${Global.BASE_DATOS}.${Global.EMPRESA}.pedido ped,${Global.BASE_DATOS}.${Global.EMPRESA}.vendedor ven where ped.vendedor=ven.vendedor and ped.pedido=@pedido`,
 // getPedidoLinea: `select * from ${Global.BASE_DATOS}.${Global.EMPRESA}.pedido_linea where pedido=@pedido`,
  /*Facturas*/
  /*Tickets*/
  //Actualizamos en TCargaPedido

  /* getActualizarTcargaPedido:
    "update Despacho.dbo.TCargaPedidos set num_Ticket=@Nticket,Fecha_Hora_ticket=@FechaHoraTicket where pedidos=@pedido",
   */
  getMaxFlete: "select max(flete) as maximo from despacho.dbo.fletes",
  //Crear Ticket
  crearFlete: `insert into Despacho.dbo.fletes(flete,vehiculo_id,motorista_id,numerofacturas,fecha,estado,kinicial,kfinal,usuariocreacion,created_at,montototal)values
                                               (@Nflete,@idVehiculo,@idMotorista,@numeroFacturas,@fecha,@estado,@kinicial,@kfinal,@usuarioCreacion,@createdAt,0)`,
  createFleteFacturas: `insert into Despacho.dbo.fleteitems(flete,flete_id,factura,fecha,cliente,nombre,total,condicionpago,estado,created_at) values
                                                           (@flete,@fleteId,@factura,@fecha,@cliente,@nombre,@total,@condicionPago,@estado,@createdAt)`,

  /*Fletes*/
  /*Liquidaciones*/
  totalMontoFlete: `select sum(total) as total from despacho.dbo.fleteitems where flete=@flete`,
  encabezadoFlete: `select fle.flete,fle.numerofacturas,mot.nombre,
  estado=CASE fle.estado when '01' then 'IR A RUTA' when '02' then 'EN RUTA' when '03' then 'POR LIQUIDAR' when '04' then 'PENDIENTE O PARCIAL' when '05' then 'LIQUIDADO' END,
  ve.placa,ve.modelo,fle.kinicial,fle.kfinal,fle.fecha, fle.fechahorasalida from 
  Despacho.dbo.fletes fle,
  Despacho.dbo.vehiculos ve,
  Despacho.dbo.motoristas mot
  where
  fle.vehiculo_id=ve.id and
  fle.motorista_id=mot.id and
  fle.flete=@flete`,
  detalleFlete: `select item.reasignada, item.flete, item.estado,  item.fecha, item.factura,item.cliente,cli.nombre,item.total,
  codpago.DESCRIPCION,item.operaciones,item.observaciones
  from
  despacho.dbo.fleteitems item,
  ${Global.BASE_DATOS}.${Global.EMPRESA}.CONDICION_PAGO codpago,
  ${Global.BASE_DATOS}.${Global.EMPRESA}.CLIENTE cli
  where
  item.condicionpago=codpago.CONDICION_PAGO and
  item.cliente=cli.cliente and
  item.flete=@flete order by item.factura`,
  getAllflete: ` select flete.fecha,flete.fechahorasalida,flete.flete,substring(mot.nombre,1,14) as nombre,vehi.placa,vehi.modelo,
  flete.numerofacturas,flete.montototal,flete.kinicial,flete.estado 
  from 
  despacho.dbo.fletes flete,
  despacho.dbo.vehiculos vehi,
  despacho.dbo.motoristas mot
  where
  flete.vehiculo_id=vehi.id and
  flete.motorista_id=mot.id and flete.estado in ('01','02','03')  order by flete.flete`,
  getTodosfletes: ` select flete.fecha,flete.fechahorasalida,flete.fechahorallegada, flete.flete,mot.nombre,vehi.placa,vehi.modelo,
  flete.numerofacturas,flete.montototal,flete.kinicial,flete.Kfinal,(flete.kinicial-flete.Kfinal) as kConsumidos,
  estado=CASE flete.estado when '01' then 'IR A RUTA' when '02' then 'EN RUTA' when '03' then 'POR LIQUIDAR' when '04' then 'PENDIENTE O PARCIAL' when '05' then 'LIQUIDADO' END 
  from 
  despacho.dbo.fletes flete,
  despacho.dbo.vehiculos vehi,
  despacho.dbo.motoristas mot
  where
  flete.vehiculo_id=vehi.id and
  flete.motorista_id=mot.id   order by flete.flete`,

  updateLiquidacion: ` update Despacho.dbo.fleteitems 
  set estado=@estado,operaciones=@operaciones,observaciones=@observaciones ,
  fechaliquidacion=@fechaliquidacion,usuarioliquidacion=@usuarioliquidacion 
  where flete=@flete and factura=@factura`,

  getObservacionesAll: "select * from despacho.dbo.operaciones",
};
