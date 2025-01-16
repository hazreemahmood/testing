import 'dotenv/config';
import { drizzle } from "drizzle-orm/mysql2";
import mysql from 'mysql2';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const db = drizzle({ client: pool });

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

const createDatabase = async () => {
  const dbName = process.env.DB_NAME;
  try {
    // Create the database
    await connection.promise().query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
    console.log(`Database '${dbName}' created successfully or already exists.`);
  } catch (error) {
    console.error('Error creating database:', error);
  } finally {
    connection.end();
  }
};

createDatabase();

export default db;