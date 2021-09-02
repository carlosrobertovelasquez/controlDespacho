import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Global from '../../Global';
import Tablero from '../../components/Ticket/Tablero';

export default function Index() {
	const [ data, setData ] = useState([]);

	useEffect(
		() => {
			//const timer = setTimeout(() => {
			var url = Global.url;
			var request = '/getTicketAll';
			const fecthPedidos = async () => {
				await axios.get(url + request).then((resp) => {
					setData(resp.data);
				});
			};
			fecthPedidos();
			//}, 2000);
			//return () => clearTimeout(timer);
		},
		[ data ]
	);

	const newData = data.slice(0, 12);

	return (
		<React.Fragment>
			<div className="content-wrapper">
				<div className="content-header">
					<div className="container-fluid">
						<div className="row mb-2">
							<div className="col-sm-6">
								<h1 className="m-0 text-dark">Tickets</h1>
							</div>
							<div className="col-sm-6">
								<ol className="breadcrumb float-sm-right">
									<li className="breadcrumb-item">
										<a href="/">Inicio</a>
									</li>
									<li className="breadcrumb-item active">Ticket</li>
								</ol>
							</div>
						</div>
					</div>
				</div>

				<section className="content">
					<div className="container-fluid">
						<div className="row">
							<Tablero data={newData} />
						</div>
					</div>
				</section>
			</div>
		</React.Fragment>
	);
}
