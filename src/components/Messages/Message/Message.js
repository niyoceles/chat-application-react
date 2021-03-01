import React from 'react';

import './message.css';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const Message = ({ message: { message, receiver, createdAt } }) => {
	let isSentByCurrentUser = false;

	let sentByMe = '';

	const path = window.location.pathname;
	const toUser = path.split('/');
	if (receiver === toUser[2]) {
		isSentByCurrentUser = true;
	}
	dayjs.extend(relativeTime);
	
	return isSentByCurrentUser ? (
		<div className='message-container justify-end'>
			<p className='sent-text pr-8'>{sentByMe}</p>
			<div className='message-box background-blue'>
				<p className='message-text color-white'>{message}</p>
				<p className='sent-time color-white'>{dayjs(createdAt).fromNow()}</p>
			</div>
		</div>
	) : (
		<div className='message-container justify-start'>
			<div className='message-box background-light'>
				<p className='message-text color-dark'>{message}</p>
				<p className='sent-time color-dark'>{dayjs(createdAt).fromNow()}</p>
			</div>
		</div>
	);
};

export default Message;
