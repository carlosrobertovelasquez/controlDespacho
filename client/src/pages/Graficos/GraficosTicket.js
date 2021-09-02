import React from 'react';
import { Bar } from 'react-chartjs-2';
export default function GraficosTicket() {
	const data = {
		labels: [
			'Enero',
			'Febrero',
			'Marzo',
			'Abril',
			'Mayo',
			'Junio',
			'Agosto',
			'Septiembre',
			'Octubre',
			'Noviembre',
			'Diciembre'
		],
		datasets: [
			{
				label: '# de Fletes',
				data: [ 12, 19, 3, 5, 2, 3 ],
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)'
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)'
				],
				borderWidth: 1
			}
		]
	};

	const options = {
		scales: {
			yAxes: [
				{
					ticks: {
						beginAtZero: true
					}
				}
			]
		}
	};

	const data2 = {
		labels: [ 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto' ],
		datasets: [
			{
				label: 'Vehiculo1',
				data: [ 12, 19, 3, 5, 2, 3 ],
				backgroundColor: 'rgb(255, 99, 132)'
			},
			{
				label: 'Vehiculo2',
				data: [ 2, 3, 20, 5, 1, 4 ],
				backgroundColor: 'rgb(54, 162, 235)'
			},
			{
				label: 'Vehiculo3',
				data: [ 3, 10, 13, 15, 22, 30 ],
				backgroundColor: 'rgb(75, 192, 192)'
			},
			{
				label: 'Vehiculo4',
				data: [ 3, 10, 13, 15, 22, 30 ],
				backgroundColor: 'rgb(75, 192, 192)'
			},
			{
				label: 'Vehiculo5',
				data: [ 3, 10, 13, 15, 22, 30 ],
				backgroundColor: 'rgb(75, 192, 192)'
			},
			{
				label: 'Vehiculo6',
				data: [ 3, 10, 13, 15, 22, 30 ],
				backgroundColor: 'rgb(75, 192, 192)'
			},
			{
				label: 'Vehiculo7',
				data: [ 3, 10, 13, 15, 22, 27 ],
				backgroundColor: 'rgb(75, 192, 192)'
			},
			{
				label: 'Vehiculo8',
				data: [ 3, 10, 13, 15, 22, 12 ],
				backgroundColor: 'rgb(70, 1, 190)'
			}
		]
	};

	return (
		<React.Fragment>
			<div className="content-wrapper">
				<div className="content-header">
					<div className="container-fluid">
						<div className="row mb-2">
							<div className="col-sm-6">
								<h1 className="m-0 text-dark">Grafico Ticket</h1>
							</div>

							<div className="col-sm-6">
								<ol className="breadcrumb float-sm-right">
									<li className="breadcrumb-item">
										<a href="/">Inicio</a>
									</li>

									<li className="breadcrumb-item active">GraficoTicket</li>
								</ol>
							</div>
						</div>
					</div>
				</div>
				<section className="content">
					<div className="container-fluid">
						<div className="row">
							<div className="col-md-6">
								<div className="card card-primary">
									<div className="card-header">
										<h3 className="card-title">Ticket Por Mes</h3>

										<div className="card-tools">
											<button type="button" className="btn btn-tool" data-card-widget="collapse">
												<i className="fas fa-minus" />
											</button>
											<button type="button" className="btn btn-tool" data-card-widget="remove">
												<i className="fas fa-times" />
											</button>
										</div>
									</div>
									<div className="card-body">
										<div className="chart">
											<Bar data={data} options={options} />
										</div>
									</div>
								</div>

								<div className="card card-danger">
									<div className="card-header">
										<h3 className="card-title">Flete x Motorista</h3>

										<div className="card-tools">
											<button type="button" className="btn btn-tool" data-card-widget="collapse">
												<i className="fas fa-minus" />
											</button>
											<button type="button" className="btn btn-tool" data-card-widget="remove">
												<i className="fas fa-times" />
											</button>
										</div>
									</div>
									<div className="card-body">
										<Bar data={data2} />
									</div>
								</div>
							</div>

							<div className="col-md-6">
								<div className="card card-info">
									<div className="card-header">
										<h3 className="card-title">Fletes Movidos Por Vehiculos Mensuales</h3>

										<div className="card-tools">
											<button type="button" className="btn btn-tool" data-card-widget="collapse">
												<i className="fas fa-minus" />
											</button>
											<button type="button" className="btn btn-tool" data-card-widget="remove">
												<i className="fas fa-times" />
											</button>
										</div>
									</div>
									<div className="card-body">
										<div className="chart">
											<Bar data={data2} options={options} />
										</div>
									</div>
								</div>

								<div className="card card-success">
									<div className="card-header">
										<h3 className="card-title">Kilometros por Vehiculos</h3>

										<div className="card-tools">
											<button type="button" className="btn btn-tool" data-card-widget="collapse">
												<i className="fas fa-minus" />
											</button>
											<button type="button" className="btn btn-tool" data-card-widget="remove">
												<i className="fas fa-times" />
											</button>
										</div>
									</div>
									<div className="card-body">
										<div className="chart">
											<Bar data={data2} />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</React.Fragment>
	);
}
