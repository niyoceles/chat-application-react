import React from 'react';
import { logoutUser } from '../../redux/actions';
import { useDispatch } from 'react-redux';

export default function Logout() {
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logoutUser());
	};
	return (
		<div className='left-container'>
			<button className='button back-button' onClick={handleLogout}>
				<b>Logout</b>
			</button>
		</div>
	);
}
