const http = require('http');

const {
	createMessage,
	getAllMessages,
} = require('./controllers/messageController');

const { signup, getAllUsers } = require('./controllers/userController');

const server = http.createServer((req, res) => {
	if (req.url === '/api/users' && req.method === 'GET') {
		getAllUsers(req, res);
	} else if (req.url === '/api/users' && req.method === 'POST') {
		signup(req, res);
	} else if (req.url === '/api/messages' && req.method === 'POST') {
		createMessage(req, res);
	} else if (req.url === '/api/messages' && req.method === 'GET') {
		getAllMessages(req, res);
	} else {
		res.writeHead(404, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({ message: 'Route Not Found' }));
	}
});

const PORT = process.env.PORT || 9000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = server;
