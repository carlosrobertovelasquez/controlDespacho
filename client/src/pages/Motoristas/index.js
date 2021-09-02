import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Button, Modal, ModalBody, ModalFooter, Form, Row, Col } from 'react-bootstrap';
import Global from '../../Global';
import axios from 'axios';
import ModalHeader from 'react-bootstrap/ModalHeader';

export default function Index() {
	const [ data, setData ] = useState([]);
	const [ modalEditar, setModalEditar ] = useState(false);
	const [ modalNuevo, setModalNuevo ] = useState(false);
	const [ motoristaSeleccionado, setMotoristaSeleccionado ] = useState({
		id: '',
		dui: '',
		nombre: '',
		licencia: '',
		tipo_lic: '',
		estado: ''
	});

	useEffect(() => {
		var url = Global.url;
		var request = '/motoristas';
		const fecthMotoristas = async () => {
			await axios.get(url + request).then((resp) => {
				console.log(resp.data);
				setData(resp.data);
			});
		};
		fecthMotoristas();
	}, []);

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
			name: 'Nombre',
			selector: 'nombre',
			sortable: true
		},
		{
			name: 'Licencia',
			selector: 'licencia',
			sortable: true
		},
		{
			name: 'Tipo Licencia',
			selector: 'tipo_lic',
			sortable: true
		},
		{
			name: 'Estado',
			selector: 'estado',
			sortable: true
		},

		{
			name: 'Editar',
			selector: 'editar',
			right: true,
			ignoreRowClick: true,
			cell: (row) => (
				<Button className="btn btn-primary" onClick={(e) => selecionarMotorista(row, 'Editar')}>
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

	const selecionarMotorista = (elemento, caso) => {
		setMotoristaSeleccionado(elemento);
		caso === 'Editar' && setModalEditar(true);
	};
	const handleChange = (e) => {
		const { name, value } = e.target;
		setMotoristaSeleccionado((prevState) => ({
			...prevState,
			[name]: value
		}));
	};
	const abriModalInsertar = () => {
		setModalNuevo(true);
		setMotoristaSeleccionado(null);
	};
	return (
		<React.Fragment>
			<div className="content-wrapper">
				<div className="content-header">
					<div className="container-fluid">
						<div className="row mb-2">
							<div className="col-sm-6">
								<h1 className="m-0 text-dark">Transportistas</h1>
							</div>
							<div className="col-sm-6">
								<ol className="breadcrumb float-sm-right">
									<li className="breadcrumb-item">
										<a href="/">Inicio</a>
									</li>
									<li className="breadcrumb-item active">Tranportistas</li>
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
										Nuevo Tranportistas
									</Button>
									<DataTable columns={columnas} data={data} pagination dense />
								</div>
							</div>
						</div>
					</div>
					<Modal show={modalEditar}>
						<ModalHeader>
							<div>
								<h3>Editar Tranportista</h3>
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
											value={motoristaSeleccionado && motoristaSeleccionado.id}
											onChange={handleChange}
										/>
									</Col>
									<Col>
										<Form.Label>Documento:</Form.Label>
										<Form.Control
											placeholder="Numero de Documento"
											name="modelo"
											value={motoristaSeleccionado && motoristaSeleccionado.dui}
											onChange={handleChange}
										/>
									</Col>
								</Row>
								<Row>
									<Col>
										<Form.Label>Nombre:</Form.Label>
										<Form.Control
											placeholder="Nombre Completo"
											name="nombre"
											type="text"
											value={motoristaSeleccionado && motoristaSeleccionado.nombre}
											onChange={handleChange}
										/>
									</Col>
									<Col>
										<Form.Label>Licencia:</Form.Label>
										<Form.Control
											placeholder="Numero de Licencia"
											name="licencia"
											type="text"
											value={motoristaSeleccionado && motoristaSeleccionado.licencia}
											onChange={handleChange}
										/>
									</Col>
								</Row>
								<Row>
									<Col>
										<Form.Label>Tipo Licencia:</Form.Label>
										<Form.Control
											placeholder="Tipo de Licencia"
											name="tipolic"
											value={motoristaSeleccionado && motoristaSeleccionado.tipo_lic}
											onChange={handleChange}
										/>
									</Col>
									<Col>
										<Form.Label>Estado:</Form.Label>
										<Form.Control
											placeholder="Estado"
											name="estado"
											value={motoristaSeleccionado && motoristaSeleccionado.estado}
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
								<h3>Nuevo Transportista</h3>
							</div>
						</ModalHeader>
						<ModalBody>
							<Form>
								<Row>
									<Col>
										<Form.Label>Documento:</Form.Label>
										<Form.Control
											placeholder="Numero de Documento"
											name="dui"
											value={motoristaSeleccionado && motoristaSeleccionado.dui}
											onChange={handleChange}
										/>
									</Col>
									<Col>
										<Form.Label>Nombre:</Form.Label>
										<Form.Control
											placeholder="Nombre y Apellido"
											name="nombre"
											value={motoristaSeleccionado && motoristaSeleccionado.nombre}
											onChange={handleChange}
										/>
									</Col>
								</Row>
								<Row>
									<Col>
										<Form.Label>Licencia:</Form.Label>
										<Form.Control
											placeholder="Numero de Licencia"
											name="licencia"
											type="text"
											value={motoristaSeleccionado && motoristaSeleccionado.licencia}
											onChange={handleChange}
										/>
									</Col>
									<Col>
										<Form.Label>Tpo de Licencia</Form.Label>
										<Form.Control
											placeholder="Tipo de Licencia"
											name="tipo_lic"
											type="text"
											value={motoristaSeleccionado && motoristaSeleccionado.tipo_lic}
											onChange={handleChange}
										/>
									</Col>
								</Row>
							</Form>
						</ModalBody>
						<ModalFooter>
							<button className="btn btn-primary">Insertar</button>
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
