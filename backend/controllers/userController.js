import User from '../models/userModel';
import { getPostData } from '../utils';

// @desc    Create a User
// @route   POST /api/message
export const signup = async (req, res) => {
	try {
		const body = await getPostData(req);

		const { username, password } = JSON.parse(body);
		const values = [username, password];

		const newUser = await User.create(values);
		if (newUser.rows.length > 0) {
			res.writeHead(201, { 'Content-Type': 'application/json' });
			return res.end(JSON.stringify(newUser.rows[0]));
		}
	} catch (error) {
		console.log(error);
	}
};

// GET All messages
export const getAllUsers = async (req, res) => {
	try {
		const messages = await User.findAll();

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
	signup,
	getAllUsers,
};

export default exp;
