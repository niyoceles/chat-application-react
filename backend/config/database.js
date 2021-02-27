import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connString = process.env.DATABASE_URL;
const pool = new pg.Pool({
	connectionString: connString,
});

pool.on('connect', () => {
	console.log('connected to the Database');
});

const dropTables = () => {
	const usersTable = 'DROP TABLE IF EXISTS users';
	const messagesTable = 'DROP TABLE IF EXISTS messages';

	const dropTablesQueries = ` ${usersTable}; ${messagesTable}`;

	pool
		.query(dropTablesQueries)
		.then(res => {
			console.log(res);
			pool.end();
		})
		.catch(err => {
			console.log(err);
			pool.end();
		});
	pool.on('remove', () => {
		console.log('client removed');
		process.exit(0);
	});
};

const createTables = () => {
	const usersTable = `CREATE TABLE IF NOT EXISTS
      users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) NULL,
        password TEXT NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )`;

	const messagesTable = `CREATE TABLE IF NOT EXISTS
      messages(
        id SERIAL PRIMARY KEY,
        sender VARCHAR(100) NULL,
        receiver VARCHAR(100) NULL,
        message TEXT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )`;

	const createTablesQueries = `${usersTable}; ${messagesTable}`;

	pool
		.query(createTablesQueries)
		.then(res => {
			console.log(res);
			pool.end();
		})
		.catch(err => {
			console.log(err);
			pool.end();
		});
	pool.on('remove', () => {
		console.log('client removed');
		process.exit(0);
	});
};

export { createTables, dropTables, pool };

require('make-runnable');
