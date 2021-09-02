import React from 'react';

export default function LayoutBasic(props) {
	const { children } = props;
	return (
		<React.Fragment>
			<div>{children}</div>
		</React.Fragment>
	);
}
