import React from 'react';
import { useSelector } from 'react-redux';

import './input.css';

const Input = ({ setMessage, sendMessage, message, error }) => {
	const path = window.location.pathname;
	const toUser = path.split('/');

	const user = useSelector(state => state.auth.user);

	// if (toUser[2] === user.username)
		return (
			<>
				{toUser[2] === user.username ? (
					<div></div>
				) : (
					<form className='form'>
						<input
							className='input'
							type='text'
							placeholder='Type a message...'
							value={message}
							onChange={({ target: { value } }) => setMessage(value)}
							onKeyPress={event =>
								event.key === 'Enter' ? sendMessage(event) : null
							}
						/>
						<button className='send-button' onClick={e => sendMessage(e)}>
							Send
						</button>
					</form>
				)}
			</>
		);
};

export default Input;
