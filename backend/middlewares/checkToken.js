import jwt from 'jsonwebtoken';
import { getPostData } from '../utils';

const checkToken = async (req, res) => {
	const body = await getPostData(req);
	const { token } = JSON.parse(body);

	if (!token) {
		res.writeHead(401, { 'Content-Type': 'application/json' });
		return res.end(
			JSON.stringify({ error: 'Please, Authentication is required!' })
		);
	}

	jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
		if (err) {
			res.writeHead(500, { 'Content-Type': 'application/json' });
			return res.end(JSON.stringify({ error: 'Failed to authenticate token' }));
		}
		// next();
		return true;
	});
	return true;
};

export default checkToken;
