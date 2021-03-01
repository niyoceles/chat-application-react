import React from 'react';

export default function AppLayout(props) {
	return (
		<body>
			<h1 className='heading'>Chat one on one Application</h1>
			<div className='main-app'>{props.children}</div>
		</body>
	);
}
