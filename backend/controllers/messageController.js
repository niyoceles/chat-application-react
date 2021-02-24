import Message from '../models/messageModel';
import { getPostData } from '../utils';

// @desc    Create a Message
// @route   POST /api/message
export const createMessage = async (req, res) => {
	try {
		const body = await getPostData(req);

		const { sender, receiver, message } = JSON.parse(body);
		const values = [sender, receiver, message];

		const newMessage = await Message.create(values);
		if (newMessage.rows.length > 0) {
			res.writeHead(201, { 'Content-Type': 'application/json' });
			return res.end(JSON.stringify(newMessage.rows[0]));
		}
	} catch (error) {
		console.log(error);
	}
};

// GET All messages
export const getAllMessages = async (req, res) => {
	try {
		const messages = await Message.findAll();

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
	createMessage,
	getAllMessages,
};

export default exp;
