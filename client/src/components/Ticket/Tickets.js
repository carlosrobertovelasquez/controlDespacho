import React, { useState } from 'react';
import Moment from 'react-moment';
import { Modal, ModalBody, ModalFooter, Form, Row, Col, Button } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/ModalHeader';
import swal from 'sweetalert';
import axios from 'axios';
import Global from '../../Global';
import Impresion from '../../components/Ticket/impersionTicket';
import DataTable from 'react-data-table-component';
import useTimeAgo from '../../hooks/useTimeAgo';

export default function Tickets({ fbb }) {
	const now = new Date();
	const fecha = fbb.fecha_inicio;

	//Moment.duration(now.diff(end, 'hours'));
	let url = '';
	const [ dataIdTicket, setDataIdTicket ] = useState('');
	const [ impresion, setImpresion ] = useState(false);
	const [ modalTicket, setModalTicket ] = useState(false);
	const [ dataPedidos, setDataPedidos ] = useState([]);
	const [ dataProductos, setDataProductos ] = useState([]);
	const colPedidos = [
		{
			name: 'Pedido',
			selector: 'pedido',
			sortable: true,
			compact: true
		},
		{
			name: 'Cliente',
			selector: 'cliente',
			sortable: true,
			compact: true,
			width: '70px'
		},
		{
			name: 'Nombre',
			selector: 'nombre',
			sortable: true,
			compact: true,
			width: '300px'
		},
		{
			name: 'Direccion',
			selector: 'direccion',
			sortable: true,
			compact: true,
			width: '350px'
		},
		{
			name: 'Monto',
			selector: 'monto',
			sortable: true,
			compact: true,
			width: '70px'
		},
		{
			name: 'Vendedor',
			selector: 'vendedor',
			sortable: true,
			compact: true,
			width: '70px'
		},
		{
			name: 'Nombre',
			selector: 'nombre_vendedor',
			sortable: true,
			compact: true,
			width: '150px'
		},
		{
			name: 'Nota',
			selector: 'nota',
			compact: true,
			width: '250px'
		}
	];

	const colPedidosProductos = [
		{
			name: 'Pedido',
			selector: 'pedido',
			sortable: true,
			compact: true,
			width: '100px'
		},
		{
			name: 'Linea',
			selector: 'pedido_linea',
			sortable: true,
			compact: true,
			width: '25px'
		},
		{
			name: 'Bodega',
			selector: 'bodega',
			sortable: true,
			compact: true,
			width: '70px'
		},
		{
			name: 'Lote',
			selector: 'lote',
			sortable: true,
			compact: true,
			width: '70px'
		},
		{
			name: 'Articulo',
			selector: 'articulo',
			sortable: true,
			compact: true,
			width: '70px'
		},
		{
			name: 'Descripcion',
			selector: 'DESCRIPCION',
			sortable: true,
			compact: true,
			width: '350px'
		},
		{
			name: 'Cantidad Pedida',
			selector: 'cantidad_pedida',
			sortable: true,
			compact: true,
			width: '70px'
		},
		{
			name: 'Cantidad A Facturar',
			selector: 'cantidad_a_facturar',
			sortable: true,
			compact: true,
			width: '100px'
		},
		{
			name: 'Cantidad  Bonificada',
			selector: 'cantidad_bonificad',
			sortable: true,
			compact: true,
			width: '100px'
		},
		{
			name: 'Ubicacion',
			selector: 'ubicacion',
			sortable: true
		}
	];

	const HangleImpresion = (idTicket) => {
		setDataIdTicket(idTicket);
		setImpresion(true);
	};

	const cambioEstado02 = async (id, e) => {
		e.preventDefault();
		swal({
			title: 'Ir a Preparar?',
			text: 'Cambiara de Estado el Ticket a Preparando',
			icon: 'warning',
			buttons: [ 'Proceder', 'Cancelar' ],
			dangerMode: true
		}).then((willDelete) => {
			if (!willDelete) {
				var url = Global.url;
				var request = `/ticketEstado/${id} `;

				axios.put(url + request, { estado: '02' }).then((resp) => {});
			}
		});
	};
	const cambioEstado03 = (id, e) => {
		e.preventDefault();
		swal({
			title: 'Ir a Revision?',
			text: 'Cambiara de Estado el Ticket a Revision',
			icon: 'warning',
			buttons: [ 'Proceder', 'Cancelar' ],
			dangerMode: true
		}).then((willDelete) => {
			if (!willDelete) {
				var url = Global.url;
				var request = `/ticketEstado/${id} `;

				axios.put(url + request, { estado: '03' }).then((resp) => {});
			}
		});
	};

	const cambioEstado04 = (id, e) => {
		e.preventDefault();
		swal({
			title: 'Ir a Cerrar?',
			text: 'Cambiara de Estado el Ticket a Cerrado',
			icon: 'warning',
			buttons: [ 'Proceder', 'Cancelar' ],
			dangerMode: true
		}).then((willDelete) => {
			if (!willDelete) {
				var url = Global.url;
				var request = `/ticketEstado/${id} `;

				axios.put(url + request, { estado: '04' }).then((resp) => {});
			}
		});
	};
	const verModal = async (id, e) => {
		e.preventDefault();

		ConsultarTicketPedidos(id);
		ConsultarTicketProductos(id);
		setModalTicket(true);
	};
	const ConsultarTicketPedidos = async (id) => {
		var url = Global.url;
		var request = `/ticketPedidos/${id}`;
		console.log(request);
		await axios.get(url + request).then((resp) => {
			setDataPedidos(resp.data);
		});
	};
	const ConsultarTicketProductos = async (id) => {
		var url = Global.url;
		var request = `/ticketProductos/${id}`;
		await axios.get(url + request).then((resp) => {
			setDataProductos(resp.data);
		});
	};
	return (
		<React.Fragment>
			{fbb.estado === '01' && (
				<div className="small-box bg-success">
					<div className="inner">
						<Button className="bg-success" onClick={() => HangleImpresion(fbb.ticket)}>
							Imprimir
						</Button>
						<Row>
							<Col>
								<h4>
									{' '}
									T.Trancurrido :
									<Moment interval={1000} fromNow>
										{fecha}
									</Moment>{' '}
									Min
								</h4>
							</Col>
						</Row>
						<Row>
							<Col>
								<h3>Ticket:{fbb.ticket}</h3>
							</Col>
						</Row>

						<p>Preprarador:{fbb.nombre}</p>
						<p>
							Fecha Cargado:<Moment format="DD/MM/YYYY h:mm">{fbb.fecha_inicio}</Moment>{' '}
						</p>
						<p>Cantidad Pedidos: {fbb.cant_pedido}</p>
						<p>Ubicacion: {fbb.ubicacion}</p>
					</div>
					<div className="icon">
						<i className="ion ion-bag" />
					</div>
					<a onClick={(e) => cambioEstado02(fbb.ticket, e)} href={url} className="small-box-footer">
						Ir a Preparar
					</a>
					<a href={url} onClick={(e) => verModal(fbb.ticket, e)} className="small-box-footer">
						Ver Mas Informacion <i className="fas fa-arrow-circle-right" />
					</a>
				</div>
			)}
			{fbb.estado === '02' && (
				<div className="small-box bg-warning">
					<div className="inner">
						<Button className="bg-warning" onClick={() => HangleImpresion(fbb.ticket)}>
							Imprimir
						</Button>
						<Col>
							<h4>
								{' '}
								Tiempo Trancurrido :
								<Moment diff={fecha} unit="hours">
									{now}
								</Moment>{' '}
								Horas
							</h4>
						</Col>
						<Row>
							<Col>
								<h3>Ticket:{fbb.ticket}</h3>
							</Col>
						</Row>
						<p>Preprarador:{fbb.nombre}</p>
						<p>
							Tiempo Preparacion: <Moment format="DD/MM/YYYY h:mm">
								{fbb.fecha_inicio_preparacion}
							</Moment>{' '}
						</p>
						<p>Cantidad Pedidos: {fbb.cant_pedido}</p>
						<p>Ubicacion: {fbb.ubicacion}</p>
					</div>
					<div className="icon">
						<i className="ion ion-bag" />
					</div>
					<a onClick={(e) => cambioEstado03(fbb.ticket, e)} href={url} className="small-box-footer">
						Preparando
					</a>
					<a href={url} onClick={(e) => verModal(fbb.ticket, e)} className="small-box-footer">
						Ver Mas Informacion <i className="fas fa-arrow-circle-right" />
					</a>
				</div>
			)}
			{fbb.estado === '03' && (
				<div key={fbb.ticket} className="small-box  bg-danger">
					<div className="inner">
						<Button className="bg-danger" onClick={() => HangleImpresion(fbb.ticket)}>
							Imprimir
						</Button>
						<Col>
							<h4>
								{' '}
								Tiempo Trancurrido :
								<Moment diff={fecha} unit="hours">
									{now}
								</Moment>{' '}
								Horas
							</h4>
						</Col>
						<Row>
							<Col>
								<h3>Ticket:{fbb.ticket}</h3>
							</Col>
						</Row>
						<p>Preprarador:{fbb.nombre}</p>
						<p>
							Fecha Cargado:<Moment format="DD/MM/YYYY, h:mm">{fbb.fecha_inicio}</Moment>
						</p>
						<p>Cantidad Pedidos: {fbb.cant_pedido}</p>
						<p>Ubicacion: {fbb.ubicacion}</p>
					</div>
					<div className="icon">
						<i className="ion ion-bag" />
					</div>
					<a onClick={(e) => cambioEstado04(fbb.ticket, e)} href={url} className="small-box-footer">
						En Revisión
					</a>
					<a href={url} onClick={(e) => verModal(fbb.ticket, e)} className="small-box-footer">
						Ver Mas Informacion <i className="fas fa-arrow-circle-right" />
					</a>
				</div>
			)}

			<Modal size="xl" show={modalTicket} dialogClassName="modal-90w">
				<ModalHeader>
					<div>
						<h3>Ticket </h3>
					</div>
				</ModalHeader>
				<ModalBody>
					<Form>
						<DataTable title="Pedidos" columns={colPedidos} data={dataPedidos} pagination />
						<br />
						<DataTable title="Detalle" columns={colPedidosProductos} data={dataProductos} pagination />
					</Form>
				</ModalBody>
				<ModalFooter>
					<button className="btn btn-danger" onClick={() => setModalTicket(false)}>
						cancelar
					</button>
				</ModalFooter>
			</Modal>
			<Modal size="lg" show={impresion}>
				<ModalHeader>
					<div>
						<h3>Ticket {dataIdTicket} </h3>
					</div>
				</ModalHeader>
				<ModalBody>
					<Form />
					<Impresion idTicket={dataIdTicket} />
				</ModalBody>
				<ModalFooter>
					<button className="btn btn-danger" onClick={() => setImpresion(false)}>
						cancelar
					</button>
				</ModalFooter>
			</Modal>
		</React.Fragment>
	);
}
