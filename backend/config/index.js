
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connString = process.env.DATABASE_URL;
const pool = new pg.Pool({
  connectionString: connString,
});

export default {
  query(text, params) {
    return new Promise((resolve, reject) => {
      pool.query(text, params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
