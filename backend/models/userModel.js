import db from '../config';

export const findAll = username => {
	const users = db.query('SELECT * FROM users WHERE username!=$1', [username]);
	return new Promise((resolve, reject) => {
		resolve(users);
	});
};

export const checkExistAccount = username => {
	const checkUsername = db.query('SELECT * FROM users WHERE username=$1', [
		username,
	]);
	return new Promise((resolve, reject) => {
		resolve(checkUsername);
	});
};

export const create = values => {
	return new Promise((resolve, reject) => {
		const inserData = `INSERT INTO
            users(username, password)
            VALUES($1, $2)
            returning id, username, password, "createdAt"`;

		const newMessage = db.query(inserData, values);
		resolve(newMessage);
	});
};

const exportModels = {
	findAll,
	checkExistAccount,
	create,
};

export default exportModels;
