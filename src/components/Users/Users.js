import React, { useEffect } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { Link } from 'react-router-dom';
import './users.css';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../redux/actions';
import Logout from '../Auth/Logout';
import AppLayout from '../../layout/AppLayout';

const Users = () => {
	const usersList = useSelector(state => state.chat.allUsers);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getUsers());
	}, [dispatch]);
	if (!localStorage.getItem('IdToken')) {
		return <Redirect to='/' />;
	}
	return (
		<AppLayout>
			<div className='container'>
				<div className='top-bar'>
					<div className='left-container'>
						<h3>Chat with the users</h3>
					</div>
					<Logout />
				</div>
				<ScrollToBottom className='users'>
					{usersList && usersList ? (
						<ul className='circle'>
							{usersList.map((i, index) => (
								<Link to={`/chat/${i.username}`} className='link' key={index}>
									<div key={i} className='user'>
										<li>{i.username}</li>
									</div>
								</Link>
							))}{' '}
						</ul>
					) : (
						<>
							<br />
							<div className='pl-8 paragraph'>
								<p>No other user to chat </p>
							</div>
						</>
					)}
				</ScrollToBottom>
			</div>
		</AppLayout>
	);
};

export default Users;
