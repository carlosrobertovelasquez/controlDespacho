import React, { useState } from 'react';
import Moment from 'react-moment';
import { Modal, ModalBody, ModalFooter, Form, Row, Col, Button } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/ModalHeader';
import swal from 'sweetalert';
import axios from 'axios';
import Global from '../../Global';
import Impresion from '../../components/factura/ImpresionFlete';
import DataTable from 'react-data-table-component';
import useTimeAgo from '../../hooks/useTimeAgo';

export default function Tickets({ fbb }) {
	//Moment.duration(now.diff(end, 'hours'));
	let url = '';
	const [ dataIdTicket, setDataIdTicket ] = useState('');
	const [ impresion, setImpresion ] = useState(false);
	const [ modalFlete, setModalFlete ] = useState(false);
	const [ dataFacturas, setDataFacturas ] = useState([]);
	const formato = Global.formatoISO;
	const Currency = Global.currency;

	const montoTotal = new Intl.NumberFormat({ formato }, { style: 'currency', currency: `${Currency}` }).format(
		fbb.montototal
	);
	const colFactura = [
		{
			name: 'Factura',
			selector: 'factura',
			sortable: true,
			compact: true,
			width: '10%'
		},
		{
			name: 'Fecha',
			selector: 'fecha',
			sortable: true,
			compact: true,
			cell: (row) => <Moment format="DD/MM/YYYY">{row.fecha}</Moment>,
			width: '10%'
		},
		{
			name: 'Cliente',
			selector: 'cliente',
			sortable: true,
			compact: true,
			width: '10%'
		},
		{
			name: 'Nombre',
			selector: 'nombre',
			sortable: true,
			compact: true,
			width: '45%'
		},
		{
			name: 'Monto',
			selector: 'total',
			sortable: true,
			compact: true,
			width: '10%',
			cell: (row) =>
				new Intl.NumberFormat({ formato }, { style: 'currency', currency: `${Currency}` }).format(row.total)
		}
	];

	const HangleImpresion = (idTicket) => {
		console.log(idTicket);
		setDataIdTicket(idTicket);
		setImpresion(true);
	};

	const cambioEstado02 = async (id, e) => {
		e.preventDefault();

		swal({
			title: 'Ir a Ruta?',
			text: 'Cambiara de Estado el Flete ir a Ruta',
			icon: 'warning',
			buttons: [ 'Proceder', 'Cancelar' ],
			dangerMode: true
		}).then((willDelete) => {
			if (!willDelete) {
				var url = Global.url;
				var request = `/fleteEstado/${id} `;

				axios.put(url + request, { estado: '02' }).then((resp) => {});
			}
		});
	};
	const cambioEstado03 = (id, e) => {
		e.preventDefault();
		swal({
			title: 'Por Liquidar?',
			text: 'Cambiara de Estado del Flete Por Liquidar',
			icon: 'warning',
			buttons: [ 'Proceder', 'Cancelar' ],
			dangerMode: true
		}).then((willDelete) => {
			if (!willDelete) {
				var url = Global.url;
				var request = `/fleteEstado/${id} `;

				axios.put(url + request, { estado: '03' }).then((resp) => {});
			}
		});
	};

	const cambioEstado04 = (id, e) => {
		e.preventDefault();
		/*
		swal({
			title: 'Pasar a  Liquidar?',
			text: 'Cambiara de Estado el Flete a Liqudiar',
			icon: 'warning',
			buttons: [ 'Proceder', 'Cancelar' ],
			dangerMode: true
		}).then((willDelete) => {
			if (!willDelete) {
				var url = Global.url;
				var request = `/fleteEstado/${id} `;
				axios.put(url + request, { estado: '04' }).then((resp) => {});
			}
		});
		*/
	};
	const verModal = async (id, e) => {
		e.preventDefault();
		console.log(id);
		ConsultarFleteFacturas(id);

		setModalFlete(true);
	};
	const ConsultarFleteFacturas = async (id) => {
		var url = Global.url;
		var request = `/detalleFlete/${id}`;
		await axios.get(url + request).then((resp) => {
			setDataFacturas(resp.data.datos);
		});
	};

	return (
		<React.Fragment>
			{fbb.estado === '01' && (
				<div className="small-box bg-success">
					<div className="inner">
						<Button className="bg-success" onClick={() => HangleImpresion(fbb.flete)}>
							Imprimir
						</Button>
						<Row>
							<Col>
								<h4> T.Trancurrido :</h4>
							</Col>
						</Row>
						<Row>
							<Col>
								<h3>Flete:{fbb.flete}</h3>
							</Col>
						</Row>

						<p style={{ margin: '0px' }}>Motorista :{fbb.nombre}</p>
						<p style={{ margin: '0px' }}>Vehiculo</p>
						<p style={{ margin: '0px' }}>
							Placa:{fbb.placa} Modelo:{fbb.modelo}
						</p>

						<p style={{ margin: '0px' }}>Cantidad Facturas: {fbb.numerofacturas}</p>
						<p style={{ margin: '0px' }}>Monto Total: {montoTotal}</p>
						<p>
							Fecha :<Moment format="DD/MM/YYYY h:mm">{fbb.fecha}</Moment>{' '}
						</p>
					</div>
					<div className="icon">
						<i className="ion ion-bag" />
					</div>
					<a onClick={(e) => cambioEstado02(fbb.flete, e)} href={url} className="small-box-footer">
						Ir a Ruta
					</a>
					<a href={url} onClick={(e) => verModal(fbb.flete, e)} className="small-box-footer">
						Ver Mas Informacion <i className="fas fa-arrow-circle-right" />
					</a>
				</div>
			)}
			{fbb.estado === '02' && (
				<div className="small-box bg-warning">
					<div className="inner">
						<Button className="bg-warning" onClick={() => HangleImpresion(fbb.flete)}>
							Imprimir
						</Button>
						<Col>
							<h4> Tiempo Trancurrido :</h4>
						</Col>
						<Row>
							<Col>
								<h3>Ticket:{fbb.flete}</h3>
							</Col>
						</Row>
						<p style={{ margin: '0px' }}>Motorista :{fbb.nombre}</p>
						<p style={{ margin: '0px' }}>Vehiculo</p>
						<p style={{ margin: '0px' }}>
							Placa:{fbb.placa} Modelo:{fbb.modelo}
						</p>
						<p style={{ margin: '0px' }}>Cantidad Facturas: {fbb.numerofacturas}</p>
						<p style={{ margin: '0px' }}>Monto Total: {montoTotal}</p>
						<p>
							Fecha :<Moment format="DD/MM/YYYY h:mm">{fbb.fecha}</Moment>{' '}
						</p>
					</div>
					<div className="icon">
						<i className="ion ion-bag" />
					</div>
					<a onClick={(e) => cambioEstado03(fbb.flete, e)} href={url} className="small-box-footer">
						En Ruta
					</a>
					<a href={url} onClick={(e) => verModal(fbb.flete, e)} className="small-box-footer">
						Ver Mas Informacion <i className="fas fa-arrow-circle-right" />
					</a>
				</div>
			)}
			{fbb.estado === '03' && (
				<div key={fbb.flete} className="small-box  bg-danger">
					<div className="inner">
						<Button className="bg-danger" onClick={() => HangleImpresion(fbb.flete)}>
							Imprimir
						</Button>
						<Col>
							<h4> Tiempo Trancurrido :</h4>
						</Col>
						<Row>
							<Col>
								<h3>Ticket:{fbb.flete}</h3>
							</Col>
						</Row>
						<p style={{ margin: '0px' }}>Motorista :{fbb.nombre}</p>
						<p style={{ margin: '0px' }}>Vehiculo</p>
						<p style={{ margin: '0px' }}>
							Placa:{fbb.placa} Modelo:{fbb.modelo}
						</p>
						<p style={{ margin: '0px' }}>Cantidad Facturas: {fbb.numerofacturas}</p>
						<p style={{ margin: '0px' }}>Monto Total: {montoTotal}</p>
						<p>
							Fecha :<Moment format="DD/MM/YYYY h:mm">{fbb.fecha}</Moment>{' '}
						</p>
					</div>
					<div className="icon">
						<i className="ion ion-bag" />
					</div>
					<a onClick={(e) => cambioEstado04(fbb.flete, e)} href={url} className="small-box-footer">
						Por Liquidar
					</a>
					<a href={url} onClick={(e) => verModal(fbb.flete, e)} className="small-box-footer">
						Ver Mas Informacion <i className="fas fa-arrow-circle-right" />
					</a>
				</div>
			)}

			<Modal size="xl" show={modalFlete} dialogClassName="modal-90w">
				<ModalHeader>
					<div>
						<h3>Flete </h3>
					</div>
				</ModalHeader>
				<ModalBody>
					<Form>
						<DataTable title="Facturas" columns={colFactura} data={dataFacturas} pagination />
						<br />
					</Form>
				</ModalBody>
				<ModalFooter>
					<button className="btn btn-danger" onClick={() => setModalFlete(false)}>
						cancelar
					</button>
				</ModalFooter>
			</Modal>
			<Modal size="lg" show={impresion}>
				<ModalHeader>
					<div>
						<h3>Flete {dataIdTicket} </h3>
					</div>
				</ModalHeader>
				<ModalBody>
					<Form />
					<Impresion flete={dataIdTicket} />
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
