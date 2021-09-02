import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Button, Modal, ModalBody, ModalFooter, Form, Row, Col, Alert } from 'react-bootstrap';
import Global from '../../../Global';
import axios from 'axios';
import swal from 'sweetalert';
import ModalHeader from 'react-bootstrap/ModalHeader';
import useAuth from '../../../hooks/useAuth';

export default function Index() {
	const [ data, setData ] = useState([]);
	const [ modalEditar, setModalEditar ] = useState(false);
	const [ modalNuevo, setModalNuevo ] = useState(false);
	const [ showLogin, setShowLogin ] = useState(false);
	const [ usuarioSeleccionado, setUsuarioSeleccionado ] = useState({
		id: '',
		nombre: '',
		email: '',
		password: '',
		estado: ''
	});

	const [ activo, setActivo ] = useState(true);
	const [ roluser, setRolUser ] = useState('usuario');
	const { auth } = useAuth();
	const { rol } = auth;

	useEffect(
		() => {
			var url = Global.url;
			var request = '/users';
			const fecthMotoristas = async () => {
				await axios.get(url + request).then((resp) => {
					setData(resp.data.datos);
				});
			};
			fecthMotoristas();
		},
		[ data ]
	);

	const register = () => {
		if (
			usuarioSeleccionado.nombre === undefined ||
			usuarioSeleccionado.email === undefined ||
			usuarioSeleccionado.password === undefined ||
			usuarioSeleccionado.nombre === '' ||
			usuarioSeleccionado.email === '' ||
			usuarioSeleccionado.password === ''
		) {
			swal('Error ', 'Datos no Pueden ir Vacios', 'error');
		} else {
			var url = Global.url;
			var request = '/users';
			axios
				.post(url + request, {
					name: usuarioSeleccionado.nombre,
					email: usuarioSeleccionado.email,
					password: usuarioSeleccionado.password
				})
				.then((resp) => {
					if (resp.data.success) {
						console.log(resp.data);
						swal('Guardado', resp.data.message, 'success');

						setShowLogin(true);
						setModalNuevo(false);
					} else {
						swal('Error ', resp.data.message, 'error');
					}
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	const columnas = [
		{
			name: 'ID',
			selector: 'id',
			sortable: true
		},
		{
			name: 'Nombre',
			selector: 'name',
			sortable: true
		},
		{
			name: 'Correo',
			selector: 'email',
			sortable: true
		},
		{
			name: 'Rol',
			selector: 'Rol',
			sortable: true
		},
		{
			name: 'Estado',
			selector: 'active',
			sortable: true
		},

		{
			name: 'Editar',
			selector: 'editar',
			right: true,
			ignoreRowClick: true,
			cell: (row) => (
				<Button className="btn btn-primary" onClick={(e) => selecionarUsuario(row, 'Editar')}>
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

	const selecionarUsuario = (elemento, caso) => {
		setUsuarioSeleccionado(elemento);
		setRolUser(elemento.Rol);
		if (elemento.active === 'ACTIVO') {
			setActivo(true);
		} else {
			setActivo(false);
		}

		caso === 'Editar' && setModalEditar(true);
		console.log(elemento);
	};
	const handleChange = (e) => {
		const { name, value } = e.target;
		setUsuarioSeleccionado((prevState) => ({
			...prevState,
			[name]: value
		}));
	};
	const abriModalInsertar = () => {
		setModalNuevo(true);

		setUsuarioSeleccionado(null);
	};
	const cambioRadioRol = (e) => {
		setRolUser(e.target.value);
	};
	return (
		<React.Fragment>
			<div className="content-wrapper">
				<div className="content-header">
					<div className="container-fluid">
						<div className="row mb-2">
							<div className="col-sm-6">
								<h1 className="m-0 text-dark">Usuarios</h1>
							</div>
							<div className="col-sm-6">
								<ol className="breadcrumb float-sm-right">
									<li className="breadcrumb-item">
										<a href="/">Inicio</a>
									</li>
									<li className="breadcrumb-item active">Usuarios</li>
								</ol>
							</div>
						</div>
					</div>
				</div>
				{rol === 'ADMIN' ? (
					<section className="content">
						<div className="row">
							<div className="col-12">
								<div className="card">
									<div className="card-body">
										<Button variant="success" onClick={() => abriModalInsertar()}>
											Nuevo Usuario
										</Button>
										<DataTable columns={columnas} data={data} pagination dense />
									</div>
								</div>
							</div>
						</div>
						<Modal show={modalEditar}>
							<ModalHeader>
								<div>
									<h3>Editar Usuario</h3>
								</div>
							</ModalHeader>
							<ModalBody>
								<Form>
									<Form>
										<div className="register-box">
											<div className="card-body register-card-body">
												<form>
													<div className="input-group mb-3">
														<input
															type="email"
															name="email"
															value={usuarioSeleccionado && usuarioSeleccionado.email}
															onChange={handleChange}
															className="form-control"
															placeholder="Correo"
															autoComplete="off"
															disabled="true"
														/>
													</div>
													<div className="input-group mb-3">
														<input
															type="text"
															name="name"
															value={usuarioSeleccionado && usuarioSeleccionado.name}
															onChange={handleChange}
															className="form-control"
															placeholder="Nombre Completo"
															required
														/>
													</div>
													<div className="input-group mb-3">
														<div className="form-check">
															<input
																className="form-check-input"
																type="checkbox"
																value={activo}
																defaultChecked={activo}
																onChange={() => setActivo(!activo)}
																id="defaultCheck1"
															/>
															<label className="form-check-label" for="defaultCheck1">
																Activo
															</label>
														</div>
													</div>
													<div className="input-group mb-3">
														<div className="fom-check">
															<input
																className="form-check-input"
																type="radio"
																value="ADMINISTRADOR"
																name="ADMINISTRADOR"
																checked={roluser === 'ADMINISTRADOR' ? true : false}
																onChange={cambioRadioRol}
															/>
														</div>
														<label className="form-check-label" for="administrador">
															Administrador
														</label>
													</div>
													<div className="input-group mb-3">
														<div className="fom-check">
															<input
																className="form-check-input"
																type="radio"
																value="USUARIO"
																name="USUARIO"
																checked={roluser === 'USUARIO' ? true : false}
																onChange={cambioRadioRol}
															/>
														</div>
														<label className="form-check-label" for="usuario">
															Usuario
														</label>
													</div>
												</form>
											</div>
										</div>
									</Form>
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
									<h3>Nuevo Usuario</h3>
								</div>
							</ModalHeader>
							<ModalBody>
								<Form>
									<div className="register-box">
										<div className="card-body register-card-body">
											<form>
												<div className="input-group mb-3">
													<input
														type="text"
														name="nombre"
														value={usuarioSeleccionado && usuarioSeleccionado.nombre}
														onChange={handleChange}
														className="form-control"
														placeholder="Nombre Completo"
														required
													/>
													<div className="input-group-append">
														<div className="input-group-text">
															<span className="fas fa-user" />
														</div>
													</div>
												</div>
												<div className="input-group mb-3">
													<input
														type="email"
														name="email"
														value={usuarioSeleccionado && usuarioSeleccionado.email}
														onChange={handleChange}
														className="form-control"
														placeholder="Correo"
														autoComplete="off"
													/>
													<div className="input-group-append">
														<div className="input-group-text">
															<span className="fas fa-envelope" />
														</div>
													</div>
												</div>
												<div className="input-group mb-3">
													<input
														type="password"
														name="password"
														value={usuarioSeleccionado && usuarioSeleccionado.password}
														onChange={handleChange}
														className="form-control"
														placeholder="Password"
														autoComplete="off"
													/>
													<div className="input-group-append">
														<div className="input-group-text">
															<span className="fas fa-lock" />
														</div>
													</div>
												</div>
											</form>
										</div>
									</div>
								</Form>
							</ModalBody>
							<ModalFooter>
								<button className="btn btn-danger" onClick={() => register()}>
									Registar
								</button>
								<button className="btn btn-primary" onClick={() => setModalNuevo(false)}>
									Cancelar
								</button>
							</ModalFooter>
						</Modal>
					</section>
				) : (
					<div>
						<Alert variant="danger" dismissible>
							<Alert.Heading>Accesso Denegado</Alert.Heading>
							<p>Resive su Rol de usuario o pongase en contacto con Administrador</p>
						</Alert>
					</div>
				)}
			</div>
		</React.Fragment>
	);
}
