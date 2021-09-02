/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

export default function Header() {
	return (
		<React.Fragment>
			<nav className="main-header navbar navbar-expand navbar-white navbar-light">
				<ul className="navbar-nav">
					<li className="nav-item">
						<a className="nav-link" data-widget="pushmenu" href="#" role="button">
							<i className="fas fa-bars" />
						</a>
					</li>
				</ul>

				<ul className="navbar-nav ml-auto">
					<li className="nav-item">
						<a className="nav-link" data-widget="control-sidebar" data-slide="true" href="#" role="button">
							<i className="fas fa-sign-out" />
						</a>
					</li>
				</ul>
			</nav>
		</React.Fragment>
	);
}
