import React, { useState, useEffect } from 'react';
import Messages from '../Messages/Messages';
import TopBar from '../TopBar/TopBar';
import Input from '../Input/Input';
import './chat.css';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMyChats, sendChatMessage } from '../../redux/actions';
import AppLayout from '../../layout/AppLayout';

const Chat = () => {
	const path = window.location.pathname;
	const toUser = path.split('/');

	const [message, setMessage] = useState('');

	const messages = useSelector(state => state.chat.allChats);

	const dispatch = useDispatch();
	useEffect(() => {
		const data = {
			// receiver: 'waceles',
			sender: toUser[2],
		};
		dispatch(getMyChats(data));
	}, [dispatch, toUser]);

	const sendMessage = event => {
		event.preventDefault();

		if (message) {
			const newMessage = {
				receiver: toUser[2],
				message,
			};
			dispatch(sendChatMessage(newMessage));
			setMessage('');
		}
	};
	if (!localStorage.IdToken) {
		return <Redirect to='/' />;
	}
	return (
		<AppLayout>
			<div className='container'>
				<TopBar title={toUser[2]} />
				{messages && messages ? <Messages messages={messages} /> : <Messages />}
				<Input
					message={message}
					setMessage={setMessage}
					sendMessage={sendMessage}
				/>
			</div>
		</AppLayout>
	);
};

export default Chat;
