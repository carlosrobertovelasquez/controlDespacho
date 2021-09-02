import React from 'react';
import Menu from '../components/Menu/Menu';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
export default function LayoutBasic(props) {
	const { children } = props;
	return (
		<React.Fragment>
			<Menu />
			<Header />
			{children}
			<Footer />
		</React.Fragment>
	);
}
