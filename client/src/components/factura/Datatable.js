import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalBody, ModalFooter, Form, Row, Col } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/ModalHeader';
import DataTable from 'react-data-table-component';
import Moment from 'react-moment';
import Global from '../../Global';
import axios from 'axios';
import swal from 'sweetalert';
import Impresion from '../../components/factura/ImpresionFlete';
import useAuth from '../../hooks/useAuth';
export default function Datatable({ data }) {
	console.log('hijo', data);
	const [ dataPedido, setDataPedido ] = useState([]);
	const [ dataLineaPedido, setDataLineaPedido ] = useState([]);
	const [ modalEditar, setModalEditar ] = useState(false);
	const [ carro, setCarro ] = useState([]);
	const [ modalVerCarro, setModalVerCarro ] = useState(false);
	const [ dataAyudantes, setDataAyudantes ] = useState([]);
	const [ dataVehiculos, setDataVehiculos ] = useState([]);
	const [ formularioTicket, setFormularioTicket ] = useState({ preparador: '', vehiculo: '' });

	const [ kinicial, setKInicial ] = useState(0);
	const [ kfinal, setKfinal ] = useState(0);

	const [ searchResults, setSearchResults ] = useState(data);
	const [ searchTerm, setSearchTerm ] = useState('');
	const [ impresion, setImpresion ] = useState(false);
	const [ idTicket, setIdTicket ] = useState('');
	const { auth } = useAuth();
	const { name } = auth;

	const formato = Global.formatoISO;
	const Currency = Global.currency;

	useEffect(() => {
		//const result = data.filter((cliente) => cliente.NOMBRE.toLowerCase().includes(searchTerm));
		setSearchResults(data);
	}, []);

	//setSearchResults(data);

	const columnas = [
		{
			name: 'Factura',
			selector: 'factura',
			sortable: true,
			compact: true,
			width: '8%'
		},
		{
			name: 'Fecha_Fact.',
			selector: 'fecha',
			sortable: true,
			cell: (row) => <Moment format="DD/MM/YYYY">{row.fecha}</Moment>,
			compact: true,
			width: '8%'
		},
		{
			name: 'Cliente',
			selector: 'cliente_origen',
			sortable: true,
			compact: true,
			width: '5%'
		},
		{
			name: 'Nombre',
			selector: 'NOMBRE',
			sortable: true,
			compact: true,
			width: '16%'
		},
		{
			name: 'Direccion',
			selector: 'DIRECCION',
			sortable: true,
			compact: true,
			width: '32%'
		},

		{
			name: 'Total',
			selector: 'total_factura',
			sortable: true,
			compact: true,
			width: '8%',
			cell: (row) =>
				new Intl.NumberFormat({ formato }, { style: 'currency', currency: `${Currency}` }).format(
					row.total_factura
				)
		},
		{
			name: 'CondicionPago',
			selector: 'condicion_pago',
			sortable: true,
			compact: true,
			width: '10%'
		},
		{
			name: 'Ver',
			selector: 'ver',

			ignoreRowClick: true,
			cell: (row) => (
				<Button className="btn btn-primary" onClick={(e) => selecionarPedido(row, e)}>
					Ver
				</Button>
			),
			compact: true,
			width: '6%'
		},
		{
			name: 'Agrear',
			selector: 'agregar',

			ignoreRowClick: true,
			cell: (row) => (
				<Button className="btn btn-danger" onClick={(e) => Carro(row, e)}>
					Agregar
				</Button>
			),
			compact: true,
			width: '10%'
		}
	];
	const carroDataTable = [
		{
			name: 'Factura',
			selector: 'factura',
			sortable: true,
			compact: true,
			width: '11%'
		},
		{
			name: 'Fecha_Fact.',
			selector: 'fecha_hora_pedido',
			sortable: true,
			compact: true,
			width: '10%',
			cell: (row) => <Moment format="DD/MM/YYYY">{row.fecha_hora_pedido}</Moment>
		},
		{
			name: 'Cliente',
			selector: 'cliente_origen',
			sortable: true,
			compact: true,
			width: '8%'
		},
		{
			name: 'Nombre',
			selector: 'NOMBRE',
			sortable: true,
			compact: true,
			width: '34%'
		},
		{
			name: 'Total',
			selector: 'total_factura',
			sortable: true,
			compact: true,
			width: '12%',
			cell: (row) =>
				new Intl.NumberFormat({ formato }, { style: 'currency', currency: `${Currency}` }).format(
					row.total_factura
				)
		},

		{
			name: 'CondicionPago',
			selector: 'condicion_pago',
			sortable: true,
			compact: true,
			width: '4%'
		},

		{
			name: 'Ver',
			selector: 'ver',
			right: true,
			ignoreRowClick: true,
			cell: (row) => (
				<Button className="btn btn-primary" onClick={(e) => selecionarPedido(row, e)}>
					Ver
				</Button>
			),
			compact: true,
			width: '12%'
		},
		{
			name: 'Eliminar',
			selector: 'eliminar',

			ignoreRowClick: true,
			cell: (row) => (
				<Button className="btn btn-danger " onClick={(e) => eliminarPedidoCarro(row, e)}>
					Eliminar
				</Button>
			),
			compact: true,
			width: '13%'
		}
	];

	const lineaPedido = [
		{
			name: 'Articulo',
			selector: 'ARTICULO',
			sortable: true,
			compact: true,
			width: '8%'
		},
		{
			name: 'Lote',
			selector: 'LOTE',
			sortable: true,
			compact: true,
			width: '6%'
		},
		{
			name: 'Descripción',
			selector: 'DESCRIPCION',
			sortable: true,
			compact: true,
			width: '45%'
		},
		{
			name: 'Cantidad Pedida',
			selector: 'CANTIDAD_PEDIDA',
			sortable: true,
			compact: true,
			width: '10%'
		},
		{
			name: 'Cantidad a Facturar',
			selector: 'CANTIDAD_A_FACTURA',
			sortable: true,
			compact: true,
			width: '11%'
		},
		{
			name: 'Cantidad Bonificada',
			selector: 'CANTIDAD_BONIFICAD',
			sortable: true,
			compact: true,
			width: '12%'
		}
	];

	const Carro = async (row, e) => {
		await agregarCarro(row);
	};

	const agregarCarro = async (selection) => {
		const existe = carro.findIndex((x) => x.factura === selection.factura);

		if (existe === -1) {
			setCarro([ ...carro, selection ]);
		} else {
			swal({
				title: 'Error',
				text: `Factura ${selection.factura} ya Fue agregada a Canasta`,
				icon: 'error',
				button: 'Aceptar'
			});
		}

		//Eliminamos de la tabla principal

		const newDatos = searchResults.filter((data) => data.factura !== selection.factura);
		setSearchResults(newDatos);
		//Actualizamos tabla de TcargaPedidos temporal x para que no lo tome otro usuario
	};

	const eliminarPedidoCarro = async (selection) => {
		//Quitamos pedido del carro
		const newCarro = carro.filter((data) => data.factura !== selection.factura);
		setCarro(newCarro);

		//refrescar datos Generales
		ActualizarDatos();
	};

	const ActualizarDatos = () => {
		var url = Global.url;
		var request = '/facturasDespacho';
		const fecthPedidos = async () => {
			await axios.get(url + request).then((resp) => {
				setSearchResults(resp.data);
			});
		};
		fecthPedidos();
	};

	const selecionarPedido = async (row, e) => {
		await pedidoLinea(row.pedidos);
		await pedido(row.pedidos);

		setModalEditar(true);
		//Detalle de pedido

		//	caso === 'Editar' && setModalEditar(true);
	};

	const pedidoLinea = async (pedido) => {
		var url = Global.url;
		var request = `/pedidoD/${pedido}`;

		//Detalle de pedido
		await axios.get(url + request).then((resp) => {
			const result = resp.data;
			setDataLineaPedido(result);
		});
	};

	const pedido = async (pedido) => {
		var url = Global.url;
		var request = `/pedido/${pedido}`;

		//Encabezado de pedido
		await axios.get(url + request).then((resp) => {
			const result = resp.data;
			setDataPedido(result);
		});
	};

	const verModalCarro = () => {
		datosMotoristas();
		datosVehiculos();
		setModalVerCarro(true);
	};

	//llenar Motoristas
	const datosMotoristas = async () => {
		var url = Global.url;
		var request = '/motoristas';

		await axios.get(url + request).then((resp) => {
			const result = resp.data;
			const newdata = result.filter((datos) => datos.estado === 'A');
			setDataAyudantes(newdata);
		});
	};

	const datosVehiculos = async () => {
		var url = Global.url;
		var request = '/vehiculos';
		await axios.get(url + request).then((resp) => {
			const result = resp.data;
			const newdata = result.filter((datos) => datos.estado === 'A');
			setDataVehiculos(newdata);
		});
	};

	const handleInputChange = (event) => {
		setFormularioTicket({
			...formularioTicket,
			[event.target.name]: event.target.value
		});

		if (event.target.name === 'vehiculo') {
			vehiculobyid(event.target.value);
		}
	};

	const vehiculobyid = (id) => {
		if (id === '') {
			setKInicial(0);
			setKfinal(0);
		} else {
			const vehiculoId = dataVehiculos.filter((data) => data.id === parseInt(id));
			setKInicial(vehiculoId[0].kinicial);
			setKfinal(vehiculoId[0].kfinal);
		}
	};

	const guardarFlete = async () => {
		if (
			formularioTicket.preparador === 'ND' ||
			formularioTicket.preparador === '' ||
			formularioTicket.vehiculo === ''
		) {
			swal({ title: 'Error', text: 'Selecione un Motorista o Vehiculo', icon: 'error', button: 'Aceptar' });
		} else {
			var url = Global.url;
			var request = '/createFlete';

			//Detalle de Flete

			await axios
				.post(url + request, {
					motorista: formularioTicket.preparador,
					vehiculo: formularioTicket.vehiculo,
					cantFacturas: carro.length,
					kinicial,
					kfinal,
					usuarioCreacion: name
				})
				.then((resp) => {
					const result = resp.data.datos;
					guardarFleteFacturas(result);

					swal({
						title: 'Flete Creado con Exito',
						text: `Numero de Flete: ${result.toString()}`,
						icon: 'success',
						button: 'Aceptar'
					});
					setIdTicket(result);
					setCarro([]);
					setModalVerCarro(false);
					setImpresion(true);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	const guardarFleteFacturas = async (flete) => {
		var url = Global.url;
		var request = '/createFleteFacturas';
		await axios
			.post(url + request, {
				flete,
				facturas: carro
			})
			.then((resp) => {
				console.log(resp);
			});
	};
	const handleChange = (event) => {
		setSearchTerm(event.target.value.toLowerCase());
	};
	const handleChangeKI = (event) => {
		if (parseInt(kfinal) <= parseInt(event.target.value)) {
			swal('Alerta!', 'Kilometraje Inicla no puede ser Mayor', 'error');
		} else {
			setKInicial(event.target.value);
		}
	};
	const handleChangeKF = (event) => {
		if (parseInt(kinicial) >= parseInt(event.target.value)) {
			swal('Alerta!', 'Kilometraje Final no puede ser menor', 'error');
		} else {
			setKfinal(event.target.value);
		}
	};

	return (
		<React.Fragment>
			<section className="content">
				<div className="row">
					<div className="col-12">
						<div className="card">
							<div className="card-body">
								{carro.length > 0 ? (
									<Button variant="success" onClick={() => verModalCarro()}>
										Generar Flete {carro.length}
									</Button>
								) : null}

								<DataTable columns={columnas} data={searchResults} pagination />
							</div>
						</div>
					</div>
				</div>

				<Modal size="xl" show={modalEditar} dialogClassName="modal-90w">
					<ModalHeader>
						<div>
							<h3>Factura {dataPedido.PEDIDO} </h3>
						</div>
					</ModalHeader>
					<ModalBody>
						<Form>
							<Row>
								<Col>
									<Form.Label column sm="2">
										Cliente:
									</Form.Label>
								</Col>
								<Col sm="2">
									<Form.Control name="Cliente" readOnly value={dataPedido.CLIENTE_ORIGEN} />
								</Col>

								<Col column sm="2">
									<Form.Label>Nombre:</Form.Label>
								</Col>
								<Col sm="6">
									<Form.Control name="nombre" readOnly value={dataPedido.NOMBRE} />
								</Col>
							</Row>
							<Row>
								<Col>
									<Form.Label>Direccion:</Form.Label>
								</Col>
								<Col sm="10">
									<Form.Control
										readOnly
										name="direccion"
										type="text"
										value={dataPedido.DIRECCION_FACTURA}
									/>
								</Col>
							</Row>
							<Row>
								<Col>
									<Form.Label>Observaciones:</Form.Label>
									<Form.Control readOnly name="observaciones" value={dataPedido.OBSERVACIONES} />
								</Col>
							</Row>
							<br />
							<DataTable columns={lineaPedido} data={dataLineaPedido} pagination />
						</Form>
					</ModalBody>
					<ModalFooter>
						<button className="btn btn-danger" onClick={() => setModalEditar(false)}>
							cancelar
						</button>
					</ModalFooter>
				</Modal>
				<Modal size="lg" show={modalVerCarro} dialogClassName="modal-90w">
					<ModalHeader>
						<div>
							<h3>Flete </h3>
						</div>
					</ModalHeader>
					<ModalBody>
						<Form>
							<Row>
								<Col column sm="6">
									<Form.Label column sm="2">
										Transportista:
									</Form.Label>
									<select
										name="preparador"
										className="form-control"
										value={formularioTicket.preparador}
										onChange={handleInputChange}
										required
									>
										<option value="">Seleciones un Transportista...</option>
										{dataAyudantes.map((fbb) => {
											return (
												<option key={fbb.id} value={fbb.id}>
													{fbb.dui}-{fbb.nombre}
												</option>
											);
										})}
									</select>
								</Col>

								<Col column sm="6">
									<Form.Label column sm="2">
										Vehiculo:
									</Form.Label>
									<select
										name="vehiculo"
										value={formularioTicket.vehiculo}
										className="form-control"
										onChange={handleInputChange}
										required
									>
										<option value="">Seleciones un Vehiculo...</option>
										{dataVehiculos.map((fbb) => {
											return (
												<option key={fbb.id} value={fbb.id}>
													{fbb.placa}-{fbb.modelo}
												</option>
											);
										})}
									</select>
								</Col>
							</Row>
							<br />
							<Row>
								<Col>
									<Form.Label column sm="6">
										Kilometraje Inicial:
									</Form.Label>
									<Form.Control
										name="kinicial"
										value={kfinal}
										min="1"
										type="number"
										readOnly
										onChange={handleChangeKI}
									/>
								</Col>
								<Col>
									<Form.Label column sm="6">
										Kilometraje Final:
									</Form.Label>
									<Form.Control
										type="number"
										name="kfinal"
										min="1"
										readOnly
										value={kfinal}
										onChange={handleChangeKF}
									/>
								</Col>
							</Row>
							<br />
							<DataTable columns={carroDataTable} data={carro} pagination />
						</Form>
					</ModalBody>
					<ModalFooter>
						<button className="btn btn-success " onClick={() => guardarFlete()}>
							Guardar
						</button>
						<button className="btn btn-danger" onClick={() => setModalVerCarro(false)}>
							cancelar
						</button>
					</ModalFooter>
				</Modal>
				<Modal size="lg" show={impresion}>
					<ModalHeader>
						<div>
							<h3>Flete {idTicket} </h3>
						</div>
					</ModalHeader>
					<ModalBody>
						<Form />
						<Impresion flete={idTicket} />
					</ModalBody>
					<ModalFooter>
						<button className="btn btn-danger" onClick={() => setImpresion(false)}>
							cancelar
						</button>
					</ModalFooter>
				</Modal>
			</section>
		</React.Fragment>
	);
}
