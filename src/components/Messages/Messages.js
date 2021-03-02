import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message/Message';

const Messages = ({ messages, error }) => (
	<ScrollToBottom className='messages'>
		{messages === 'You have no message!' ? (
			<p className='pl-8 paragraph'>{messages}</p>
		) : (
			messages.map((message, i) => (
				<div key={i}>
					<Message message={message} />
				</div>
			))
		)}
		<span className='validation-error'>{error ? error : null}</span>
	</ScrollToBottom>
);

export default Messages;
