import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Button } from 'react-bootstrap';
import Global from '../../Global';
import axios from 'axios';

import Moment from 'react-moment';

export default function Index() {
	const [ data, setData ] = useState([]);

	const formato = Global.formatoISO;
	const Currency = Global.currency;
	useEffect(
		() => {
			var url = Global.url;
			var request = '/pedidosAutorizacion';
			const fecthPedidos = async () => {
				await axios.get(url + request).then((resp) => {
					setData(resp.data);
				});
			};
			fecthPedidos();
		},
		[ data ]
	);

	const columnas = [
		{
			name: 'Pedido',
			selector: 'pedido',
			sortable: true,
			compact: true,
			width: '7%'
		},
		{
			name: 'Fecha_Ped.',
			selector: 'fecha_hora',
			sortable: true,
			cell: (row) => <Moment format="DD/MM/YYYY">{row.fecha_hora_pedido}</Moment>,
			compact: true,
			width: '7%'
		},
		{
			name: 'Cliente',
			selector: 'cliente',
			sortable: true,
			compact: true,
			width: '5%'
		},
		{
			name: 'Nombre',
			selector: 'nombre',
			sortable: true,
			compact: true,
			width: '24%'
		},
		{
			name: 'Monto',
			selector: 'monto',
			sortable: true,
			compact: true,
			width: '10%',
			cell: (row) =>
				new Intl.NumberFormat({ formato }, { style: 'currency', currency: `${Currency}` }).format(row.monto)
		},
		{
			name: 'Direccion',
			selector: 'direccion',
			sortable: true,
			compact: true,
			width: '35%'
		},
		{
			name: 'Estado',
			selector: 'estado',
			sortable: true,
			compact: true,
			width: '5%'
		},

		{
			name: 'Camb.Estado',
			selector: 'estado',
			ignoreRowClick: true,
			cell: (row) => (
				<Button className="btn btn-info " onClick={(e) => Carro(row, e)}>
					Autorizar
				</Button>
			),

			compact: true,
			width: '100px'
		}
	];

	const Carro = async (row, e) => {
		var url = Global.url;
		var request = `/pedidoCambioEstado/${row.pedido}`;

		await axios.post(url + request, { estado: row.estado }).then((resp) => {
			console.log(resp.data);
		});
	};

	return (
		<React.Fragment>
			<div className="content-wrapper">
				<div className="content-header">
					<div className="container-fluid">
						<div className="row mb-2">
							<div className="col-sm-6">
								<h1 className="m-0 text-dark"> Autorizacion de Pedidos</h1>
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
									<DataTable columns={columnas} data={data} pagination dense />
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</React.Fragment>
	);
}
