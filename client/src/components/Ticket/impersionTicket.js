import React, { useState } from 'react';
import Pdf from 'react-to-pdf';
import DataTable, { createTheme } from 'react-data-table-component';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Global from '../../Global';
import Moment from 'react-moment';
const ref = React.createRef();
export default function ImpersionTicket({ idTicket }) {
	const [ dataTicketProductos, setDataTicketProductos ] = useState([]);
	const [ dataTicket, setDataTicket ] = useState([]);
	const ticket = `TICKET-${idTicket}.pdf`;
	var url = Global.url;
	var request = `/ticketImpresion?lote=${Global.lote}&idTicket=${idTicket}`;

	axios.get(url + request).then((resp) => {
		setDataTicketProductos(resp.data);
	});

	var request2 = `/ticketById/${idTicket}`;
	axios.get(url + request2).then((resp) => {
		setDataTicket(resp.data);
	});

	createTheme('solarized', {
		text: {
			primary: '#268bd2',
			secondary: '#2aa198'
		},
		background: {
			default: '#FFFFFF'
		},
		context: {
			background: '#cb4b16',
			text: '#FFFFFF'
		},
		divider: {
			default: '#073642'
		},
		action: {
			button: 'rgba(0,0,0,.54)',
			hover: 'rgba(0,0,0,.08)',
			disabled: 'rgba(0,0,0,.12)'
		},
		rows: {
			fontsize: '8px'
		}
	});

	const customStyles = {
		rows: {
			style: {
				minHeight: '30px' // override the row height
			}
		},
		headCells: {
			style: {
				paddingLeft: '8px', // override the cell padding for head cells
				paddingRight: '8px'
			}
		},
		cells: {
			style: {
				paddingLeft: '8px', // override the cell padding for data cells
				paddingRight: '8px'
			}
		}
	};
	const columnas = [
		{
			name: 'Pedido',
			selector: 'PEDIDO',
			compact: true,
			width: '10%'
		},
		{
			name: 'Bodega',
			selector: 'BODEGA',
			compact: true,
			width: '7%'
		},
		{
			name: 'Articulo',
			selector: 'ARTICULO',
			compact: true,
			width: '7%'
		},
		{
			name: 'Descripcion',
			selector: 'DESCRIPCION',
			compact: true,
			width: '50%'
		},
		{
			name: 'Cantidad',
			selector: 'CANTIDAD',
			sortable: true,
			compact: true,
			width: '10%'
		},
		{
			name: 'Cantidad_Pre',
			selector: 'CANTIDADx',
			sortable: true,
			compact: true,
			width: '10%'
		}
	];

	return (
		<React.Fragment>
			<div style={{ margin: '1px 5px 10px 8px' }} ref={ref}>
				<br />
				<p style={{ margin: '1px 1px 2px 250px', alignContent: 'center' }}>TICKET:{idTicket}</p>
				<p style={{ margin: '1px 1px 1px 250px', alignContent: 'center', fontSize: '12px' }}>
					{Global.empresa}
				</p>
				<p style={{ margin: '1px 1px 1px 250px', alignContent: 'center', fontSize: '12px' }}>
					Preparador:{dataTicket.preparador}-{dataTicket.nombre}
				</p>
				<p style={{ margin: '1px 1px 1px 250px', alignContent: 'center', fontSize: '12px' }}>
					Estado:{dataTicket.estado}-{dataTicket.NOMBRE}
				</p>
				<p style={{ margin: '1px 1px 1px 250px', alignContent: 'center', fontSize: '12px' }}>
					Fecha Creacion:<Moment format="DD/MM/YYYY H:MM">{dataTicket.fecha_inicio}</Moment>
				</p>
				<div style={{ marginLeft: '10px' }}>
					<DataTable columns={columnas} data={dataTicketProductos} customStyles={customStyles} pagination />
				</div>
			</div>
			<Pdf targetRef={ref} filename={ticket}>
				{({ toPdf }) => <Button onClick={toPdf}>Generar a Pdf</Button>}
			</Pdf>
		</React.Fragment>
	);
}
