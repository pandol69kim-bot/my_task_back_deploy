require('dotenv').config();

// const mysql = require('mysql2/promise');
// const pool = mysql.createConnection({
//   user: process.env.MYSQL_DB_USER,
//   host: process.env.MYSQL_DB_HOST,
//   database: process.env.MYSQL_DB_DATABASE,
//   password: process.env.MYSQL_DB_PASSWORD,
//   port: process.env.MYSQL_DB_PORT,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

const mysql = require('mysql2/promise');
const pool = mysql.createPool({
  user: process.env.MYSQL_DB_USER,
  host: process.env.MYSQL_DB_HOST,
  database: process.env.MYSQL_DB_DATABASE,
  password: process.env.MYSQL_DB_PASSWORD,
  port: process.env.MYSQL_DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = { pool };
