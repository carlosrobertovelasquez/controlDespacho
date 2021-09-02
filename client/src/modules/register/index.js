import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import swal from 'sweetalert';
import { Redirect, Link } from 'react-router-dom';
import Global from '../../Global';
export default function Register(props) {
	const [ showLogin, setShowLogin ] = useState(false);
	let url2 = '';
	const printFormError = (formik, key) => {
		if (formik.touched[key] && formik.errors[key]) {
			return <div>{formik.errors[key]}</div>;
		}
		return null;
	};
	const register = (nombre, email, password) => {
		var url = Global.url;
		var request = '/users';
		axios
			.post(url + request, { name: nombre, email, password })
			.then((resp) => {
				if (resp.data.success) {
					console.log(resp.data);
					swal('Guardado', resp.data.message, 'success');
					<Link to="/cd/user" />;
					setShowLogin(true);
				} else {
					swal('Error ', resp.data.message, 'error');
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};
	const formik = useFormik({
		initialValues: {
			nombre: '',
			email: '',
			password: '',
			passwordRetype: ''
		},
		validationSchema: Yup.object({
			nombre: Yup.string().min(5, 'Nombre tiene que ser mayor a 5 Caracteres').required('Requerido'),
			email: Yup.string().email('Direccion No es correcta').required('Requerido'),
			password: Yup.string()
				.min(5, 'Tiene que ser Mayor de 5 Caracteres')
				.max(30, 'Tiene que ser Menor que 30 Caracteres')
				.required('Requerido'),
			passwordRetype: Yup.string()
				.min(5, 'Tiene que ser Mayor de 5 Caracteres')
				.max(30, 'Tiene que ser Menor que 30 Caracteres')
				.required('Requerido')
				.when('password', {
					is: (val) => !!(val && val.length > 0),
					then: Yup.string().oneOf([ Yup.ref('password') ], 'Las contraseña no son iguales')
				})
		}),
		onSubmit: (values) => {
			register(values.nombre, values.email, values.password);
		}
	});

	return (
		<div className="register-box">
			<div className="card-body register-card-body">
				<form onSubmit={formik.handleSubmit}>
					<div className="input-group mb-3">
						<input
							type="text"
							className="form-control"
							placeholder="Nombre Completo"
							{...formik.getFieldProps('nombre')}
							onError={formik.errors.name && true}
						/>
						<div className="input-group-append">
							<div className="input-group-text">
								<span className="fas fa-user" />
							</div>
						</div>
						{formik.touched.nombre && formik.errors.nombre ? <div>{formik.errors.nombre}</div> : null}
					</div>
					<div className="input-group mb-3">
						<input
							type="email"
							className="form-control"
							placeholder="Correo"
							{...formik.getFieldProps('email')}
						/>
						<div className="input-group-append">
							<div className="input-group-text">
								<span className="fas fa-envelope" />
							</div>
						</div>
						{formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
					</div>
					<div className="input-group mb-3">
						<input
							type="password"
							className="form-control"
							placeholder="Password"
							{...formik.getFieldProps('password')}
						/>
						<div className="input-group-append">
							<div className="input-group-text">
								<span className="fas fa-lock" />
							</div>
						</div>
						{printFormError(formik, 'password')}
					</div>
					<div className="input-group mb-3">
						<input
							type="password"
							className="form-control"
							placeholder="Reconfirmar el password"
							{...formik.getFieldProps('passwordRetype')}
						/>
						<div className="input-group-append">
							<div className="input-group-text">
								<span className="fas fa-lock" />
							</div>
						</div>
						{printFormError(formik, 'passwordRetype')}
					</div>
					<div className="row">
						<div className="col-5">
							<button type="submit" className="btn btn-primary btn-block">
								Registrarse
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
