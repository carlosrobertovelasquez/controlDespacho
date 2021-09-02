import React from 'react';
import { DateTime } from 'luxon';
import { version } from '../../../package.json';
export default function Footer() {
	let url = '';
	return (
		<footer className="main-footer">
			<span>
				Copyright © {DateTime.now().toFormat('y')} <a href={url}>Control Despacho</a>.{' '}
			</span>
			All rights reserved.
			<div className="float-right d-none d-sm-inline-block">
				<b>Version</b> {version}
			</div>
		</footer>
	);
}
