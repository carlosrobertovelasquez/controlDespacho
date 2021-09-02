import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalBody, ModalFooter, Form, Row, Col } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/ModalHeader';
import DataTable from 'react-data-table-component';
import Moment from 'react-moment';

import Impresion from '../../components/factura/ImpresionFlete';

export default function DataTableFlete({ data }) {
	const [ searchResults, setSearchResults ] = useState([]);
	const [ searchTerm, setSearchTerm ] = useState('');
	const [ impresion, setImpresion ] = useState(false);
	const [ idTicket, setIdTicket ] = useState('');

	useEffect(
		() => {
			const result = data.filter((cliente) => cliente.nombre.toLowerCase().includes(searchTerm));
			setSearchResults(result);
		},
		[ searchTerm, data ]
	);
	const columnas = [
		{
			name: 'N.Flete',
			selector: 'flete',
			sortable: true,
			compact: true,
			width: '6%'
		},
		{
			name: 'Estado',
			selector: 'estado',
			sortable: true,
			compact: true,
			width: '8%'
		},
		{
			name: 'Vehiculo',
			selector: `modelo`,
			sortable: true,
			compact: true,
			width: '12%'
		},
		{
			name: 'Motorista',
			selector: 'nombre',
			sortable: true,
			compact: true,
			width: '20%'
		},
		{
			name: 'Fecha',
			selector: 'fecha',
			sortable: true,
			cell: (row) => <Moment format="DD/MM/YYYY hh:mm">{row.fecha}</Moment>,
			compact: true,
			width: '8%'
		},
		{
			name: 'Fecha Saldia',
			selector: 'fechahorasalida',
			sortable: true,
			cell: (row) => <Moment format="DD/MM/YYYY hh:mm">{row.fechahorasalida}</Moment>,
			compact: true,
			width: '8%'
		},
		{
			name: 'Fecha Llegada',
			selector: 'fecha',
			sortable: true,
			cell: (row) => <Moment format="DD/MM/YYYY hh:mm">{row.fechahorallegada}</Moment>,
			compact: true,
			width: '8%'
		},

		{
			name: 'Tiempo',
			selector: 'tiempo',
			sortable: true,
			compact: true,
			width: '5%'
		},
		{
			name: 'Numero Fac.',
			selector: 'numerofacturas',
			sortable: true,
			compact: true,
			width: '8%'
		},
		{
			name: 'Kil. Consu',
			selector: 'kConsumidos',
			sortable: true,
			compact: true,
			width: '%'
		},
		{
			name: 'Imprimir',
			selector: 'ver',

			ignoreRowClick: true,
			cell: (row) => (
				<Button className="btn btn-primary" onClick={(e) => imprimirFlete(row, e)}>
					Imprimir
				</Button>
			),
			compact: true,
			width: '6%'
		}
	];

	const handleChange = (event) => {
		setSearchTerm(event.target.value.toLowerCase());
	};

	const imprimirFlete = (row, e) => {
		console.log(row);
	};

	return (
		<React.Fragment>
			<section className="content">
				<div className="row">
					<div className="col-12">
						<div className="card">
							<Row md={4}>
								<Col>
									<Form.Control
										type="text"
										placeholder="Buscar Por Nombre Motorista"
										value={searchTerm}
										onChange={handleChange}
									/>
								</Col>
							</Row>
							<div className="card-body">
								<DataTable columns={columnas} data={searchResults} pagination />
							</div>
						</div>
					</div>
				</div>

				<Modal size="lg" show={impresion}>
					<ModalHeader>
						<div>
							<h3>Flete {idTicket} </h3>
						</div>
					</ModalHeader>
					<ModalBody>
						<Form />
						<Impresion flete={idTicket} />
					</ModalBody>
					<ModalFooter>
						<button className="btn btn-danger" onClick={() => setImpresion(false)}>
							cancelar
						</button>
					</ModalFooter>
				</Modal>
			</section>
		</React.Fragment>
	);
}
