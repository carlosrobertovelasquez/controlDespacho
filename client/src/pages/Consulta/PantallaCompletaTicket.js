import React, { useEffect, useState } from 'react';
import Global from '../../Global';
import axios from 'axios';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import Tablero from '../../components/Ticket/Tablero';

export default function PantallaCompletaTicket() {
	const [ data, setData ] = useState([]);

	useEffect(
		() => {
			const timer = setTimeout(() => {
				var url = Global.url;
				var request = '/getTicketAll';
				const fecthPedidos = async () => {
					await axios.get(url + request).then((resp) => {
						setData(resp.data);
					});
				};
				fecthPedidos();
			}, 2000);
			return () => clearTimeout(timer);
		},
		[ data ]
	);
	const handle = useFullScreenHandle();

	return (
		<React.Fragment>
			<button onClick={handle.enter}>click para Pantalla Completa</button>
			<FullScreen handle={handle}>
				<section className="content">
					<div className="container-fluid">
						<div className="row">
							<Tablero data={data} />
						</div>
					</div>
				</section>
			</FullScreen>
		</React.Fragment>
	);
}
