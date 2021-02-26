import React, { useState, useEffect } from 'react';
import Messages from '../Messages/Messages';
import TopBar from '../TopBar/TopBar';
import Input from '../Input/Input';

import './chat.css';

const Chat = () => {
	const [message, setMessage] = useState('');

	const sendMessage = event => {
		event.preventDefault();

		if (message) {
			//
		}
	};

	const messages = [
		{ id: 1, name: 'celestin', message: 'Hi' },
		{ id: 2, name: 'emile', message: 'Hi Celestin' },
	];
	return (
		<div className='cover-container'>
			<div className='container'>
				<TopBar title='Chat with 1' />
				<Messages messages={messages} />
				<Input
					message={message}
					setMessage={setMessage}
					sendMessage={sendMessage}
				/>
			</div>
		</div>
	);
};

export default Chat;
