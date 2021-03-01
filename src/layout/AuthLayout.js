import React from 'react';

export default function AuthLayout(props) {
	return (
		<body>
			<h1 className='heading'>Chat one on one Application</h1>
			<div className='auth-main'>{props.children}</div>
		</body>
	);
}
