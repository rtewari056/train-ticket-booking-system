import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  port: 3306 || process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  connectionLimit: 10 || process.env.DB_CONNECTION_LIMIT,
});

export default pool;
