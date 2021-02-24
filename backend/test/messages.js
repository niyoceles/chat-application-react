const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);
// Messages block
describe('Messages', () => {
	// Consts
	const message = {
		sender: 'niyoceles',
		receiver: 'niyoceles3',
		message: 'Hello',
	};

	/*
	 * Test for /GET
	 */
	describe('/GET messages', () => {
		it('it should GET all the messages', done => {
			chai
				.request(server)
				.get('/api/messages')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					done();
				});
		});
	});
	/*
	 * Test for /POST
	 */
	describe('/POST message', () => {
		it('it should POST a message ', done => {
			chai
				.request(server)
				.post('/api/messages')
				.send(message)
				.end((err, res) => {
					res.should.have.status(201);
					res.body.should.be.a('object');
					res.body.should.have.property('sender');
					res.body.should.have.property('receiver');
					res.body.should.have.property('message');
					res.body.should.have.property('id');
					done();
				});
		});
	});
});
