import React, { useEffect } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { Link } from 'react-router-dom';
import './users.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../redux/actions';

const Users = () => {
	const usersList = useSelector(state => state.chat.allUsers);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getUsers());
	}, [dispatch]);

	return (
		<div className='cover-container'>
			<div className='container'>
				<div className='top-bar'>
					<div className='left-container'>
						<h3>Chat with the users</h3>
					</div>
				</div>
				<ScrollToBottom className='users'>
					<ul class='circle'>
						{usersList.map(i => (
							<Link to={`/chat/${i.username}`} className='link'>
								<div key={i} className='user'>
									<li>{i.username}</li>
								</div>
							</Link>
						))}
					</ul>
				</ScrollToBottom>
			</div>
		</div>
	);
};

export default Users;
