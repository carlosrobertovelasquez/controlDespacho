import React from 'react';

import { Container, Row, Spinner } from 'react-bootstrap';

import Flete from './Flete';

export default function Tablero({ data }) {
	return (
		<React.Fragment>
			{data.length === 0 ? (
				<Container>
					<Row className="justify-content-md-center">
						<Spinner animation="border" role="status" />
					</Row>
					<Row className="justify-content-md-center">
						<span className="text-center">Cargando...</span>
					</Row>
				</Container>
			) : (
				<React.Fragment>
					{data.map((fbb, i) => {
						return (
							<div key={i} className="col-lg-3 col-6">
								<Flete fbb={fbb} />
							</div>
						);
					})}
				</React.Fragment>
			)}
		</React.Fragment>
	);
}
