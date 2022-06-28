const {Pool} = require("pg");
require('dotenv').config()

// const pool = new Pool({
//     user: process.env.SQL_USERNAME,
//     password: process.env.SQL_PASSWORD,
//     host: "localhost",
//     port: 5432,
//     database: "perntodo"
// })

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

module.exports = pool;