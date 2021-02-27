import React from 'react';

export default function AuthLayout(props) {
	return (
		<body>
			<div className='auth-main'>{props.children}</div>
		</body>
	);
}
