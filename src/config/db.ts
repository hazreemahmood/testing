import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'shopdb'
});

export const connectToDatabase = async () => {
  try {
    await db.getConnection();
    console.log('Connected to MySQL database');
  } catch (err:any) {
    console.error('DB connection failed:', err.stack);
  }
};

export default db;