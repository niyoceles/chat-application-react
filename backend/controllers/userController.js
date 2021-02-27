import dotenv from 'dotenv/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/userModel';
import { getPostData } from '../utils';

// @desc    user signup
// @route   POST /api/users
export const signup = async (req, res) => {
	try {
		const body = await getPostData(req);
		const { username, password } = JSON.parse(body);
		const checkUser = await User.checkExistAccount(username);
		if (checkUser.rows.length > 0) {
			res.writeHead(203, { 'Content-Type': 'application/json' });
			return res.end(
				JSON.stringify({ error: 'Sorry, this username already exists' })
			);
		}
		const values = [username, bcrypt.hashSync(password)];

		const newUser = await User.create(values);
		if (newUser.rows.length > 0) {
			const token = jwt.sign(
				{
					id: newUser.rows[0].id,
					email: newUser.rows[0].email,
				},
				process.env.SECRET_KEY,
				{
					expiresIn: 86400, // expires in 24 hours
				}
			);
			delete newUser.rows[0].password;
			res.writeHead(201, { 'Content-Type': 'application/json' });
			return res.end(
				JSON.stringify({
					token,
					user: newUser.rows[0],
					message: 'successful created an account',
				})
			);
		}
	} catch (error) {
		console.log(error);
	}
};

// @desc    signin
// @route   POST /api/users/login
export const signin = async (req, res) => {
	const headers = {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
		'Access-Control-Max-Age': 2592000, // 30 days
		/** add other headers as per requirement */
		'Content-Type': 'application/json',
		'Access-Control-Allow-Headers': 'X-Requested-With',
	};
	try {
		const body = await getPostData(req);
		const { username, password } = JSON.parse(body);
		const { rows } = await User.checkExistAccount(username);
		if (rows.length > 0) {
			for (let i = 0; i < rows.length; i += 1) {
				if (bcrypt.compareSync(password, rows[i].password)) {
					const token = jwt.sign(
						{
							id: rows[i].id,
							username: rows[i].username,
							password: rows[i].password,
						},
						process.env.SECRET_KEY,
						{
							expiresIn: 86400, // expires in 24 hours
						}
					);

					delete rows[0].password;
					res.writeHead(200, headers);
					return res.end(
						JSON.stringify({
							token,
							user: rows[0],
							message: 'successful login',
						})
					);
				}
			}
		}

		res.writeHead(401, { 'Content-Type': 'application/json' });
		return res.end(
			JSON.stringify({
				error: 'Sorry, your username or password is incorrect',
			})
		);
	} catch (error) {
		console.log(error);
	}
};

// GET All registered users
export const getAllUsers = async (req, res) => {
	const body = await getPostData(req);
	// const { username } = JSON.parse(body);
	const username = 'test2';
	try {
		const users = await User.findAll(username);

		if (users.rows.length > 0) {
			for (let i = 0; i < users.rows.length; i += 1) {
				delete users.rows[i].password;
				users.rows[i].createdAt = new Date(
					users.rows[i].createdAt
				).toDateString();
			}
			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify(users.rows));
		} else {
			res.writeHead(404, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ error: 'user not found!' }));
		}
	} catch (error) {
		console.log(error);
	}
};

const exp = {
	signup,
	signin,
	getAllUsers,
};

export default exp;
