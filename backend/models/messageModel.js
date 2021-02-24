import db from './index';

const findAll = () => {
	const checkAllMessages = db.query(`SELECT * FROM messages`);
	return new Promise((resolve, reject) => {
		resolve(checkAllMessages);
	});
};

const create = values => {
	return new Promise((resolve, reject) => {
		const inserData = `INSERT INTO
            messages(sender, receiver, message)
            VALUES($1, $2,  $3)
            returning id, sender, receiver, message, "createdAt"`;

		const newMessage = db.query(inserData, values);
		resolve(newMessage);
	});
};

const MessageModel = {
	findAll,
	create,
};

export default MessageModel;
