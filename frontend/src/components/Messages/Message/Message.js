import React from 'react';

import './message.css';

const Message = ({ message: { message, name } }) => {
	let isSentByCurrentUser = false;

	const sentByMe = 'celestin';

	if (name === sentByMe) {
		isSentByCurrentUser = true;
	}

	return isSentByCurrentUser ? (
		<div className='message-container justify-end'>
			<p className='sent-text pr-8'>{sentByMe}</p>
			<div className='message-box background-blue'>
				<p className='message-text color-white'>{message}</p>
			</div>
		</div>
	) : (
		<div className='message-container justify-start'>
			<div className='message-box background-light'>
				<p className='message-text color-dark'>{message}</p>
			</div>
			<p className='sent-text pl-8 '>{name}</p>
		</div>
	);
};

export default Message;
