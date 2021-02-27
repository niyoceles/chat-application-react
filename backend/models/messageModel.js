import db from '../config';

export const findMyChat = (sender, receiver) => {
	const getMyChat = db.query(
		`SELECT * FROM messages WHERE sender=$1 AND receiver=$2 OR sender=$2 AND receiver=$1`,
		[sender, receiver]
	);
	return new Promise((resolve, reject) => {
		resolve(getMyChat);
	});
};

export const createMessage = values => {
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
	findMyChat,
	createMessage,
};

export default MessageModel;
