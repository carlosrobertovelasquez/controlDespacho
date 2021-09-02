import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Global from '../../Global';
import Tablero from '../../components/Flete/Tablero';

export default function Index() {
	const [ data, setData ] = useState([]);

	useEffect(
		() => {
			var url = Global.url;
			var request = '/getAllFletes';
			const fecthPedidos = async () => {
				await axios.get(url + request).then((resp) => {
					setData(resp.data.datos);
				});
			};
			fecthPedidos();
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
								<h1 className="m-0 text-dark">Fletes</h1>
							</div>
							<div className="col-sm-6">
								<ol className="breadcrumb float-sm-right">
									<li className="breadcrumb-item">
										<a href="/">Inicio</a>
									</li>
									<li className="breadcrumb-item active">Fletes</li>
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
