import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Global from '../../Global';
import Moment from 'react-moment';
import { Modal, ModalBody, ModalFooter, Form, Row, Col, Button, Container, Spinner } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/ModalHeader';
import Impresion from '../../components/Liquidacion/Impresion';
import useAuth from '../../hooks/useAuth';
import DataTable from 'react-data-table-component';
import swal from 'sweetalert';
export default function Index() {
	const [ data, setData ] = useState([]);
	const [ dataNew, setDataNew ] = useState([]);
	const [ datosModal, setDatosModal ] = useState([]);
	const [ datosModalFacturas, setDatosModalFacturas ] = useState([]);
	const [ datosModalLiquidar, setDatosModalLiquidar ] = useState([]);
	const [ modalVerFlete, setModalVerFlete ] = useState(false);
	const [ modalLiqudiacion, setModalLiqudiacion ] = useState(false);
	const [ modalLiqudiacionFactura, setModalLiqudiacionFactura ] = useState(false);
	const [ modalImpresion, setModalImpresion ] = useState(false);
	const [ formularioLiquidacion, setFormularioLiquidacion ] = useState({
		estado: 'L',
		operacion: 'Operacion Completa',
		observacion: '',
		kfinal: ''
	});
	const [ kfinal, setKfinal ] = useState('');
	const [ valorMinimo, setValorMinimo ] = useState('');
	const [ placaVehiculo, setPlacaVehiculo ] = useState('');

	const [ datosOperacionesActivo, setdatosOperacionesActivo ] = useState([]);
	const [ modalReasignar, setModalReasignar ] = useState(false);
	const [ fleteReasignar, setFleteReasignar ] = useState('');
	const { auth } = useAuth();
	const { name } = auth;

	const formato = Global.formatoISO;
	const Currency = Global.currency;
	useEffect(
		() => {
			const timer = setTimeout(() => {
				var url = Global.url;
				var request = '/getTodosFletes';
				const fecthPedidos = async () => {
					await axios.get(url + request).then((resp) => {
						setDataNew(resp.data.datos);
					});
				};
				fecthPedidos();
				const newdata = dataNew.filter((e) => e.estado === 'POR LIQUIDAR');
				setData(newdata);
			}, 1000);
			return () => clearTimeout(timer);
		},
		[ data, dataNew ]
	);

	const columnas = [
		{
			name: 'Flete',
			selector: 'flete',
			sortable: true,
			width: '10%'
		},
		{
			name: 'Fecha',
			selector: 'fecha',
			sortable: true,
			compact: true,
			width: '15%',
			cell: (row) => <Moment format="DD/MM/YYYY">{row.fecha}</Moment>
		},
		{
			name: 'Transportista',
			selector: 'nombre',
			sortable: true,
			compact: true,
			width: '15%'
		},
		{
			name: 'Placa',
			selector: 'placa',
			sortable: true,
			compact: true,
			width: '10%'
		},
		{
			name: 'Num.Fact',
			selector: 'numerofacturas',
			sortable: true,
			compact: true,
			width: '8%'
		},
		{
			name: 'T.Flete',
			selector: 'montototal',
			sortable: true,
			compact: true,
			width: '10%',
			cell: (row) =>
				new Intl.NumberFormat({ formato }, { style: 'currency', currency: `${Currency}` }).format(
					row.montototal
				)
		},
		{
			name: 'Estado',
			selector: 'estado',
			sortable: true,
			compact: true,
			width: '10%'
		},
		{
			name: 'Ver',
			selector: 'ver',
			right: true,
			ignoreRowClick: true,
			cell: (row) => (
				<Button className="btn btn-warning " onClick={(e) => selecionarVerFlete(row, e)}>
					Ver
				</Button>
			),
			compact: true,
			width: '5%'
		},
		{
			name: 'Liquidar',
			selector: 'liquidiar',
			right: true,
			ignoreRowClick: true,
			cell: (row) => (
				<Button className="btn btn-success" onClick={(e) => selecionarFleteLiquidar(row, e)}>
					Liquidar
				</Button>
			),
			compact: true,
			width: '6%'
		},
		{
			name: 'Imprimir',
			selector: 'Imprimir',
			right: true,
			ignoreRowClick: true,
			cell: (row) => (
				<Button className="btn btn-primary" onClick={(e) => selecionarFleteImprimir(row, e)}>
					Imprimir
				</Button>
			),
			compact: true,
			width: '6%'
		}
	];
	const colDetalleFlete = [
		{
			name: 'Flete',
			selector: 'flete',
			sortable: true,
			width: '10%'
		},
		{
			name: 'Fecha',
			selector: 'fecha',
			sortable: true,
			compact: true,
			width: '15%',
			cell: (row) => <Moment format="DD/MM/YYYY">{row.fecha}</Moment>
		},
		{
			name: 'Factura',
			selector: 'factura',
			sortable: true,
			compact: true,
			width: '15%'
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
			width: '25%'
		},
		{
			name: 'Total',
			selector: 'total',
			sortable: true,
			compact: true,
			width: '10%',
			cell: (row) =>
				new Intl.NumberFormat({ formato }, { style: 'currency', currency: `${Currency}` }).format(row.total)
		},
		{
			name: 'Estado',
			selector: 'estado',
			sortable: true,
			compact: true,
			width: '10%'
		}
	];

	const colDetalleFleteLiqui = [
		{
			name: 'Flete',
			selector: 'flete',
			sortable: true,
			width: '10%'
		},
		{
			name: 'Fecha',
			selector: 'fecha',
			sortable: true,
			compact: true,
			width: '15%',
			cell: (row) => <Moment format="DD/MM/YYYY">{row.fecha}</Moment>
		},
		{
			name: 'Factura',
			selector: 'factura',
			sortable: true,
			compact: true,
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
			width: '25%'
		},
		{
			name: 'Total',
			selector: 'total',
			sortable: true,
			compact: true,
			width: '10%',
			cell: (row) =>
				new Intl.NumberFormat({ formato }, { style: 'currency', currency: `${Currency}` }).format(row.total)
		},
		{
			name: 'Estado',
			selector: 'estado',
			sortable: true,
			compact: true,
			width: '6%'
		},

		{
			name: 'Liquidar',
			selector: 'liquidiar',
			right: true,
			ignoreRowClick: true,
			cell: (row) => (
				<Button className="btn btn-success" onClick={(e) => selecionarFacturaLiquidar(row, e)}>
					Liquidar
				</Button>
			),
			compact: true,
			width: '10%'
		}
	];

	const selecionarVerFlete = (row, e) => {
		setDatosModal(row);
		selecionarFlete(row.flete);
		setModalVerFlete(true);
	};
	const selecionarFleteLiquidar = (row, e) => {
		if (row.estado === 'POR LIQUIDAR') {
			setKfinal(row.Kfinal);
			setValorMinimo(row.Kfinal);
			setPlacaVehiculo(row.placa);
			selecionarFlete(row.flete);
			setModalLiqudiacion(true);
			getOperaciones();

			//Consultado la tabla de Observaciones
		} else {
			swal({
				title: 'Informacion ',
				text: 'Flete tiene que estar en estado Por Liquidar',
				icon: 'info',
				button: 'Aceptar'
			});
		}
	};

	const getOperaciones = async () => {
		var url = Global.url;
		var request = `/getOperacionesAll`;
		await axios.get(url + request).then((resp) => {
			const datos = resp.data.datos;

			newDatosOperaciones(datos);
		});
	};
	const newDatosOperaciones = (datos) => {
		const newDatos = datos.filter((x) => x.Estado === 'A');
		setdatosOperacionesActivo(newDatos);
	};

	const selecionarFlete = async (flete) => {
		var url = Global.url;
		var request = `/detalleFlete/${flete}`;
		await axios.get(url + request).then((resp) => {
			const datos = resp.data.datos;
			const newdata = datos.filter((x) => x.reasignada === '0');
			setDatosModalFacturas(newdata);
		});
	};

	const selecionarFacturaLiquidar = async (row, e) => {
		setDatosModal(row);
		setDatosModalLiquidar(row);
		setModalLiqudiacionFactura(true);
	};

	const handleInputChange = (event) => {
		setFormularioLiquidacion({
			...formularioLiquidacion,
			[event.target.name]: event.target.value
		});

		if (event.target.name === 'kfinal') {
			if (event.target.value !== '') {
				setKfinal(event.target.value);
			}
		}

		if (event.target.name === 'fleteReasignado') {
			if (event.target.value !== '') {
				setFleteReasignar(event.target.value);
				validarEstadoDelFlete(event.target.value);
			}
		}

		if (event.target.name === 'estado') {
			if (event.target.value === 'S') {
				setModalReasignar(true);
			}
		}
	};

	const validarEstadoDelFlete = async (flete) => {
		var url = Global.url;
		var request = `/encabezadoFlete/${flete}`;
		await axios.get(url + request).then((resp) => {
			const datos = resp.data.datos;
			if (datos) {
				if (datos.estado !== 'IR A RUTA') {
					swal({
						title: 'Informacion ',
						text: 'No esta en estado IR A RUTA',
						icon: 'info',
						button: 'Aceptar'
					});
				}
			} else {
				swal({
					title: 'Informacion ',
					text: 'Flete No existe',
					icon: 'info',
					button: 'Aceptar'
				});
			}
		});
	};
	const selecionarFleteImprimir = (row, e) => {
		setDatosModal(row);
		selecionarFlete(row.flete);
		setModalImpresion(true);
	};

	const setActualizarFlete = async (flete, factura) => {
		var url = Global.url;
		var request = `/updateFleteLiquidacion`;
		await axios
			.put(url + request, {
				dato: [ formularioLiquidacion ],
				flete: flete,
				factura: factura,
				name: name,
				placa: placaVehiculo
			})
			.then((resp) => {
				swal({
					title: 'Se Actualiza con exito ',
					text: `Se Liquida Factura # ${factura} en Flete Numero: ${flete}`,
					icon: 'info',
					button: 'Aceptar'
				});
			});

		setModalLiqudiacionFactura(false);
		//setModalLiqudiacion(false);
		NewArrayLiquidacion(flete);
	};

	const setReasignarFlete = async (fleteAntiguo, factura, nuevoFlete) => {
		var url = Global.url;
		var request = `/reasignarFlete`;
		await axios
			.put(url + request, {
				fleteOld: fleteAntiguo,
				factura: factura,
				name: name,
				fleteNew: nuevoFlete
			})
			.then((resp) => {
				swal({
					title: 'Se Actualiza con exito ',
					text: `Se Reasigna Factura # ${factura} del Flete : ${fleteAntiguo} Al Flete :${nuevoFlete}`,
					icon: 'info',
					button: 'Aceptar'
				});
			});

		setModalReasignar(false);
		setModalLiqudiacionFactura(false);

		NewArrayLiquidacion(fleteAntiguo);
	};

	const NewArrayLiquidacion = (flete) => {
		const newDatos = datosModalFacturas.filter((data) => data.factura !== datosModalLiquidar.factura);
		setDatosModalFacturas(newDatos);
		if (datosModalFacturas.length === 1) {
			setModalLiqudiacion(false);
		}
	};

	return (
		<React.Fragment>
			<div className="content-wrapper">
				<div className="content-header">
					<div className="container-fluid">
						<div className="row mb-2">
							<div className="col-sm-6">
								<h1 className="m-0 text-dark">Fletes a Liquidar</h1>
							</div>

							<div className="col-sm-6">
								<ol className="breadcrumb float-sm-right">
									<li className="breadcrumb-item">
										<a href="/">Inicio</a>
									</li>

									<li className="breadcrumb-item active">Flete a Liquidar</li>
								</ol>
							</div>
						</div>
					</div>
				</div>

				{data.length === 0 ? (
					<Container>
						<Row className="justify-content-md-center">
							<Spinner animation="border" role="status" />
						</Row>
						<Row className="justify-content-md-center">
							<span className="text-center">Cargando...</span>
						</Row>
					</Container>
				) : (
					<React.Fragment>
						<section className="content">
							<div className="row">
								<div className="col-12">
									<div className="card">
										<DataTable columns={columnas} data={data} pagination />
									</div>
								</div>
							</div>
						</section>
						<Modal size="xl" show={modalVerFlete} dialogClassName="modal-90w">
							<ModalHeader>
								<div>
									<h3>FLETE:{datosModal.flete} </h3>
								</div>
							</ModalHeader>
							<ModalBody>
								<Form>
									<Row>
										<Col>
											<Form.Label column sm="2">
												Vehiculo:
											</Form.Label>
										</Col>
										<Col sm="4">
											<Form.Control name="placa" readOnly value={datosModal.placa} />
										</Col>

										<Col sm="2">
											<Form.Label>Motorista:</Form.Label>
										</Col>
										<Col sm="4">
											<Form.Control name="motorista" readOnly value={datosModal.nombre} />
										</Col>
									</Row>
									<Row>
										<Col sm="2">
											<Form.Label>Kilometraje Inicial:</Form.Label>
										</Col>
										<Col sm="2">
											<Form.Control
												readOnly
												name="direccion"
												type="text"
												value={datosModal.kinicial}
											/>
										</Col>
										<Col>
											<Form.Label>Kilometraje Final:</Form.Label>
										</Col>
										<Col sm="2">
											<Form.Control
												readOnly
												name="direccion"
												type="text"
												value={datosModal.Kfinal}
											/>
										</Col>
										<Col>
											<Form.Label>Estado:</Form.Label>
										</Col>
										<Col sm="2">
											<Form.Control
												readOnly
												name="direccion"
												type="text"
												value={datosModal.estado}
											/>
										</Col>
									</Row>

									<br />
									<DataTable columns={colDetalleFlete} data={datosModalFacturas} pagination />
								</Form>
							</ModalBody>
							<ModalFooter>
								<button className="btn btn-danger" onClick={() => setModalVerFlete(false)}>
									cerrar
								</button>
							</ModalFooter>
						</Modal>
						<Modal size="xl" show={modalLiqudiacion} dialogClassName="modal-90w">
							<ModalHeader>
								<div>
									<h3>Liquidar </h3>
								</div>
							</ModalHeader>
							<ModalBody>
								<Form>
									<br />
									<DataTable columns={colDetalleFleteLiqui} data={datosModalFacturas} pagination />
								</Form>
							</ModalBody>
							<ModalFooter>
								<button className="btn btn-danger" onClick={() => setModalLiqudiacion(false)}>
									cerrar
								</button>
							</ModalFooter>
						</Modal>
						<Modal size="md" show={modalLiqudiacionFactura} dialogClassName="modal-90w">
							<ModalHeader>
								<div>
									<h3> Flete: {datosModalLiquidar.flete} </h3>
									<h3> Liquidación Doc: {datosModalLiquidar.factura} </h3>
								</div>
							</ModalHeader>
							<ModalBody>
								<Form>
									<Row>
										<Col sm="3">
											<Form.Label>Estado :</Form.Label>
										</Col>
										<Col sm="6">
											<select
												class="form-select form-select-lg mb-3"
												aria-label=".form-select-lg example"
												name="estado"
												value={formularioLiquidacion.estado}
												onChange={handleInputChange}
											>
												<option value="L">Liquidado</option>
												<option value="P">Pendiente Liquidar</option>
												<option value="R">Anulado</option>
												<option value="S">Reasignado</option>
											</select>
										</Col>
									</Row>
									<br />
									<Row>
										<Col sm="3">
											<Form.Label>Operaciones:</Form.Label>
										</Col>
										<Col sm="6">
											<select
												class="form-select form-select-lg mb-3"
												aria-label=".form-select-lg example"
												name="operacion"
												value={formularioLiquidacion.operacion}
												onChange={handleInputChange}
											>
												{datosOperacionesActivo.map((fbb) => {
													return (
														<option key={fbb.id} value={fbb.Descripcion}>
															{fbb.Descripcion}
														</option>
													);
												})}
											</select>
										</Col>
										<Col sm="12">
											<Form.Label>Observaciones:</Form.Label>
											<Form.Control
												as="textarea"
												name="observacion"
												value={formularioLiquidacion.observacion}
												onChange={handleInputChange}
											/>
										</Col>
										<Col sm="12">
											<Form.Label>Kilometraje Final:</Form.Label>
											<Form.Control
												type="number"
												name="kfinal"
												min={valorMinimo}
												onChange={handleInputChange}
												value={kfinal}
											/>
										</Col>
									</Row>
									<br />
								</Form>
							</ModalBody>
							<ModalFooter>
								<button
									className="btn  btn-success"
									onClick={() =>
										setActualizarFlete(datosModalLiquidar.flete, datosModalLiquidar.factura)}
								>
									Actualizar
								</button>
								<button className="btn btn-danger" onClick={() => setModalLiqudiacionFactura(false)}>
									cerrar
								</button>
							</ModalFooter>
						</Modal>
						<Modal size="ms" show={modalReasignar} dialogClassName="modal-90w">
							<ModalHeader>
								<div>
									<h3> Flete: {datosModalLiquidar.flete} </h3>
									<h3> Liquidación Doc: {datosModalLiquidar.factura} </h3>
								</div>
							</ModalHeader>
							<ModalBody>
								<Form>
									<Row>
										<Col sm="12">
											<Form.Label>Flete a Reasignar</Form.Label>
											<Form.Control
												type="number"
												name="fleteReasignado"
												value={fleteReasignar}
												onChange={handleInputChange}
											/>
										</Col>
									</Row>
									<br />
								</Form>
							</ModalBody>
							<ModalFooter>
								<button
									className="btn  btn-success"
									onClick={() =>
										setReasignarFlete(
											datosModalLiquidar.flete,
											datosModalLiquidar.factura,
											fleteReasignar
										)}
								>
									Reasignar
								</button>
								<button className="btn btn-danger" onClick={() => setModalReasignar(false)}>
									cerrar
								</button>
							</ModalFooter>
						</Modal>
						<Modal size="lg" show={modalImpresion} dialogClassName="modal-90w">
							<ModalBody>
								<Form>
									<Impresion datosEncabezado={datosModal} datosDetalle={datosModalFacturas} />
									<br />
								</Form>
							</ModalBody>
							<ModalFooter>
								<button className="btn btn-danger" onClick={() => setModalImpresion(false)}>
									cerrar
								</button>
							</ModalFooter>
						</Modal>
					</React.Fragment>
				)}
			</div>
		</React.Fragment>
	);
}
