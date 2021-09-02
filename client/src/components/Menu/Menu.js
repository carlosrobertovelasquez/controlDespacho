/* eslint-disable react/style-prop-object */
import React from 'react';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';

import { MdLocalShipping, MdPermContactCalendar, MdContentPaste, MdDesktopWindows } from 'react-icons/md';
import { BsGearWideConnected } from 'react-icons/bs';
import { FaStamp, FaFileInvoiceDollar, FaLuggageCart, FaRegUser } from 'react-icons/fa';
import { GiTicket, GiMoneyStack, GiHistogram } from 'react-icons/gi';
import { Accordion } from 'react-bootstrap-accordion';
import { Button } from 'react-bootstrap';
import Global from '../../Global';
export default function Menu() {
	const { auth, logout } = useAuth();
	const { name } = auth;

	let url = '';
	const onLogout = () => {
		logout();
	};
	const rutaServidor = Global.rutaServidor;
	return (
		<React.Fragment>
			<aside className="main-sidebar sidebar-dark-primary elevation-4">
				<Link to={rutaServidor} style={{ textDecoration: 'none' }}>
					<a href={url} className="brand-link">
						<img
							src={rutaServidor + `/dist/img/AdminLTELogo.png`}
							alt="AdminLTE Logo"
							className="brand-image img-circle elevation-3"
						/>
						<span className="brand-text font-weight-light">Control Despacho</span>
					</a>
				</Link>
				<div className="sidebar">
					<div className="user-panel mt-3 pb-3 mb-3 d-flex">
						<div className="image">
							<Link to={rutaServidor} style={{ textDecoration: 'none' }}>
								<a href={url}>
									<img
										src={rutaServidor + `/dist/img/user2-160x160.jpg`}
										alt="User Image"
										className="img-circle elevation-2"
									/>
								</a>
							</Link>
						</div>
						<div className="info">
							<Link style={{ textDecoration: 'none' }}>
								<a href={url} className="d-block">
									{name}
								</a>
							</Link>
						</div>
					</div>
				</div>

				<div>
					<Accordion title="Maestros">
						<div
							style={{
								background: '#343A40',
								height: '50px',
								marginBottom: '2px',
								alignContent: 'center'
							}}
						>
							<Link to={rutaServidor + `/vehiculos`} style={{ textDecoration: 'none' }}>
								<a style={{ color: '#fff' }} href={url} className="nav-link">
									<p>
										<MdLocalShipping size={24} /> Vehiculos
									</p>
								</a>
							</Link>
						</div>
						<div style={{ background: '#343A40', height: '50px', marginBottom: '2px' }}>
							<Link to={rutaServidor + `/Motoristas`} style={{ textDecoration: 'none' }}>
								<a style={{ color: '#fff' }} href={url} className="nav-link">
									<p>
										<MdPermContactCalendar size={24} /> Transportistas
									</p>
								</a>
							</Link>
						</div>
						<div style={{ background: '#343A40', height: '50px', marginBottom: '2px' }}>
							<Link to={rutaServidor + `/preparadores`} style={{ textDecoration: 'none' }}>
								<a style={{ color: '#fff' }} href={url} className="nav-link">
									<p>
										{' '}
										<MdPermContactCalendar size={24} /> Preparadores
									</p>
								</a>
							</Link>
						</div>
					</Accordion>
					<Accordion title="Transacciones" defaultActiveKey="0">
						<div
							style={{
								background: '#343A40',
								height: '50px',
								marginBottom: '2px',
								alignContent: 'center'
							}}
						>
							<Link to={rutaServidor + `/pedidos`} style={{ textDecoration: 'none' }}>
								<a style={{ color: '#fff' }} href={url} className="nav-link">
									<p>
										<MdContentPaste size={24} /> Pedidos
									</p>
								</a>
							</Link>
						</div>
						<div style={{ background: '#343A40', height: '50px', marginBottom: '2px' }}>
							<Link to={rutaServidor + `/autorizacion`} style={{ textDecoration: 'none' }}>
								<a style={{ color: '#fff' }} href={url} className="nav-link">
									<p>
										<FaStamp size={24} /> Autorizacion de Pedidos
									</p>
								</a>
							</Link>
						</div>
						<div style={{ background: '#343A40', height: '50px', marginBottom: '2px' }}>
							<Link to={rutaServidor + `/ticket`} style={{ textDecoration: 'none' }}>
								<a style={{ color: '#fff' }} href={url} className="nav-link">
									<p>
										<GiTicket size={24} /> Ticket Preparacion
									</p>
								</a>
							</Link>
						</div>
						<div style={{ background: '#343A40', height: '50px', marginBottom: '2px' }}>
							<Link to={rutaServidor + `/factura`} style={{ textDecoration: 'none' }}>
								<a style={{ color: '#fff' }} href={url} className="nav-link">
									<p>
										<FaFileInvoiceDollar size={24} /> Factura Despacho
									</p>
								</a>
							</Link>
						</div>
						<div style={{ background: '#343A40', height: '50px', marginBottom: '2px' }}>
							<Link to={rutaServidor + `/flete`} style={{ textDecoration: 'none' }}>
								<a style={{ color: '#fff' }} href={url} className="nav-link">
									<p>
										<FaLuggageCart size={24} /> Flete Despacho
									</p>
								</a>
							</Link>
						</div>
						<div style={{ background: '#343A40', height: '50px', marginBottom: '2px' }}>
							<Link to={rutaServidor + `/liquidacion`} style={{ textDecoration: 'none' }}>
								<a style={{ color: '#fff' }} href={url} className="nav-link">
									<p>
										<GiMoneyStack size={24} /> Liquidacion
									</p>
								</a>
							</Link>
						</div>
					</Accordion>
					<Accordion title="Consulta">
						<div
							style={{
								background: '#343A40',
								height: '50px',
								marginBottom: '2px',
								alignContent: 'center'
							}}
						>
							<Link to={rutaServidor + `/consultaTickets`} style={{ textDecoration: 'none' }}>
								<a style={{ color: '#fff' }} href={url} className="nav-link">
									<p>
										<GiTicket size={34} /> Ticket
									</p>
								</a>
							</Link>
						</div>
						<div style={{ background: '#343A40', height: '50px', marginBottom: '2px' }}>
							<Link to={rutaServidor + `/consultaFletes`} style={{ textDecoration: 'none' }}>
								<a style={{ color: '#fff' }} href={url} className="nav-link">
									<p>
										<FaLuggageCart size={34} /> Flete
									</p>
								</a>
							</Link>
						</div>
						<div style={{ background: '#343A40', height: '50px', marginBottom: '2px' }}>
							<Link to={rutaServidor + `/pantallaCompletaTickets`} style={{ textDecoration: 'none' }}>
								<a style={{ color: '#fff' }} href={url} className="nav-link">
									<p>
										<MdDesktopWindows size={34} /> Pantalla Completa
									</p>
								</a>
							</Link>
						</div>
					</Accordion>
					<Accordion title="Reportes/Graficos">
						<div
							style={{
								background: '#343A40',
								height: '50px',
								marginBottom: '2px',
								alignContent: 'center'
							}}
						>
							<Link to={rutaServidor + `/graficosTicket`} style={{ textDecoration: 'none' }}>
								<a style={{ color: '#fff' }} href={url} className="nav-link">
									<p>
										<GiHistogram size={24} /> Grafico de Ticket
									</p>
								</a>
							</Link>
						</div>
						<div style={{ background: '#343A40', height: '50px', marginBottom: '2px' }}>
							<Link to={rutaServidor + `/graficosFlete`} style={{ textDecoration: 'none' }}>
								<a style={{ color: '#fff' }} href={url} className="nav-link">
									<p>
										<GiHistogram size={24} /> Grafico de Flete
									</p>
								</a>
							</Link>
						</div>
					</Accordion>
					<Accordion title="Administracion">
						<div
							style={{
								background: '#343A40',
								height: '50px',
								marginBottom: '2px',
								alignContent: 'center'
							}}
						>
							<Link to={rutaServidor + `/User`} style={{ textDecoration: 'none' }}>
								<a style={{ color: '#fff' }} href={url} className="nav-link">
									<p>
										<FaRegUser size={24} /> Usuarios
									</p>
								</a>
							</Link>
						</div>
						<div style={{ background: '#343A40', height: '50px', marginBottom: '2px' }}>
							<Link to="/vehiculos" style={{ textDecoration: 'none' }}>
								<a style={{ color: '#fff' }} href={url} className="nav-link">
									<p>
										<GiTicket size={24} /> Desbloqueo de Ticket
									</p>
								</a>
							</Link>
						</div>
						<div style={{ background: '#343A40', height: '50px', marginBottom: '2px' }}>
							<Link to="/vehiculos" style={{ textDecoration: 'none' }}>
								<a style={{ color: '#fff' }} href={url} className="nav-link">
									<p>
										<BsGearWideConnected size={24} /> Parametros Generales
									</p>
								</a>
							</Link>
						</div>
					</Accordion>
					<Button style={{ width: '100%' }} variant="primary" size="lg" onClick={onLogout}>
						Salir
					</Button>{' '}
				</div>
			</aside>
		</React.Fragment>
	);
}
