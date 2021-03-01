import React from 'react';
import { logoutUser } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default function Logout() {
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logoutUser());
		if (!localStorage.IdToken) {
			return <Redirect to='/' />;
		}
	};

	return (
		<div className='left-container'>
			<button className='button clickable back-button' onClick={handleLogout}>
				<b>Logout</b>
			</button>
		</div>
	);
}
