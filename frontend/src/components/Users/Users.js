import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { Link } from 'react-router-dom';
import './users.css';

const Users = () => {
	const usersList = [
		{ id: 1, username: 'celestin' },
		{ id: 2, username: 'pascal' },
	];
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
