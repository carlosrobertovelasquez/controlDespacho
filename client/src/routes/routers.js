//Layouds
import LayoutBasic from '../layouts/LayoutBasic';
import LayoutPantallaCompleta from '../layouts/LayoutPantallaCompleta';
//Pages
import Home from '../pages/Home';
import Motoristas from '../pages/Motoristas';
import Vehiculos from '../pages/Vehiculos';
import Preparadores from '../pages/Preparadores';
import Pedidos from '../pages/Pedidos';
import Ticket from '../pages/Ticket';
import Fletes from '../pages/Fletes';
import Facturas from '../pages/Facturas';
import Admin from '../pages/Admin';
import GraficosTicket from '../pages/Graficos/GraficosTicket';
import GraficosFlete from '../pages/Graficos/GraficosFlete';
import Error404 from '../pages/Error404';
import AutorizacionPedido from '../pages/AutorizacionPedido';
import ConsultaFletes from '../pages/Consulta/ConsultaFlete';
import ConsultaTickets from '../pages/Consulta/ConsultaTickets';
import ConsultaLiquidaciones from '../pages/Consulta/ConsultaLiquidacion';
import PantallaCompletaTicket from '../pages/Consulta/PantallaCompletaTicket';
import Liquidacion from '../pages/Liquidacion';
import User from '../pages/Administracion/User';
import Global from '../Global';
const ruta = Global.rutaServidor;
console.log(ruta);
const routes = [
	{
		path: '/cd',
		layout: LayoutBasic,
		component: Home,
		exact: true
	},
	{
		path: '/cd/motoristas',
		layout: LayoutBasic,
		component: Motoristas,
		exact: true
	},
	{
		path: '/cd/vehiculos',
		layout: LayoutBasic,
		component: Vehiculos,
		exact: true
	},
	{
		path: '/cd/preparadores',
		layout: LayoutBasic,
		component: Preparadores,
		exact: true
	},
	{
		path: '/cd/pedidos',
		layout: LayoutBasic,
		component: Pedidos,
		exact: true
	},
	{
		path: '/cd/autorizacion',
		layout: LayoutBasic,
		component: AutorizacionPedido,
		exact: true
	},
	{
		path: '/cd/ticket',
		layout: LayoutBasic,
		component: Ticket,
		exact: true
	},
	{
		path: '/cd/flete',
		layout: LayoutBasic,
		component: Fletes,
		exact: true
	},
	{
		path: '/cd/factura',
		layout: LayoutBasic,
		component: Facturas,
		exact: true
	},
	{
		path: '/cd/liquidacion',
		layout: LayoutBasic,
		component: Liquidacion,
		exact: true
	},
	{
		path: '/cd/admin',
		layout: LayoutBasic,
		component: Admin,
		exact: true
	},
	{
		path: '/cd/graficosTicket',
		layout: LayoutBasic,
		component: GraficosTicket,
		exact: true
	},
	{
		path: '/cd/graficosFlete',
		layout: LayoutBasic,
		component: GraficosFlete,
		exact: true
	},
	{
		path: '/cd/consultaFletes',
		layout: LayoutBasic,
		component: ConsultaFletes,
		exact: true
	},
	{
		path: '/cd/consultaTickets',
		layout: LayoutBasic,
		component: ConsultaTickets,
		exact: true
	},
	{
		path: '/cd/consultaLiquidaciones',
		layout: LayoutBasic,
		component: ConsultaLiquidaciones,
		exact: true
	},
	{
		path: '/cd/user',
		layout: LayoutBasic,
		component: User,
		exact: true
	},
	{
		path: '/cd/pantallaCompletaTickets',
		layout: LayoutPantallaCompleta,
		component: PantallaCompletaTicket,
		exact: true
	},

	{
		layout: LayoutBasic,
		component: Error404
	}
];

export default routes;
