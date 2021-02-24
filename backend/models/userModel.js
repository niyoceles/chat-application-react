import db from './index';

const findAll = () => {
	const checkAllMessages = db.query(`SELECT * FROM users`);
	return new Promise((resolve, reject) => {
		resolve(checkAllMessages);
	});
};

const create = values => {
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
	create,
};

export default exportModels;
