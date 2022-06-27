const {Client} = require("pg");
require('dotenv').config()

// const pool = new Pool({
//     user: process.env.SQL_USERNAME,
//     password: process.env.SQL_PASSWORD,
//     host: "localhost",
//     port: 5432,
//     database: "perntodo"
// })

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

client.connect()

module.exports = client;