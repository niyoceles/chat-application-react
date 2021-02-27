import Message from '../models/messageModel';
import { getPostData } from '../utils';

// @desc    Send message
// @route   POST /api/messages
export const sendMessage = async (req, res) => {
	try {
		const body = await getPostData(req);

		const { sender, receiver, message } = JSON.parse(body);
		const values = [sender, receiver, message];

		const newMessage = await Message.createMessage(values);
		if (newMessage.rows.length > 0) {
			res.writeHead(201, { 'Content-Type': 'application/json' });
			return res.end(JSON.stringify(newMessage.rows[0]));
		}
	} catch (error) {
		console.log(error);
	}
};

// GET All my messages
export const getMyChats = async (req, res) => {
	const body = await getPostData(req);

	const { sender, receiver } = JSON.parse(body);
	try {
		const messages = await Message.findMyChat(sender, receiver);

		if (messages.rows.length > 0) {
			messages.rows[0].createdAt = new Date(
				messages.rows[0].createdAt
			).toDateString();
			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify(messages.rows));
		} else {
			res.writeHead(404, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ error: 'You have no message!' }));
		}
	} catch (error) {
		console.log(error);
	}
};

const exp = {
	sendMessage,
	getMyChats,
};

export default exp;
