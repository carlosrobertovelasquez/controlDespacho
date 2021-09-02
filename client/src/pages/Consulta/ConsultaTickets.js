import React, { useEffect, useState } from 'react';
import Global from '../../Global';
import axios from 'axios';

import DataTableTicket from '../../components/Ticket/DataTableTickets';

export default function ConsultaTickets() {
	const [ data, setData ] = useState([]);

	useEffect(
		() => {
			var url = Global.url;
			var request = '/getTicketTodos';
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
								<h1 className="m-0 text-dark">Consulta Tickets</h1>
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
									<DataTableTicket data={data} />
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</React.Fragment>
	);
}
