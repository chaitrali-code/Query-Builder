// backend/testDB.js
import pool from "./db.js";

async function testConnection() {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS result");
    console.log("DB connected! Test query result:", rows);
    process.exit(0);
  } catch (err) {
    console.error("DB connection failed:", err.message);
    process.exit(1);
  }
}

testConnection();
