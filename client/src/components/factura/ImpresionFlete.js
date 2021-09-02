import React, { useState } from 'react';
import Pdf from 'react-to-pdf';
import DataTable, { createTheme } from 'react-data-table-component';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Global from '../../Global';
import Moment from 'react-moment';
const ref = React.createRef();
export default function ImpersionTicket({ flete }) {
	const [ dataTicketProductos, setDataTicketProductos ] = useState([]);
	const [ dataTicket, setDataTicket ] = useState([]);
	const hoy = new Date();
	const formato = Global.formatoISO;
	const Currency = Global.currency;

	const ticket = `FLETE-${flete}.pdf`;
	var url = Global.url;
	var request = `/detalleFlete/${flete}`;

	axios.get(url + request).then((resp) => {
		setDataTicketProductos(resp.data.datos);
	});
	var request2 = `/encabezadoFlete/${flete}`;
	axios.get(url + request2).then((resp) => {
		setDataTicket(resp.data.datos);
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
			name: 'Fatura',
			selector: 'factura',
			compact: true,
			width: '12%'
		},
		{
			name: 'Cliente',
			selector: 'cliente',
			compact: true,
			width: '10%'
		},
		{
			name: 'Nombre',
			selector: 'nombre',
			compact: true,
			width: '45%'
		},
		{
			name: 'Total',
			selector: 'total',
			compact: true,
			width: '15%',
			cell: (row) =>
				new Intl.NumberFormat({ formato }, { style: 'currency', currency: `${Currency}` }).format(row.total)
		},
		{
			name: 'Condicion Pag',
			selector: 'DESCRIPCION',
			sortable: true,
			compact: true,
			width: '15%'
		}
	];

	return (
		<React.Fragment>
			<div style={{ margin: '1px 5px 10px 8px' }} ref={ref}>
				<div>
					<br />
					<p style={{ margin: '1px 1px 2px 250px', alignContent: 'center', fontSize: '25px' }}>
						FLETE:{flete}
					</p>
					<p style={{ margin: '1px 1px 1px 250px', alignContent: 'center', fontSize: '12px' }}>
						{Global.empresa}
					</p>
					<p style={{ margin: '1px 1px 1px 250px', alignContent: 'center', fontSize: '12px' }}>
						Motorista:{dataTicket.nombre}-{dataTicket.nombre}
					</p>
					<p style={{ margin: '1px 1px 1px 250px', alignContent: 'center', fontSize: '12px' }}>
						Estado:{dataTicket.estado}
					</p>
					<p style={{ margin: '1px 1px 1px 250px', alignContent: 'center', fontSize: '12px' }}>
						Fecha Creacion:<Moment format="DD/MM/YYYY H:MM">{dataTicket.fecha}</Moment>
					</p>
					<p style={{ margin: '1px 1px 1px 250px', alignContent: 'center', fontSize: '12px' }}>
						Kilometraje Inicial:{dataTicket.kinicial}----Kilometraje Final:{dataTicket.kfinal}
					</p>

					<div style={{ marginLeft: '10px' }}>
						<DataTable columns={columnas} data={dataTicketProductos} customStyles={customStyles} />
					</div>
					<hr size="6" width="100%" align="left" color="green" />
				</div>
				<div>
					<table style={{ width: '100%' }}>
						<tr>
							<td align="left">Motorista : </td>
							<td align="left">Revisa: </td>
							<td align="left">
								Fecha y hora de Impresion : <Moment format="DD/MM/YYYY h:mm">{hoy}</Moment>{' '}
							</td>
						</tr>
					</table>
				</div>
			</div>
			<Pdf targetRef={ref} filename={ticket}>
				{({ toPdf }) => <Button onClick={toPdf}>Generar a Pdf</Button>}
			</Pdf>
		</React.Fragment>
	);
}
