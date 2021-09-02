import React from 'react';
import Global from '../../Global';
import Pdf from 'react-to-pdf';
import Moment from 'react-moment';
import DataTable from 'react-data-table-component';
import { Button, Container, Row, Col } from 'react-bootstrap';
const ref = React.createRef();
export default function Impresion({ datosEncabezado, datosDetalle }) {
	const hoy = new Date();
	const empresa = Global.empresa.toUpperCase();
	const formato = Global.formatoISO;
	const Currency = Global.currency;
	const flete = `FLETE-${datosEncabezado.flete}.pdf`;
	const columnas = [
		{
			name: 'Factura',
			selector: 'factura',
			width: '15%'
		},
		{
			name: 'Cliente',
			selector: 'cliente',
			compact: true,
			width: '7%'
		},
		{
			name: 'Nombre',
			selector: 'nombre',
			compact: true,
			width: '25%'
		},
		{
			name: 'Monto',
			selector: 'total',
			width: '14%',
			right: true,
			cell: (row) =>
				new Intl.NumberFormat({ formato }, { style: 'currency', currency: `${Currency}` }).format(row.total)
		},
		{
			name: 'Operacion',
			selector: 'operaciones',
			sortable: true,

			left: true,
			width: '15%'
		},
		{
			name: 'Observacion',
			selector: 'observaciones',
			sortable: true,

			left: true,
			width: '20%'
		}
	];
	const totalGeneral = new Intl.NumberFormat({ formato }, { style: 'currency', currency: `${Currency}` }).format(
		datosEncabezado.montototal
	);
	return (
		<React.Fragment>
			<Container className="justify-content-md-center">
				<Row className="justify-content-md-center">
					<Col style={{ fontSize: '40px', fontWeight: '900' }} md="auto">
						{empresa}
					</Col>
				</Row>
				<Row className="justify-content-md-center">
					<Col style={{ fontSize: '25px', fontWeight: '600' }} md="auto">
						LIQUIDACION
					</Col>
				</Row>
				<Row className="justify-content-md-center">
					<Col style={{ fontSize: '17px', fontWeight: '500' }} md="auto">
						Numero de Flete:{datosEncabezado.flete}
					</Col>
				</Row>

				<Row className="justify-content-md-center">
					<Col md="auto">Motorista:{datosEncabezado.nombre}</Col>
				</Row>
				<Row className="justify-content-md-center">
					<Col md="auto">
						Vehiculo:{datosEncabezado.placa}-{datosEncabezado.modelo}
					</Col>
				</Row>
				<Row className="justify-content-md-center">
					<Col md="auto">
						Kilometraje Inicial:{datosEncabezado.kinicial} - Kilometraje Final: {datosEncabezado.Kfinal}
					</Col>
				</Row>
				<Row className="justify-content-md-center">
					<Col md="auto">
						Fecha y Hora de Salida :<Moment format="DD/MM/YYYY H:MM">
							{datosEncabezado.fechahorasalida}
						</Moment>{' '}
					</Col>
				</Row>
				<br />
				<Row style={{ border: '2px solid #000' }} className="justify-content-md-center">
					<DataTable columns={columnas} data={datosDetalle} />
				</Row>
				<Row>
					<Col column sm="3" />
					<Col column sm="7">
						Total General------------:{totalGeneral}
					</Col>
					<hr style={{ border: '15px' }} />
					<hr style={{ border: '2px' }} />
				</Row>
				<Row style={{ border: '2px solid #000', with: '100%' }} className="justify-content-md-center">
					<Col>Motorista:</Col>
					<Col>Revisar:</Col>
					<Col>
						Fecha y Hora de Impresion:<Moment format="DD/MM/YYYY H:MM">{hoy}</Moment>
					</Col>
				</Row>
			</Container>
			<br />
			<Pdf targetRef={ref} filename={flete}>
				{({ toPdf }) => <Button onClick={toPdf}>Generar a Pdf</Button>}
			</Pdf>
		</React.Fragment>
	);
}
