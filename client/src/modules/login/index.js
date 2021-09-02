import React, { useState } from 'react';
import { useFormik } from 'formik';
import Registro from '../register';
import * as Yup from 'yup';
import Global from '../../Global';
import axios from 'axios';
import swal from 'sweetalert';
import { setToken } from '../../utils/token';
import useAuth from '../../hooks/useAuth';
export default function Login() {
	let url = '';
	const { setUser } = useAuth();

	const [ showLogin, setShowLogin ] = useState(true);
	const login = async (email, password) => {
		var url = Global.url;
		var request = '/login';
		axios
			.post(url + request, { email, password })
			.then((rep) => {
				if (rep.data.length > 0) {
					swal({ title: 'Error', text: rep.data, icon: 'error', button: 'Aceptar' });
				} else {
					//tenemos el tocket pra guardarlo
					const { token } = rep.data;
					setToken(token);
					setUser(token);
				}
			})
			.catch((error) => {
				console.error(error.message);
			});
	};
	const printFormError = (formik, key) => {
		if (formik.touched[key] && formik.errors[key]) {
			return <div>{formik.errors[key]}</div>;
		}
	};
	const formik = useFormik({
		initialValues: {
			email: '',
			password: ''
		},
		validationSchema: Yup.object({
			email: Yup.string().email('Direccion de Correo Invalidad').required('Required'),
			password: Yup.string()
				.min(5, 'Tiene que contener como minimo 5 Caracteres')
				.max(30, 'Maximo de 30 Caracteres')
				.required('Required')
		}),
		onSubmit: (values) => {
			login(values.email, values.password);
		}
	});

	return (
		<React.Fragment>
			{showLogin ? (
				<div className="hold-transition login-page">
					<div className="login-box">
						<div className="login-logo">
							<a href="/">
								<b>Control Despacho</b>
							</a>
						</div>

						<div className="card">
							<div className="card-body login-card-body">
								<p className="login-box-msg">Iniciar Sesión</p>

								<form onSubmit={formik.handleSubmit}>
									<div className="input-group mb-3">
										<input
											type="email"
											className="form-control"
											placeholder="Email"
											{...formik.getFieldProps('email')}
										/>
										<div className="input-group-append">
											<div className="input-group-text">
												<span className="fas fa-envelope" />
											</div>
										</div>
									</div>
									{formik.touched.email && formik.errors.email ? (
										<div>{formik.errors.email}</div>
									) : null}
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
									<div className="row">
										<div className="col-8" />

										<div className="col-4">
											<button type="submit" className="btn btn-primary btn-block">
												Ingresar
											</button>
										</div>
									</div>
								</form>

								<p className="mb-0" />
							</div>
						</div>
					</div>
				</div>
			) : (
				<Registro setShowLogin={setShowLogin} />
			)}
		</React.Fragment>
	);
}
