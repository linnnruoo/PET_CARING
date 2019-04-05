/**
 * @description Global Postgres Connection Pool
 * All queries will be run using connection pool
 */
const { Pool } = require('pg');
const Config = require('../../config');


const pool = new Pool({
    connectionString: Config.POSTGRES_URL,
    ssl: true,
    max: 10
});

module.exports = {
    query: (text, params) => {
        if (params) {
            return pool.query(text, params)
        }
        else {
            return pool.query(text)
        }
    }
}