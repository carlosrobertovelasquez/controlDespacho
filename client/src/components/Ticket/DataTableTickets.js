import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import Moment from 'react-moment';
import { Modal, ModalBody, ModalFooter, Form, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import Global from '../../Global';
import Impresion from '../../components/Ticket/impersionTicket';
import ModalHeader from 'react-bootstrap/ModalHeader';
export default function DataTableTickets({ data }) {
	const [ searchResults, setSearchResults ] = useState([]);
	const [ searchTerm, setSearchTerm ] = useState('');
	const [ dataPedidos, setDataPedidos ] = useState([]);
	const [ dataProductos, setDataProductos ] = useState([]);
	const [ modalTicket, setModalTicket ] = useState(false);
	const [ impresion, setImpresion ] = useState(false);
	const [ pending, setPending ] = useState(true);

	useEffect(
		() => {
			const result = data.filter((ticket) => ticket.nombre.toLowerCase().includes(searchTerm));
			setSearchResults(result);
			setPending(false);
		},
		[ searchTerm, data ]
	);

	const colPedidos = [
		{
			name: 'Pedido',
			selector: 'pedido',
			sortable: true,
			compact: true
		},
		{
			name: 'Cliente',
			selector: 'cliente',
			sortable: true,
			compact: true,
			width: '70px'
		},
		{
			name: 'Nombre',
			selector: 'nombre',
			sortable: true,
			compact: true,
			width: '300px'
		},
		{
			name: 'Direccion',
			selector: 'direccion',
			sortable: true,
			compact: true,
			width: '350px'
		},
		{
			name: 'Monto',
			selector: 'monto',
			sortable: true,
			compact: true,
			width: '70px'
		},
		{
			name: 'Vendedor',
			selector: 'vendedor',
			sortable: true,
			compact: true,
			width: '70px'
		},
		{
			name: 'Nombre',
			selector: 'nombre_vendedor',
			sortable: true,
			compact: true,
			width: '150px'
		},
		{
			name: 'Nota',
			selector: 'nota',
			compact: true,
			width: '250px'
		}
	];

	const colPedidosProductos = [
		{
			name: 'Pedido',
			selector: 'pedido',
			sortable: true,
			compact: true,
			width: '100px'
		},
		{
			name: 'Linea',
			selector: 'pedido_linea',
			sortable: true,
			compact: true,
			width: '25px'
		},
		{
			name: 'Bodega',
			selector: 'bodega',
			sortable: true,
			compact: true,
			width: '70px'
		},
		{
			name: 'Lote',
			selector: 'lote',
			sortable: true,
			compact: true,
			width: '70px'
		},
		{
			name: 'Articulo',
			selector: 'articulo',
			sortable: true,
			compact: true,
			width: '70px'
		},
		{
			name: 'Descripcion',
			selector: 'DESCRIPCION',
			sortable: true,
			compact: true,
			width: '350px'
		},
		{
			name: 'Cantidad Pedida',
			selector: 'cantidad_pedida',
			sortable: true,
			compact: true,
			width: '70px'
		},
		{
			name: 'Cantidad A Facturar',
			selector: 'cantidad_a_facturar',
			sortable: true,
			compact: true,
			width: '100px'
		},
		{
			name: 'Cantidad  Bonificada',
			selector: 'cantidad_bonificad',
			sortable: true,
			compact: true,
			width: '100px'
		},
		{
			name: 'Ubicacion',
			selector: 'ubicacion',
			sortable: true
		}
	];

	const columnas = [
		{
			name: 'Ticket',
			selector: 'ticket',
			sortable: true,
			compact: true,
			width: '8%'
		},
		{
			name: 'Fecha Creacion',
			selector: 'fecha_inicio',
			sortable: true,
			cell: (row) => <Moment format="DD/MM/YYYY hh:mm">{row.fecha_inicio}</Moment>,
			compact: true,
			width: '12%'
		},
		{
			name: 'Fecha Inicio de preparacion',
			selector: 'fecha_inicio_preparacion',
			sortable: true,
			cell: (row) => <Moment format="DD/MM/YYYY hh:mm">{row.fecha_inicio_preparacion}</Moment>,
			compact: true,
			width: '12%'
		},
		{
			name: 'Fecha Fin de preparacion',
			selector: 'fecha_fin_preparacion',
			sortable: true,
			cell: (row) => <Moment format="DD/MM/YYYY hh:mm">{row.fecha_fin_preparacion}</Moment>,
			compact: true,
			width: '12%'
		},
		{
			name: 'Cant. Pedidos',
			selector: 'cant_pedido',
			sortable: true,
			compact: true,
			width: '10%'
		},
		{
			name: 'Preparador',
			selector: 'preparador',
			sortable: true,
			compact: true,
			width: '8%'
		},
		{
			name: 'Nombre',
			selector: 'nombre',
			sortable: true,
			compact: true,
			width: '12%'
		},
		{
			name: 'Estado',
			selector: 'estado[0]',
			sortable: true,
			compact: true,
			width: '16%'
		},

		{
			name: 'Ver',
			selector: 'ver',

			ignoreRowClick: true,
			cell: (row) => (
				<Button className="btn btn-primary" onClick={(e) => verModal(row, e)}>
					Ver
				</Button>
			),
			compact: true,
			width: '6%'
		}
	];

	const verModal = async (id, e) => {
		console.log(id);
		e.preventDefault();
		ConsultarTicketPedidos(id.ticket);
		ConsultarTicketProductos(id.ticket);
		setModalTicket(true);
	};

	const ConsultarTicketPedidos = async (id) => {
		var url = Global.url;
		var request = `/ticketPedidos/${id}`;
		console.log(request);
		await axios.get(url + request).then((resp) => {
			setDataPedidos(resp.data);
		});
	};
	const ConsultarTicketProductos = async (id) => {
		var url = Global.url;
		var request = `/ticketProductos/${id}`;
		await axios.get(url + request).then((resp) => {
			setDataProductos(resp.data);
		});
	};
	const handleChange = (event) => {
		setSearchTerm(event.target.value.toLowerCase());
	};
	return (
		<React.Fragment>
			<Row md={4}>
				<Col>
					<Form.Control
						type="text"
						placeholder="Buscar Por Nombre Preparador"
						value={searchTerm}
						onChange={handleChange}
						progressPending={pending}
					/>
				</Col>
			</Row>
			<DataTable columns={columnas} data={searchResults} pagination />
			<Modal size="xl" show={modalTicket} dialogClassName="modal-90w">
				<ModalHeader>
					<div>
						<h3>Ticket </h3>
					</div>
				</ModalHeader>
				<ModalBody>
					<Form>
						<DataTable title="Pedidos" columns={colPedidos} data={dataPedidos} pagination />
						<br />
						<DataTable title="Detalle" columns={colPedidosProductos} data={dataProductos} pagination />
					</Form>
				</ModalBody>
				<ModalFooter>
					<button className="btn btn-danger" onClick={() => setModalTicket(false)}>
						cancelar
					</button>
				</ModalFooter>
			</Modal>
			<Modal size="lg" show={impresion}>
				<ModalHeader>
					<div>
						<h3>Ticket {data.ticket} </h3>
					</div>
				</ModalHeader>
				<ModalBody>
					<Form />
					<Impresion idTicket={data.ticket} />
				</ModalBody>
				<ModalFooter>
					<button className="btn btn-danger" onClick={() => setImpresion(false)}>
						cancelar
					</button>
				</ModalFooter>
			</Modal>
		</React.Fragment>
	);
}
