const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);
// Users block
describe('Users', () => {
	// Consts
	const user = {
		username: 'niyoceles',
		password: '12345',
	};

	/*
	 * Test for /GET
	 */
	describe('/GET users', () => {
		it('it should GET all the users', done => {
			chai
				.request(server)
				.get('/api/users')
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
	describe('/POST user', () => {
		it('it should POST a user ', done => {
			chai
				.request(server)
				.post('/api/users')
				.send(user)
				.end((err, res) => {
					res.should.have.status(201);
					res.body.should.be.a('object');
					res.body.should.have.property('username');
					res.body.should.have.property('password');
					res.body.should.have.property('id');
					done();
				});
		});
	});
});
