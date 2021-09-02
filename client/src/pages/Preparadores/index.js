import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Button, Modal, ModalBody, ModalFooter, Form, Row, Col } from 'react-bootstrap';
import Global from '../../Global';
import axios from 'axios';
import ModalHeader from 'react-bootstrap/ModalHeader';
import swal from 'sweetalert';

export default function Index() {
	const [ data, setData ] = useState([]);
	const [ modalEditar, setModalEditar ] = useState(false);
	const [ modalNuevo, setModalNuevo ] = useState(false);
	const [ ayudanteSeleccionado, setAyudanteSeleccionado ] = useState({
		id: '',
		dui: '',
		codEmpleado: '',
		nombre: '',
		estado: ''
	});

	useEffect(
		() => {
			var url = Global.url;
			var request = '/ayudantes';
			const fecthAyudantes = async () => {
				await axios.get(url + request).then((resp) => {
					setData(resp.data);
				});
			};
			fecthAyudantes();
		},
		[ data ]
	);

	const columnas = [
		{
			name: 'ID',
			selector: 'id',
			sortable: true
		},
		{
			name: 'Documento',
			selector: 'dui',
			sortable: true
		},
		{
			name: 'Codigo Empleado',
			selector: 'cod_empleado',
			sortable: true
		},
		{
			name: 'Nombre',
			selector: 'nombre',
			sortable: true
		},
		{
			name: 'estado',
			selector: 'estado',
			sortable: true
		},
		{
			name: 'Editar',
			selector: 'editar',
			right: true,
			ignoreRowClick: true,
			cell: (row) => (
				<Button className="btn btn-primary" onClick={(e) => selecionarAyudantes(row, 'Editar')}>
					Editar
				</Button>
			)
		},
		{
			name: 'Eliminar',
			selector: 'eliminar',

			ignoreRowClick: true,
			cell: (row) => (
				<Button className="btn btn-danger" onClick={(e) => eliminar(row, e)}>
					Eliminar
				</Button>
			)
		}
	];

	const eliminar = (row, e) => {
		console.log('slect Rows', row.id);
	};

	const selecionarAyudantes = (elemento, caso) => {
		setAyudanteSeleccionado(elemento);
		caso === 'Editar' && setModalEditar(true);
	};
	const handleChange = (e) => {
		const { name, value } = e.target;
		setAyudanteSeleccionado((prevState) => ({
			...prevState,
			[name]: value
		}));
	};
	const abriModalInsertar = () => {
		setModalNuevo(true);
		setAyudanteSeleccionado(null);
	};
	const guardar = async () => {
		var url = Global.url;
		var request = '/ayudantes';

		await axios
			.post(url + request, { datos: ayudanteSeleccionado })
			.then((resp) => {
				if (resp.data.success) {
					swal('Guardado', resp.data.message, 'success');
					setModalNuevo(false);
				} else {
					swal('Error ', resp.data.message, 'error');
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};
	return (
		<React.Fragment>
			<div className="content-wrapper">
				<div className="content-header">
					<div className="container-fluid">
						<div className="row mb-2">
							<div className="col-sm-6">
								<h1 className="m-0 text-dark">Preparadores</h1>
							</div>
							<div className="col-sm-6">
								<ol className="breadcrumb float-sm-right">
									<li className="breadcrumb-item">
										<a href="/">Inicio</a>
									</li>
									<li className="breadcrumb-item active">Preparadores</li>
								</ol>
							</div>
						</div>
					</div>
				</div>

				<section class="content">
					<div class="row">
						<div class="col-12">
							<div class="card">
								<div class="card-body">
									<Button variant="success" onClick={() => abriModalInsertar()}>
										Nuevo Preparador
									</Button>
									<DataTable columns={columnas} data={data} pagination />
								</div>
							</div>
						</div>
					</div>
					<Modal show={modalEditar}>
						<ModalHeader>
							<div>
								<h3>Editar Preparador</h3>
							</div>
						</ModalHeader>
						<ModalBody>
							<Form>
								<Row>
									<Col>
										<Form.Label>Id:</Form.Label>
										<Form.Control
											placeholder="Id de Motorista"
											name="id"
											readOnly
											value={ayudanteSeleccionado && ayudanteSeleccionado.id}
											onChange={handleChange}
										/>
									</Col>
									<Col>
										<Form.Label>Documento:</Form.Label>
										<Form.Control
											placeholder="Numero de Documento"
											name="dui"
											value={ayudanteSeleccionado && ayudanteSeleccionado.dui}
											onChange={handleChange}
										/>
									</Col>
								</Row>
								<Row>
									<Col>
										<Form.Label>Codigo Empleado:</Form.Label>
										<Form.Control
											placeholder="Codigo Empleado"
											name="codEmpleado"
											type="text"
											value={ayudanteSeleccionado && ayudanteSeleccionado.cod_empleado}
											onChange={handleChange}
										/>
									</Col>
									<Col>
										<Form.Label>Nombre:</Form.Label>
										<Form.Control
											placeholder="Nombre de Preparador"
											name="nombre"
											type="text"
											value={ayudanteSeleccionado && ayudanteSeleccionado.nombre}
											onChange={handleChange}
										/>
									</Col>
								</Row>
								<Row>
									<Col>
										<Form.Label>Estado:</Form.Label>
										<Form.Control
											placeholder="Estado"
											name="estado"
											value={ayudanteSeleccionado && ayudanteSeleccionado.estado}
											onChange={handleChange}
										/>
									</Col>
								</Row>
							</Form>
						</ModalBody>
						<ModalFooter>
							<button className="btn btn-primary">Actualizar</button>
							<button className="btn btn-danger" onClick={() => setModalEditar(false)}>
								cancelar
							</button>
						</ModalFooter>
					</Modal>

					<Modal show={modalNuevo}>
						<ModalHeader>
							<div>
								<h3>Nuevo Preparador</h3>
							</div>
						</ModalHeader>
						<ModalBody>
							<Form>
								<Row>
									<Col>
										<Form.Label>Documento:</Form.Label>
										<Form.Control
											placeholder="Numero de Documento"
											type="text"
											name="dui"
											value={ayudanteSeleccionado && ayudanteSeleccionado.dui}
											onChange={handleChange}
										/>
									</Col>
									<Col>
										<Form.Label>Codigo Empleado:</Form.Label>
										<Form.Control
											placeholder="Codigo Empleado"
											type="text"
											name="codEmpleado"
											value={ayudanteSeleccionado && ayudanteSeleccionado.codEmpleado}
											onChange={handleChange}
										/>
									</Col>
								</Row>
								<Row>
									<Col>
										<Form.Label>Nombre:</Form.Label>
										<Form.Control
											placeholder="Nombre de Preparador"
											name="nombre"
											type="text"
											value={ayudanteSeleccionado && ayudanteSeleccionado.nombre}
											onChange={handleChange}
										/>
									</Col>
								</Row>
							</Form>
						</ModalBody>
						<ModalFooter>
							<button className="btn btn-primary" onClick={() => guardar()}>
								Insertar
							</button>
							<button className="btn btn-danger" onClick={() => setModalNuevo(false)}>
								cancelar
							</button>
						</ModalFooter>
					</Modal>
				</section>
			</div>
		</React.Fragment>
	);
}
