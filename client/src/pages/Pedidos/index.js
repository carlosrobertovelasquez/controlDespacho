import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Button, Modal, ModalBody, ModalFooter, Form, Row, Col } from 'react-bootstrap';
import Global from '../../Global';
import axios from 'axios';
import ModalHeader from 'react-bootstrap/ModalHeader';
import useAuth from '../../hooks/useAuth';
import swal from 'sweetalert';
import Impresion from '../../components/Ticket/impersionTicket';
import Moment from 'react-moment';

export default function Index() {
	const [ data, setData ] = useState([]);
	const [ dataPedido, setDataPedido ] = useState([]);
	const [ dataLineaPedido, setDataLineaPedido ] = useState([]);
	const [ modalEditar, setModalEditar ] = useState(false);
	const [ carro, setCarro ] = useState([]);
	const [ modalVerCarro, setModalVerCarro ] = useState(false);
	const [ dataAyudantes, setDataAyudantes ] = useState([]);
	const [ formularioTicket, setFormularioTicket ] = useState({ preparador: '' });
	const [ impresion, setImpresion ] = useState(false);
	const [ idTicket, setIdTicket ] = useState('');
	const { auth } = useAuth();
	const { name } = auth;

	useEffect(() => {
		var url = Global.url;
		var request = '/pedidos';
		const fecthPedidos = async () => {
			await axios.get(url + request).then((resp) => {
				setData(resp.data);
			});
		};
		fecthPedidos();
	}, []);

	const columnas = [
		{
			name: 'Pedido',
			selector: 'pedidos',
			sortable: true,
			compact: true,
			width: '9%'
		},
		{
			name: 'Fecha_Ped.',
			selector: 'fecha_hora_pedido',
			sortable: true,
			cell: (row) => <Moment format="DD/MM/YYYY hh:mm">{row.fecha_hora_pedido}</Moment>,
			compact: true,
			width: '12%'
		},
		{
			name: 'Cliente',
			selector: 'Cliente',
			sortable: true,
			compact: true,
			width: '5%'
		},
		{
			name: 'Nombre',
			selector: 'Nombre_Cliente',
			sortable: true,
			compact: true,
			width: '25%'
		},
		{
			name: 'Direccion',
			selector: 'Direccion_Cliente',
			sortable: true,
			compact: true,
			width: '25%'
		},
		{
			name: 'Zona',
			selector: 'zona',
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
			width: '5%'
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
			width: '8%'
		}
	];
	const carroDataTable = [
		{
			name: 'Pedido',
			selector: 'pedidos',
			sortable: true,
			compact: true,
			width: '14%'
		},
		{
			name: 'Fecha_Ped.',
			selector: 'fecha_hora_pedido',
			sortable: true,
			compact: true,
			width: '14%',
			cell: (row) => <Moment format="DD/MM/YYYY">{row.fecha_hora_pedido}</Moment>
		},
		{
			name: 'Cliente',
			selector: 'Cliente',
			sortable: true,
			compact: true,
			width: '10%'
		},
		{
			name: 'Nombre',
			selector: 'Nombre_Cliente',
			sortable: true,
			compact: true,
			width: '38%'
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
			width: '11%'
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
		//	console.log('slect Rows', row);
		await agregarCarro(row);
	};

	const agregarCarro = async (selection) => {
		setCarro([ ...carro, selection ]);
		//Eliminamos de la tabla principal
		const newDatos = data.filter((data) => data.pedidos !== selection.pedidos);
		setData(newDatos);
		//Actualizamos tabla de TcargaPedidos temporal x para que no lo tome otro usuario
		var url = Global.url;
		var request = `/ticket/${selection.pedidos}`;

		axios
			.put(url + request, { numTicket: 'x' })
			.then((res) => {
				//console.log(res);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const eliminarPedidoCarro = async (selection) => {
		//Quitamos pedido del carro
		const newCarro = carro.filter((data) => data.pedidos !== selection.pedidos);
		setCarro(newCarro);

		//agregamos a la lista de datos
		var url = Global.url;
		var request = `/ticket/${selection.pedidos}`;

		axios
			.put(url + request, { numTicket: '0' })
			.then((res) => {
				//refrescar datos Generales
				ActualizarDatos();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const ActualizarDatos = () => {
		var url = Global.url;
		var request = '/pedidos';
		const fecthPedidos = async () => {
			await axios.get(url + request).then((resp) => {
				setData(resp.data);
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
		datosAyudatentes();
		setModalVerCarro(true);
	};

	//llenar datosayudantes
	const datosAyudatentes = async () => {
		var url = Global.url;
		var request = '/ayudantesActivos';

		await axios.get(url + request).then((resp) => {
			setDataAyudantes(resp.data);
		});
	};

	const handleInputChange = (event) => {
		setFormularioTicket({
			...formularioTicket,
			[event.target.name]: event.target.value
		});
	};

	const guardarTicket = async () => {
		console.log(formularioTicket.preparador);
		if (formularioTicket.preparador === 'ND' || formularioTicket.preparador === '') {
			swal({ title: 'Error', text: 'Selecione un Preparador', icon: 'error', button: 'Aceptar' });
		} else {
			var url = Global.url;
			var request = '/createTicket';

			//Detalle de pedido

			await axios
				.post(url + request, {
					preparador: formularioTicket.preparador,
					cantPedido: carro.length,
					usuarioCreacion: name
				})
				.then((resp) => {
					const result = resp.data.correl;
					guardarTicketPedidos(result);

					swal({
						title: 'Ticket Creado con Exito',
						text: `Numero de Ticket: ${result.toString()}`,
						icon: 'success',
						button: 'Aceptar'
					});
					setIdTicket(result);
					setCarro([]);
					setModalVerCarro(false);
					setImpresion(true);
				});
		}
	};

	const guardarTicketPedidos = async (ticket) => {
		var url = Global.url;
		var request = '/createTicketPedidos';
		await axios
			.post(url + request, {
				ticket,
				pedido: carro
			})
			.then((resp) => {
				console.log(resp);
			});
	};

	return (
		<React.Fragment>
			<div className="content-wrapper">
				<div className="content-header">
					<div className="container-fluid">
						<div className="row mb-2">
							<div className="col-sm-6">
								<h1 className="m-0 text-dark">Pedidos</h1>
							</div>

							<div className="col-sm-6">
								<ol className="breadcrumb float-sm-right">
									<li className="breadcrumb-item">
										<a href="/">Inicio</a>
									</li>

									<li className="breadcrumb-item active">Pedidos</li>
								</ol>
							</div>
						</div>
					</div>
				</div>

				<section className="content">
					<div className="row">
						<div className="col-12">
							<div className="card">
								<div className="card-body">
									{carro.length > 0 ? (
										<Button variant="success" onClick={() => verModalCarro()}>
											Generar Ticket {carro.length}
										</Button>
									) : null}

									<DataTable columns={columnas} data={data} pagination dense />
								</div>
							</div>
						</div>
					</div>

					<Modal size="xl" show={modalEditar} dialogClassName="modal-90w">
						<ModalHeader>
							<div>
								<h3>Pedido {dataPedido.PEDIDO} </h3>
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
								<h3>Ticket </h3>
							</div>
						</ModalHeader>
						<ModalBody>
							<Form>
								<Row>
									<Col>
										<Form.Label column sm="8">
											Preparador:
										</Form.Label>
									</Col>

									<Col column sm="10">
										<select name="preparador" className="form-control" onChange={handleInputChange}>
											<option value="">Selecione un Preparador</option>
											{dataAyudantes.map((fbb) => {
												return (
													<option key={fbb.id} value={fbb.id}>
														{fbb.dui}-{fbb.nombre}
													</option>
												);
											})}
										</select>
									</Col>
								</Row>

								<br />
								<DataTable columns={carroDataTable} data={carro} pagination />
							</Form>
						</ModalBody>
						<ModalFooter>
							<button className="btn btn-success " onClick={() => guardarTicket()}>
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
								<h3>Ticket {idTicket} </h3>
							</div>
						</ModalHeader>
						<ModalBody>
							<Form />
							<Impresion idTicket={idTicket} />
						</ModalBody>
						<ModalFooter>
							<button className="btn btn-danger" onClick={() => setImpresion(false)}>
								cancelar
							</button>
						</ModalFooter>
					</Modal>
				</section>
			</div>
		</React.Fragment>
	);
}
