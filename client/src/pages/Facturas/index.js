import React, { useState, useEffect } from 'react';

import Global from '../../Global';
import axios from 'axios';

import DatableFactura from '../../components/factura/Datatable';
export default function Index() {
	const [ data, setData ] = useState([]);

	useEffect(
		() => {
			var url = Global.url;
			var request = '/facturasDespacho';

			const fecthPedidos = async () => {
				await axios.get(url + request).then((resp) => {
					setData(resp.data.datos);
				});
			};

			fecthPedidos();
		},
		[ data ]
	);
	console.log('desde papa', data);
	return (
		<React.Fragment>
			<div className="content-wrapper">
				<div className="content-header">
					<div className="container-fluid">
						<div className="row mb-2">
							<div className="col-sm-6">
								<h1 className="m-0 text-dark">Facturas</h1>
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

				<DatableFactura data={data} />
			</div>
		</React.Fragment>
	);
}
