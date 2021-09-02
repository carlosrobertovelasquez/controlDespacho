import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Button, Modal, ModalBody, ModalFooter, Form, Row, Col } from 'react-bootstrap';
import Global from '../../Global';
import axios from 'axios';
import * as Yup from 'yup';
import ModalHeader from 'react-bootstrap/ModalHeader';
import { Formik, useFormik, ErrorMessage } from 'formik';

export default function Index() {
	const [ data, setData ] = useState([]);
	const [ modalEditar, setModalEditar ] = useState(false);
	const [ modalNuevo, setModalNuevo ] = useState(false);
	const [ vehiculoSeleccionado, setVehiculoSeleccionado ] = useState({
		id: '',
		placa: '',
		modelo: '',
		kinicial: '',
		kfinal: '',
		estado: '',
		ano: '',
		propio: '',
		combustible: 'GASOLINA'
	});

	useEffect(() => {
		var url = Global.url;
		var request = '/vehiculos';
		const fecthVehiculos = async () => {
			await axios.get(url + request).then((resp) => {
				setData(resp.data);
			});
		};
		fecthVehiculos();
	}, []);

	const columnas = [
		{
			name: 'ID',
			selector: 'id',
			sortable: true,
			compact: true,
			width: '5%'
		},
		{
			name: 'Placa',
			selector: 'placa',
			sortable: true,
			compact: true,
			width: '10%'
		},
		{
			name: 'Modelo',
			selector: 'modelo',
			sortable: true,
			compact: true,
			width: '20%'
		},
		{
			name: 'K.Inicial',
			selector: 'kinicial',
			sortable: true,
			compact: true,
			width: '5%'
		},
		{
			name: 'K.Final',
			selector: 'kfinal',
			sortable: true,
			compact: true,
			width: '5%'
		},
		{
			name: 'Estado',
			selector: 'estado',
			sortable: true,
			compact: true,
			width: '5%'
		},
		{
			name: 'Año',
			selector: 'ano',
			sortable: true,
			compact: true,
			width: '5%'
		},
		{
			name: 'Tipo Transporte',
			selector: 'propio',
			sortable: true
		},
		{
			name: 'Combistible',
			selector: 'combustible',
			sortable: true
		},

		{
			name: 'Editar',
			selector: 'editar',
			right: true,
			ignoreRowClick: true,
			cell: (row) => (
				<Button className="btn btn-primary" onClick={(e) => selecionarVehiculo(row, 'Editar')}>
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

	const selecionarVehiculo = (elemento, caso) => {
		setVehiculoSeleccionado(elemento);
		caso === 'Editar' && setModalEditar(true);
	};
	const handleChange = (e) => {
		setVehiculoSeleccionado({
			...vehiculoSeleccionado,
			[e.target.name]: e.target.value
		});
	};

	const abriModalInsertar = () => {
		setModalNuevo(true);
		setVehiculoSeleccionado(null);
	};
	const guardarVehiculo = () => {
		console.log(vehiculoSeleccionado);
	};

	const formik = useFormik({
		initialValues: {
			placa: '',
			modelo: '',
			kinical: '0',
			kifinal: '0',
			tTranporte: 'P',
			ano: '',
			tCombustible: ''
		},
		validationSchema: Yup.object({
			placa: Yup.string().required('Placa No Puede ser Vacio'),
			modelo: Yup.string().required('Requerido'),
			kinicial: Yup.number().required('Dato Requerido'),
			kfinal: Yup.number().required('Dato Requerido'),
			kano: Yup.date().required('Dato Requerido')
		}),
		onSubmit: (values) => {
			console.log(values.placa, values.modelo);
		}
	});

	return (
		<React.Fragment>
			<div className="content-wrapper">
				<div className="content-header">
					<div className="container-fluid">
						<div className="row mb-2">
							<div className="col-sm-6">
								<h1 className="m-0 text-dark">Vehiculos</h1>
							</div>
							<div className="col-sm-6">
								<ol className="breadcrumb float-sm-right">
									<li className="breadcrumb-item">
										<a href="/">Inicio</a>
									</li>
									<li className="breadcrumb-item active">Vehiculos</li>
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
										Nuevo Vehiculo
									</Button>
									<DataTable columns={columnas} data={data} pagination />
								</div>
							</div>
						</div>
					</div>
					<Modal show={modalEditar}>
						<ModalHeader>
							<div>
								<h3>Editar Vehiculo</h3>
							</div>
						</ModalHeader>
						<ModalBody>
							<Form>
								<Row>
									<Col>
										<Form.Label>Placa:</Form.Label>
										<Form.Control
											placeholder="Numero de Placa"
											name="placa"
											readOnly
											value={vehiculoSeleccionado && vehiculoSeleccionado.placa}
											onChange={handleChange}
										/>
									</Col>
									<Col>
										<Form.Label>Modelo:</Form.Label>
										<Form.Control
											placeholder="Modelo"
											name="modelo"
											value={vehiculoSeleccionado && vehiculoSeleccionado.modelo}
											onChange={handleChange}
										/>
									</Col>
								</Row>
								<Row>
									<Col>
										<Form.Label>K.Incial:</Form.Label>
										<Form.Control
											placeholder="Kilometraje Inicial"
											name="kinicial"
											type="number"
											value={vehiculoSeleccionado && vehiculoSeleccionado.kinicial}
											onChange={handleChange}
										/>
									</Col>
									<Col>
										<Form.Label>K.Final:</Form.Label>
										<Form.Control
											placeholder="Kilometraje Final"
											name="kfinal"
											type="number"
											value={vehiculoSeleccionado && vehiculoSeleccionado.kfinal}
											onChange={handleChange}
										/>
									</Col>
								</Row>
								<Row>
									<Col>
										<Form.Label>Tipo Transporte:</Form.Label>
										<Form.Control
											placeholder="Tipo de Transporte"
											name="propio"
											value={vehiculoSeleccionado && vehiculoSeleccionado.propio}
											onChange={handleChange}
										/>
									</Col>
									<Col>
										<Form.Label>Año:</Form.Label>
										<Form.Control
											placeholder="Año del Vehiculo"
											name="ano"
											value={vehiculoSeleccionado && vehiculoSeleccionado.ano}
											onChange={handleChange}
										/>
									</Col>
								</Row>
								<Row>
									<Col>
										<Form.Label>Tipo Combustible:</Form.Label>
										<Form.Control
											placeholder="Tipo Combustible"
											name="combustible"
											value={vehiculoSeleccionado && vehiculoSeleccionado.combustible}
											onChange={handleChange}
										/>
									</Col>

									<Col>
										<Form.Label>Estado:</Form.Label>
										<Form.Check
											type="checkbox"
											label="Activo"
											name="estado"
											value={vehiculoSeleccionado && vehiculoSeleccionado.estado}
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
								<h3>Nuevo Vehiculo</h3>
							</div>
						</ModalHeader>
						<ModalBody>
							<div className="card">
								<div className="card-body login-card-body">
									<form onSubmit={formik.handleSubmit}>
										<div className=" form-row ">
											<div className="form-group col-md-6">
												<label for="placa">Placa</label>
												<input
													type="text"
													className="form-control"
													placeholder="Digite Numero de Placa"
													{...formik.getFieldProps('placa')}
													onError={formik.errors.placa && true}
												/>

												{formik.touched.placa && formik.errors.placa ? (
													<div>{formik.errors.placa}</div>
												) : null}
											</div>
											<div className="form-group col-md-6">
												<label for="Modelo">Modelo</label>
												<input
													type="text"
													className="form-control"
													placeholder="Digite Modelo"
													{...formik.getFieldProps('modelo')}
												/>
											</div>
										</div>
										<div className=" form-row ">
											<div className="form-group col-md-6">
												<label for="placa">Kilometraje Inicial</label>
												<input
													type="number"
													className="form-control"
													placeholder="Digite Kilo. Inicial"
													{...formik.getFieldProps('kinicial')}
												/>
											</div>
											<div className="form-group col-md-6">
												<label for="Modelo">Kilometraje Final</label>
												<input
													type="number"
													className="form-control"
													placeholder="Digite Kilometraje Final"
													{...formik.getFieldProps('kfinal')}
												/>
											</div>
										</div>

										<div className=" form-row ">
											<div className="form-group col-md-6">
												<label for="placa">Tipo Transporte</label>
												<input
													type="number"
													className="form-control"
													placeholder="seleciones Tipo Transporte"
													{...formik.getFieldProps('tTransporte')}
												/>
											</div>
											<div className="form-group col-md-6">
												<label for="Modelo">Año</label>
												<input
													type="number"
													className="form-control"
													placeholder="Digite Año"
													{...formik.getFieldProps('ano')}
												/>
											</div>
										</div>
										<div className=" form-row ">
											<div className="form-group col-md-6">
												<label for="placa">Tipo Combustible</label>
												<input
													type="select"
													className="form-control"
													placeholder="Digite Kilo. Inicial"
													{...formik.getFieldProps('tTransporte')}
												/>
											</div>
										</div>

										<div className="row">
											<div className="col-5">
												<button type="submit" className="btn btn-primary btn-block">
													Registrarse
												</button>
											</div>
											<div className="col-6">
												<button
													className="btn btn-danger btn-block"
													onClick={() => setModalNuevo(false)}
												>
													cancelar
												</button>
											</div>
										</div>
									</form>
								</div>
							</div>
						</ModalBody>
					</Modal>
				</section>
			</div>
		</React.Fragment>
	);
}
