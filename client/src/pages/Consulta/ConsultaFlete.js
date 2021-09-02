import React, { useEffect, useState } from 'react';
import Global from '../../Global';
import axios from 'axios';

import DataTableFlete from '../../components/Flete/DataTableFlete';

export default function ConsultaFlete() {
	const [ data, setData ] = useState([]);

	useEffect(
		() => {
			var url = Global.url;
			var request = '/getTodosFletes';
			const fecthPedidos = async () => {
				await axios.get(url + request).then((resp) => {
					setData(resp.data.datos);
				});
			};

			fecthPedidos();
		},
		[ data ]
	);

	return (
		<React.Fragment>
			<div className="content-wrapper">
				<div className="content-header">
					<div className="container-fluid">
						<div className="row mb-2">
							<div className="col-sm-6">
								<h1 className="m-0 text-dark">Consulta Fletes</h1>
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
				<DataTableFlete data={data} />
			</div>
		</React.Fragment>
	);
}

//
